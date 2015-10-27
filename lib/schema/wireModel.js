var _ = require('lodash'),
	Arrow = require('arrow');

/**
 * Wires up methods from the specified ArrowDB Object on the specified model.
 *
 * If the ArrowDB Object declares a method such as "count", this function will add
 * a "count" method to the model.
 *
 * However if the ArrowDB Object declares a method that the model already has such
 * as "create", it will wire up the method as "_create". The model's existing
 * "create" already calls the connector's "create" which knows that it needs
 * to call "_create".
 *
 * @param {object} acsObj - The ArrowDB Object descriptor from the acs-node-sdk library.
 * @param {Model} model - The model to wire up.
 * @param {string} [name] - The name of the model. If absent, then it get the name
 *     from the model and prints out that the model is a custom object.
 * @param isCustomObject
 */
exports.wireModel = function (acsObj, model, name, isCustomObject) {
	this.logger.trace(name + (isCustomObject ? ' (custom object)' : ''));

	model._methods = [];

	/*
	 * Helper function to create an instance of a model.
	 * @param {Model} model - The model being instanced.
	 * @param {object} values - An object of values to initialize the instance with.
	 * @returns {Instance} A new instance of the specified model.
	 */
	function createInstance(model, values, params) {
		var instance = model.instance(values, true, params);
		instance.setPrimaryKey(values.id);
		model._instanceMethods && Object.keys(model._instanceMethods).forEach(function (method) {
			instance[method] = model._instanceMethods[method].bind(instance);
		});
		if (values.custom_fields) {
			Object.keys(values.custom_fields).forEach(function (k) {
				if (model.fields[k]) {
					instance.set(k, values.custom_fields[k]);
				}
			});
		}
		return instance;
	}

	Object.keys(acsObj.methods).forEach(function (method, i, arr) {
		var branch = (i + 1 < arr.length ? '├─ ' : '└─ ');

		// get the method info from the ArrowDB Object descriptor
		var methodInfo = _.merge({}, acsObj.methods[method]);

		// mixin the model specific properties
		if (model.methodMeta && model.methodMeta[method]) {
			_.merge(methodInfo, model.methodMeta[method]);
		}

		// in some cases, we have two methods that do the same thing and the
		// duplicate methods are marked as "canonical".
		if (methodInfo.canonical) {
			this.logger.trace('├─ ' + method + '() is a canonical method; points to ' + methodInfo.canonical + '()');
			var canonical = methodInfo.canonical;
			methodInfo = {};
			acsObj.methods[method] && _.merge(methodInfo, acsObj.methods[method]);
			method = canonical;
			acsObj.methods[method] && _.merge(methodInfo, acsObj.methods[method]);
			model.methodMeta[method] && _.merge(methodInfo, model.methodMeta[method]);
		}

		if (methodInfo.skip) {
			this.logger.trace('├─ ' + method + '() skipped');
			return;
		}

		if (methodInfo.alias) {
			this.logger.trace('├─ ' + method + '() is an alias for ' + methodInfo.alias + '()');
			method = methodInfo.alias;
		}

		// if the ArrowDB method is named the same as an existing one on the model,
		// then we prepend our version so that the model version can call this
		// connector and then our connector can call this method
		var destMethod = method;
		if (methodInfo.method) {
			destMethod = methodInfo.method;
		} else if (!methodInfo.overwrite && typeof model[method] === 'function' && destMethod !== 'count') {
			destMethod = '_' + method;
		}

		if (!methodInfo.overwrite && model[destMethod] && destMethod !== 'count') {
			return;
		}

		model._methods.push(destMethod);

		this.logger.trace(branch + destMethod + '(' + (methodInfo.instance ? 'instance, callback' : 'options, callback') + ') -> ' + methodInfo.apiMethodName);
		branch = '|  ';

		if (methodInfo.instance) {
			// this method is supported on instances, so we need to queue up wrapper
			// function for whenever an instance is created
			model._instanceMethods || (model._instanceMethods = {});
			model._instanceMethods[method] = function (options, callback) {
				if (typeof options === 'function') {
					callback = options;
					options = {};
				}
				if (typeof callback !== 'function') {
					callback = function () {};
				}
				// invoke the model method and pass in `this` as the instance to use
				if (this.getModel()[method].length > 2) {
					return this.getModel()[method](this, options, callback);
				}
				return this.getModel()[method](this, callback);
			};
		}

		var methodParameters;
		var self = this;

		if (destMethod === 'show') {
			/**
			 * Documents the findAll method for API usage.
			 * @returns {Object}
			 */
			model.showAPI = function showAPI() {
				return {
					generated: true,
					enabled: true,
					uiSort: 6,
					path: './show',
					nickname: 'Show',
					beforeEvent: this.beforeShowEvent || this.beforeEvent,
					afterEvent: this.afterShowEvent || this.afterEvent,
					eventTransformer: this.showEventTransformer || this.eventTransformer,
					description: this.description || 'Call "show" for a ' + this.singular,
					actionGroup: 'read',
					method: 'GET',
					parameters: {
						id: {
							type: 'query',
							optional: true,
							required: false,
							description: 'ID of the ACL object'
						},
						name: {
							type: 'query',
							optional: true,
							required: false,
							description: 'Name of the ACL object'
						}
					},
					action: function showAction(req, resp, next) {
						try {
							resp.stream(req.model.show, req.params, next);
						}
						catch (E) {
							return next(E);
						}
					}
				};
			};
		}

		// create the method handler on the model (i.e. "_create", "count", etc)
		model[destMethod] = function modelMethodWrapper(instance, params, callback) {

			// passed from invoker
			var context = arguments[arguments.length - 1];

			if (!methodInfo.instance) {
				// need to unshift params
				callback = params;
				params = instance;
				instance = null;
			}
			if (!methodParameters && methodInfo.parameters) {
				methodParameters = {};
				methodInfo.parameters.forEach(function (mi) {
					methodParameters[mi.name] = mi;
				});
			}
			if (typeof params === 'function') {
				callback = params;
				if (methodInfo.instance && !(instance instanceof Arrow.Instance)) {
					params = instance;
					instance = null;
				} else {
					params = {};
				}
			}
			if (typeof callback !== 'function') {
				callback = function () {};
			}

			var fields = this.fields;

			if (typeof this._prepareParams === 'function') {
				params = this._prepareParams(method, instance, params, instance instanceof Arrow.Instance ? instance.values(true) : params);
			} else if (methodInfo.instance) {
				params = instance instanceof Arrow.Instance ? instance.values(true) : params;
			}

			if (/_update|_create/.test(destMethod) && params) {
				// handle custom fields
				var custom_fields = params.custom_fields || {};
				if (typeof(custom_fields) === 'string') {
					custom_fields = custom_fields.split(',').map(function (k) {return k.trim();});
				}
				Object.keys(fields).forEach(function (k) {
					var field = fields[k] || {};
					if (field.copy_field && !(k in params)) {
						params[k] = params[field.copy_field];
					}
					if (!params[k] && field.default) {
						params[k] = field.default || params[k];
					}
				});
				Object.keys(params).forEach(function (k) {
					if (methodParameters && !(k in methodParameters)) {
						custom_fields[k] = params[k];
						delete params[k];
					}
				});

				params.custom_fields = custom_fields;
			}

			// try and get the right database. attempt to use the model (context) passed in if present
			// and then attempt to use the this scope (model) and fall back to global
			var db = context && context.connector && context.connector.db || this.connector.db || this.connector.baseDB;

			db[methodInfo.apiMethodName].call(db, params, function (err, results) {
				if (err) {
					if (err.errorCode === 1004 && destMethod !== '_create') {
						// invalid object id is this error code. for example passing an
						// ID which isn't in the DB. return without a result so that a
						// 404 is passed back to client
						return callback();
					}
					return callback(err.reason || err.message);
				}

				// determine the model to hold the response
				var responseModelName = null;
				if (methodInfo.response && methodInfo.response.model) {
					responseModelName = methodInfo.response.model;
				} else if (typeof this._getResponseModelName === 'function') {
					responseModelName = this._getResponseModelName(methodInfo, params, results);
				}

				var response = (results.body.response && results.body.response[methodInfo.response && methodInfo.response.name || responseModelName || acsObj.objectName || name]) || null;
				if (!response) {
					// we don't have a response, but maybe we have a generic value?
					if (results.body.meta && results.body.meta.hasOwnProperty(methodInfo.response && methodInfo.response.name || method)) {
						var val = results.body.meta[methodInfo.response && methodInfo.response.name || method];
						return callback(null, val);
					}
					return callback(null, instance);
				}

				var responseModel = responseModelName && this.getConnector().getModel(responseModelName);
				if (!responseModel || responseModel._isCustomObject) {
					responseModel = this;
				}

				if (Array.isArray(response) && (!methodInfo.response || !methodInfo.response.singleElement)) {
					try {
						return callback(null, new (Arrow.Collection)(responseModel, response.map(function (item) {
							return createInstance(responseModel, item, params);
						}, this)), results);
					}
					catch (E) {
						return callback(E);
					}
				}

				// single model
				Array.isArray(response) && (response = response[0]);

				if (instance instanceof Arrow.Instance) {
					// since we already have an instance, let's mix-in our response and return that
					(function merge(dest, src) {
						Object.keys(src).forEach(function (key) {
							if (src[key] !== null && typeof src[key] === 'object' && !Array.isArray(src[key])) {
								dest[key] || (dest[key] = {});
								merge(dest[key], src[key]);
							} else {
								try {
									dest[key] = src[key];
								} catch (e) {}
							}
						});
					}(instance, response));

					return callback(null, instance);
				}

				try {
					callback(null, createInstance(responseModel, response, params));
				}
				catch (E) {
					callback(E);
				}
			}.bind(this));
		};
	}, this);
};
