'use strict';

var _ = require('lodash'),
	ACS = require('acs-node'),
	acsObjects = ACS.getACSObjects(),
	async = require('async'),
	pkginfo = require('pkginfo')(module) && module.exports,
	defaultConfig = require('fs').readFileSync(__dirname + '/../conf/example.config.js', 'utf8');

// --------- ACS Connector -------

exports.create = function create(APIBuilder, server) {

	var Collection = APIBuilder.Collection,
		Instance = APIBuilder.Instance;

	return APIBuilder.Connector.extend({
		/*
		 * Configuration
		 */
		pkginfo: _.pick(pkginfo, 'name', 'version', 'description', 'author', 'license', 'keywords', 'repository'),
		logger: server && server.logger || APIBuilder.createLogger({}, { name: pkginfo.name }),
		models: APIBuilder.loadModelsForConnector('appc.acs', module),
		defaultConfig: defaultConfig,

		/**
		 * Wires up the built-in models and listens for any external models that
		 * need to be wired up.
		 */
		postCreate: function () {
			var env = this.config.env || this.config.environment || 'production',
				key = this.config[env + '_key'] || this.config.key,
				opts = {
					apiEntryPoint: this.config[env + '_baseurl'] || this.config.baseurl || ''
				};

			this.acs = new ACS(key, opts);

			this.logger.debug('Wiring up models');
			Object.keys(acsObjects).forEach(function (name) {
				var acsObj = acsObjects[name],
					modelName = APIBuilder.singularize(acsObj.objectName || name),
					model = this.models[modelName];

				if (!model) {
					this.logger.debug('model "%s" does not exist, skipping', modelName);
					return;
				}

				this.wireupModel(acsObjects[name], model, name);
			}, this);

			var CustomObjectModel = this.models.customObject;

			this.on('init-model', function (Model) {
				// make sure the connector is initialized and that this model hasn't been initialized already
				if (!this.models || this.models[Model.name]) {
					return;
				}

				this.logger.debug('Wiring up custom object: ' + Model.name);

				Model._instanceMethods = CustomObjectModel._instanceMethods;
				Model._isCustomObject = true;

				CustomObjectModel._methods.forEach(function (method, i, arr) {
					this.logger.debug((i + 1 < arr.length ? '├─ ' : '└─ ') + method + '()');
					Model[method] = CustomObjectModel[method].bind(Model);
				}, this);

				Model.instance = function instance(values, skipNotFound) {
					if (values.fields) {
						Object.keys(values.fields).forEach(function (key) {
							values[key] = values.fields[key];
						});
					}
					delete values.fields;
					return new Instance(this, values, skipNotFound);
				};

				Model._prepareParams = function (method, instance, params, defaultValue) {
					params || (params = {});

					var id = instance instanceof Instance ? instance.getPrimaryKey() : Array.isArray(params) ? params.join(',') : typeof params === 'string' ? params : null;

					switch (method) {
						case 'create':
							return {
								classname: Model.name,
								fields: params
							};
						case 'update':
							return {
								classname: Model.name,
								id: id,
								fields: instance.values(true)
							};
						case 'delete':
							return {
								classname: Model.name,
								ids: id
							};
						case 'show':
							return {
								classname: Model.name,
								id: id
							};
					}

					params.classname = Model.name;
					return params;
				};

				Model._getResponseModelName = function () {
					return Model.name;
				};

				this.models[Model.name] = Model;
			}.bind(this));
		},

		/**
		 * Wires up methods from the specified ACS Object on the specified model.
		 *
		 * If the ACS Object declares a method such as "count", this function will add
		 * a "count" method to the model.
		 *
		 * However if the ACS Object declares a method that the model already has such
		 * as "create", it will wire up the method as "_create". The model's existing
		 * "create" already calls the connector's "create" which knows that it needs
		 * to call "_create".
		 *
		 * @param {object} acsObj - The ACS Object descriptor from the acs-node-sdk library.
		 * @param {Model} model - The model to wire up.
		 * @param {string} [name] - The name of the model. If absent, then it get the name
		 *     from the model and prints out that the model is a custom object.
		 */
		wireupModel: function (acsObj, model, name, isCustomObject) {
			this.logger.debug(name + (isCustomObject ? ' (custom object)' : ''));

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
				return instance;
			}

			Object.keys(acsObj.methods).forEach(function (method, i, arr) {
				var branch = (i + 1 < arr.length ? '├─ ' : '└─ ');

				// get the method info from the ACS Object descriptor
				var methodInfo = _.merge({}, acsObj.methods[method]);

				// mixin the model specific properties
				if (model.methodMeta && model.methodMeta[method]) {
					_.merge(methodInfo, model.methodMeta[method]);
				}

				// in some cases, we have two methods that do the same thing and the
				// duplicate methods are marked as "canonical".
				if (methodInfo.canonical) {
					this.logger.debug('├─ ' + method + '() is a canonical method; points to ' + methodInfo.canonical + '()');
					var canonical = methodInfo.canonical;
					methodInfo = {};
					acsObj.methods[method] && _.merge(methodInfo, acsObj.methods[method]);
					method = canonical;
					acsObj.methods[method] && _.merge(methodInfo, acsObj.methods[method]);
					model.methodMeta[method] && _.merge(methodInfo, model.methodMeta[method]);
				}

				if (methodInfo.skip) {
					this.logger.debug('├─ ' + method + '() skipped');
					return;
				}

				if (methodInfo.alias) {
					this.logger.debug('├─ ' + method + '() is an alias for ' + methodInfo.alias + '()');
					method = methodInfo.alias;
				}

				// if the ACS method is named the same as an existing one on the model,
				// then we prepend our version so that the model version can call this
				// connector and then our connector can call this method
				var destMethod = method;
				if (methodInfo.method) {
					destMethod = methodInfo.method;
				} else if (!methodInfo.overwrite && typeof model[method] === 'function') {
					destMethod = '_' + method;
				}

				if (!methodInfo.overwrite && model[destMethod]) {
					return;
				}

				model._methods.push(destMethod);

				this.logger.debug(branch + destMethod + '(' + (methodInfo.instance ? 'instance, callback' : 'options, callback') + ') -> ' + methodInfo.apiMethodName);
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

				// create the method handler on the model (i.e. "_create", "count", etc)
				model[destMethod] = function (instance, params, callback) {
					if (!methodInfo.instance) {
						// need to unshift params
						callback = params;
						params = instance;
						instance = null;
					}
					if (typeof params === 'function') {
						callback = params;
						if (methodInfo.instance && !(instance instanceof Instance)) {
							params = instance;
							instance = null;
						} else {
							params = {};
						}
					}
					if (typeof callback !== 'function') {
						callback = function () {};
					}

					if (typeof this._prepareParams === 'function') {
						params = this._prepareParams(method, instance, params, instance instanceof Instance ? instance.values(true) : params);
					} else if (methodInfo.instance) {
						params = instance instanceof Instance ? instance.values(true) : params;
					}

					this.getConnector().acs[methodInfo.apiMethodName].call(this.getConnector().acs, params, function (err, results) {
						if (err) {
							return callback(err);
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
							return callback(null, new APIBuilder.Collection(responseModel, response.map(function (item) {
								return createInstance(responseModel, item, params);
							}, this)));
						}

						// single model
						Array.isArray(response) && (response = response[0]);

						if (instance instanceof Instance) {
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

						callback(null, createInstance(responseModel, response, params));
					}.bind(this));
				};
			}, this);
		},

		/**
		 * Returns the connector's meta data.
		 *
		 * @param {function} next - A function to call with the connector's meta data.
		 */
		fetchMetadata: function fetchMetadata(next) {
			next(null, {
				fields: [
					APIBuilder.Metadata.Text({
						name: 'env',
						description: 'ACS Environment to Use',
						required: false
					}),
					APIBuilder.Metadata.Text({
						name: 'key',
						description: 'API Key',
						required: false
					}),
					APIBuilder.Metadata.Text({
						name: 'production_key',
						description: 'API Key for Production',
						required: false
					}),
					APIBuilder.Metadata.Text({
						name: 'development_key',
						description: 'API Key for Development',
						required: false
					}),
					APIBuilder.Metadata.URL({
						name: 'baseurl',
						description: 'Base URL',
						required: false
					}),
					APIBuilder.Metadata.URL({
						name: 'production_baseurl',
						description: 'Base URL for Production',
						required: false
					}),
					APIBuilder.Metadata.URL({
						name: 'development_baseurl',
						description: 'Base URL for Development',
						required: false
					}),
					APIBuilder.Metadata.Text({
						name: 'username',
						description: 'username for login',
						required: false
					}),
					APIBuilder.Metadata.Password({
						name: 'password',
						description: 'password',
						required: false,
						validator: /[a-z\d]{3,}/i
					})
				]
			});
		},

		/**
		 * Returns the connector's configuration.
		 *
		 * @param {function} next - A function to call with the connector's configuration.
		 */
		fetchConfig: function fetchConfig(next) {
			next(null, this.config);
		},

		/**
		 * Logs in the connector's ACS user.
		 *
		 * @param {function} next - A function to call after logging in.
		 */
		connect: function connect(next) {
			this.logger.debug('logging into ACS as', this.config.username);
			this.acs.usersLogin({
				login: this.config.username,
				password: this.config.password
			}, function (err, result) {
				if (err) {
					return next(err);
				}

				this.logger.debug('successfully logged in');
				this.logger.debug('session cookie:', this.acs.sessionCookieString);
				this.user = result.body.response.users[0];
				next();
			}.bind(this));
		},

		/**
		 * Returns the connector's schema.
		 *
		 * @param {function} next - A function to call with the connector's schema.
		 */
		fetchSchema: function (next) {
			if (!this.schema) {
				// generate the schema
				this.schema = {};

				// map api methods to model aliases
				var crudMap = {
					update: 'save',
					query: [ 'find', 'findAll', 'findOne' ]
				};

				Object.keys(acsObjects).forEach(function (name) {
					var singular = APIBuilder.singularize(acsObjects[name].objectName || name),
						api = this.schema[singular] = {
							object: acsObjects[name].objectName,
							apis: {}
						};

					Object.keys(acsObjects[name].methods).forEach(function (method) {
						var methodInfo = acsObjects[name].methods[method],
							apiMethodName = methodInfo.apiMethodName,
							crudMethod = crudMap[method];

						if (crudMethod) {
							if (typeof crudMethod === 'string') {
								crudMethod = [ crudMethod ];
							}
							Array.isArray(crudMethod) && crudMethod.forEach(function (cm) {
								if (!api.apis[cm]) {
									api.apis[cm] = {
										method: apiMethodName
									};
								}
							});
						}

						api.apis[method] = {
							method: apiMethodName
						};
					});
				}, this);
			}

			next(null, this.schema);
		},

		/*
		 * CRUD methods
		 */
		create: invoker('_create'),

		findAll: function (Model, callback) {
			Model._query({ limit: 1000 }, callback);
		},

		findOne: function (Model, id, callback) {
			if (typeof id === 'function') {
				callback = id;
				id = null;
			}

			if (typeof callback !== 'function') {
				callback = function () {};
			}

			if (!id) {
				return callback(new Error('Missing required "id"'));
			}

			Model._query({
				limit: 1,
				where: {
					id: id
				}
			}, function (err, results) {
				if (err) {
					callback(err);
				} else {
					callback(null, results[0]);
				}
			});
		},

		query: invoker('_query'),

		save: invoker('_update', true),

		'delete': invoker('_delete'),

		deleteAll: function (Model, callback) {
			if (typeof callback !== 'function') {
				callback = function () {};
			}

			if (Model.methodMeta && Model.methodMeta.deleteAll && Model.methodMeta.deleteAll.disabled) {
				return callback(new TypeError('unsupported method "deleteAll"'));
			}

			if (typeof Model._deleteAll === 'function') {
				return Model._deleteAll(callback);
			}

			// no built-in batch delete, so findAll and manually delete
			Model._query({
				sel: {
					'all': ['id']
				},
				limit: 1000
			}, function (err, results) {
				if (err) {
					return callback(err);
				}

				async.eachLimit(results.toArray(), 10, function (instance, next) {
					Model._delete(instance, next);
				}, callback);
			});
		}
	});

	/**
	 * Helper function that returns the handler for crud methods.
	 *
	 * @param {string} method - The actual method to invoke.
	 * @param {boolean} isInstance - When true, configures the handler to accept a
	 *      model Instance. Otherwise the handler treats it as an options object.
	 *
	 * @returns {function}
	 */
	function invoker(method, isInstance) {
		/*
		 * The crud handler.
		 *
		 * @param {Model} Model - The model invoking the specified method.
		 * @param {Instance|object} obj - An Instance or object to be passed to the real method.
		 * @param {function} callback - A function to call after the method has completed.
		 */
		return function (Model, obj, callback) {
			if (isInstance) {
				if (!(obj instanceof Instance)) {
					return callback(new Error('Invalid instance'));
				}
				if (obj._deleted) {
					return callback(new Error('Invalid has already been deleted'));
				}
			} else {
				if (typeof obj === 'function') {
					callback = obj;
					obj = {};
				}
				if (obj instanceof Instance && obj._deleted) {
					return callback(new Error('Invalid has already been deleted'));
				} else if (typeof obj !== 'object') {
					obj = {};
				}
			}

			if (typeof callback !== 'function') {
				callback = function () {};
			}
			
			if (method === '_query' && obj) {
				if (obj.where) { obj.where = translateLike(obj.where); }
				if (obj.sel) { obj.sel = translateToAllArray(obj.sel); }
				if (obj.unsel) { obj.unsel = translateToAllArray(obj.unsel); }
				if (obj.order) { obj.order = translateToCSV(obj.order); }
			}

			// try to invoke the requested method
			if (typeof Model[method] !== 'function' || (Model.methodMeta && Model.methodMeta[method] && Model.methodMeta[method].disabled)) {
				return callback(new TypeError('unsupported method "' + method.replace(/^_/, '') + '"'));
			}

			// run the method
			Model[method](obj, callback);
		};
	}
	
	function translateLike(where) {
		for (var key in where) {
			if (where.hasOwnProperty(key)) {
				if (where[key] && where[key].$like) {
					where[key] = {
						$regex: '^' + where[key].$like
							.replace(/%{2}/g, '\\%')
							.replace(/(^|[^\\])%/g, '$1.*')
							.replace(/(^|[^\\])_/g, '$1.') + '$'
					};
					server && server.logger.trace('Converted $like', where[key]);
				}
			}
		}
		return where;
	}

	/**
	 * Translates the standard API Builder "sel" and "unsel" syntax (it's based on Mongo's) in to the syntax supported
	 * by the ACS queries.
	 * @param obj
	 */
	function translateToAllArray(obj) {
		if (!_.isObject(obj)) {
			return obj;
		}
		if (!obj.all) {
			obj.all = [];
		}
		for (var key in obj) {
			if (obj.hasOwnProperty(key) && key !== 'all') {
				if (obj[key] == 1) { // jshint ignore:line
					obj.all.push(key);
				}
				delete obj[key];
			}
		}
		return obj;
	}

	/**
	 * Translates the standard API Builder "order" syntax (it's based on Mongo's) in to the syntax supported by the ACS
	 * queries.
	 * @param obj
	 */
	function translateToCSV(obj) {
		var retVal = '';
		for (var key in obj) {
			if (obj.hasOwnProperty(key)) {
				if (obj[key] == 1) { // jshint ignore:line
					retVal += key;
				}
				else {
					retVal += '-' + key;
				}
			}
		}
		return retVal;
	}
};
