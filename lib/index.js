'use strict';

var _ = require('lodash'),
	ArrowDB = require('arrowdb'),
	dbObjects = ArrowDB.getDBObjects(),
	async = require('async'),
	pkginfo = require('pkginfo')(module) && module.exports,
	defaultConfig = require('fs').readFileSync(__dirname + '/../conf/example.config.js', 'utf8');

// --------- Arrow DB Connector -------

exports.create = function create(Arrow, server) {

	var Collection = Arrow.Collection,
		Instance = Arrow.Instance;

	return Arrow.Connector.extend({
		/*
		 * Configuration
		 */
		pkginfo: _.pick(pkginfo, 'name', 'version', 'description', 'author', 'license', 'keywords', 'repository'),
		logger: server && server.logger || Arrow.createLogger({}, { name: pkginfo.name }),
		models: Arrow.loadModelsForConnector('appc.arrowdb', module),
		defaultConfig: defaultConfig,
		translateWhereRegex: true,

		/**
		 * return the column that is the primary key internally (not in the model, but in the native data source)
		 * this is used by the model when translating the query for selecting/unselecting columns
		 */
		getPrimaryKeyColumnName: function(Model) {
			return 'id';
		},

		/**
		 * Wires up the built-in models and listens for any external models that
		 * need to be wired up.
		 */
		postCreate: function () {
			var generateModelsFromSchema = this.config.generateModelsFromSchema === undefined || this.config.generateModelsFromSchema;
			if (server) {
				for (var modelName in this.models) {
					if (this.models.hasOwnProperty(modelName)) {
						var model = this.models[modelName];
						model.autogen = !!this.config.modelAutogen;
						if (!generateModelsFromSchema) {
							server.removeModel(pkginfo.name + '/' + modelName);
							delete this.models[modelName];
						}
					}
				}
				server.registerModelsForConnector(this, this.models);
			}
			
			var env = this.config.env || this.config.environment || 'production',
				key = this.config[env + '_key'] || this.config.key,
				opts = {
					apiEntryPoint: this.config[env + '_baseurl'] || this.config.baseurl || ''
				};

			this.db = new ArrowDB(key, opts);

			this.logger.trace('Wiring up models');
			Object.keys(dbObjects).forEach(function (name) {
				var acsObj = dbObjects[name],
					modelName = 'appc.arrowdb/' + Arrow.singularize(acsObj.objectName || name),
					model = this.models[modelName];

				if (!model) {
					this.logger.debug('model "%s" does not exist, skipping', modelName);
					return;
				}

				this.wireupModel(dbObjects[name], model, name);
			}, this);

			var CustomObjectModel = this.getModel('customObject');

			this.on('init-model', function (Model) {
				// make sure the connector is initialized and that this model hasn't been initialized already
				if (!this.models || (this.models[Model.name] && this.models[Model.name]._inited)) {
					return;
				}

				var parent = Model._supermodel;
				while (parent && parent._supermodel) {
					parent = parent._supermodel;
				}
				if (parent && parent.indexOf(this.name) === 0) {
					parent = this.getModel(parent);
					this.logger.trace('Wiring up inherited object: ' + Model.name + ' to parent: ' + parent.name);
					// We have extended a built in object.
					for (var key in parent) {
						if (parent.hasOwnProperty(key) && key[0] === '_') {
							Model[key] = parent[key];
						}
					}
					return;
				}

				this.logger.trace('Wiring up custom object: ' + Model.name);

				Model._instanceMethods = CustomObjectModel._instanceMethods;
				Model._isCustomObject = true;

				CustomObjectModel._methods.forEach(function (method, i, arr) {
					this.logger.trace((i + 1 < arr.length ? '├─ ' : '└─ ') + method + '()');
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
		wireupModel: function (acsObj, model, name, isCustomObject) {
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
					Object.keys(values.custom_fields).forEach(function(k){
						if (model.fields[k]) {
							instance.set(k,values.custom_fields[k]);
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

				// create the method handler on the model (i.e. "_create", "count", etc)
				model[destMethod] = function (instance, params, callback) {
					if (!methodInfo.instance) {
						// need to unshift params
						callback = params;
						params = instance;
						instance = null;
					}
					if (!methodParameters && methodInfo.parameters) {
						methodParameters = {};
						methodInfo.parameters.forEach(function(mi){
							methodParameters[mi.name] = mi;
						});
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

					var fields = this.fields;

					if (typeof this._prepareParams === 'function') {
						params = this._prepareParams(method, instance, params, instance instanceof Instance ? instance.values(true) : params);
					} else if (methodInfo.instance) {
						params = instance instanceof Instance ? instance.values(true) : params;
					}

					if (/_update|_create/.test(destMethod) && params) {
						// handle custom fields
						var custom_fields = params.custom_fields || {};
						if (typeof(custom_fields)==='string') {
							custom_fields = custom_fields.split(',').map(function(k){return k.trim();});
						}
						Object.keys(fields).forEach(function(k){
							var field = fields[k] || {};
							if (field.copy_field && !(k in params)) {
								params[k] = params[field.copy_field];
							}
							if (!params[k] && field.default) {
								 params[k] = field.default || params[k];
							}
						});
						Object.keys(params).forEach(function(k){
							if (methodParameters && !(k in methodParameters)) {
								custom_fields[k] = params[k];
								delete params[k];
							}
						});

						params.custom_fields = custom_fields;
					}

					this.getConnector().db[methodInfo.apiMethodName].call(this.getConnector().db, params, function (err, results) {
						if (err) {
							if (err.errorCode===1004 && destMethod!=='_create') {
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
								return callback(null, new Arrow.Collection(responseModel, response.map(function (item) {
								return createInstance(responseModel, item, params);
								}, this)));
							}
							catch (E){
								return callback(E);
							}
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

						try {
							callback(null, createInstance(responseModel, response, params));
						}
						catch(E){
							callback(E);
						}
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
					Arrow.Metadata.Text({
						name: 'env',
						description: 'ArrowDB Environment to Use',
						required: false
					}),
					Arrow.Metadata.Text({
						name: 'key',
						description: 'API Key',
						required: false
					}),
					Arrow.Metadata.Text({
						name: 'production_key',
						description: 'API Key for Production',
						required: false
					}),
					Arrow.Metadata.Text({
						name: 'development_key',
						description: 'API Key for Development',
						required: false
					}),
					Arrow.Metadata.URL({
						name: 'baseurl',
						description: 'Base URL',
						required: false
					}),
					Arrow.Metadata.URL({
						name: 'production_baseurl',
						description: 'Base URL for Production',
						required: false
					}),
					Arrow.Metadata.URL({
						name: 'development_baseurl',
						description: 'Base URL for Development',
						required: false
					}),
					Arrow.Metadata.Text({
						name: 'username',
						description: 'username for login',
						required: false
					}),
					Arrow.Metadata.Password({
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
		 * Logs in the connector's ArrowDB user.
		 *
		 * @param {function} next - A function to call after logging in.
		 */
		connect: function connect(next) {
			this.logger.trace('logging into ArrowDB as', this.config.username);
			this.db.usersLogin({
				login: this.config.username,
				password: this.config.password
			}, function (err, result) {
				if (err) {
					return next(err);
				}

				this.logger.trace('successfully logged in');
				this.logger.trace('session cookie:', this.db.sessionCookieString);
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

				Object.keys(dbObjects).forEach(function (name) {
					var singular = Arrow.singularize(dbObjects[name].objectName || name),
						api = this.schema[singular] = {
							object: dbObjects[name].objectName,
							apis: {}
						};

					Object.keys(dbObjects[name].methods).forEach(function (method) {
						var methodInfo = dbObjects[name].methods[method],
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
				} else if (!results || !results.length) {
					callback();
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
				if (!results || results.length===0) {
					return callback(null, 0);
				}

				results = results.toArray();

				async.eachLimit(results, 10, function (instance, next) {
					Model._delete(instance, next);
				}, function(err){
					callback(err, err ? 0 : results.length);
				});
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
				if (obj.sel) { obj.sel = translateToAllArray(obj.sel); }
				if (obj.unsel) { obj.unsel = translateToAllArray(obj.unsel); }
				if (obj.order) { obj.order = translateToCSV(obj.order); }
				if (obj.where) { checkWhereQuery(obj.where); }
			}

			// try to invoke the requested method
			if (typeof Model[method] !== 'function' || (Model.methodMeta && Model.methodMeta[method] && Model.methodMeta[method].disabled)) {
				return callback(new TypeError('unsupported method "' + method.replace(/^_/, '') + '"'));
			}

			// run the method
			Model[method](obj, callback);
		};
	}
	
	/**
	 * Translates the standard API Builder "sel" and "unsel" syntax (it's based on Mongo's) in to the syntax supported
	 * by the ArrowDB queries.
	 * @param obj
	 */
	function translateToAllArray(obj) {
		if (_.isString(obj)) {
			var result = {};
			obj.split(',').forEach(function(k){
				result[k.trim()] = 1;
			});
			obj = result;
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
		// always return the id since we need it for setting the primary key
		if (obj.all.indexOf('id') < 0) {
			obj.all.push('id');
		}
		return obj;
	}

	/**
	 * Translates the standard API Builder "order" syntax (it's based on Mongo's) in to the syntax supported by the ArrowDB
	 * queries.
	 * @param obj
	 */
	function translateToCSV(obj) {
		if (!_.isObject(obj)) {
			return obj;
		}
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

	/**
	 * Makes sure that the query is valid.
	 * @param where
	 */
	function checkWhereQuery(where) {
		for (var key in where) {
			if (where.hasOwnProperty(key)) {
				var val = where[key];
				if (key === '$regex') {
					if (val.substr(0, 3) === '^.*') {
						throw new Error('ArrowDB $like queries cannot begin with a wildcard.');
					}
				}
				else if (_.isArray(val)) {
					for (var i = 0; i < val.length; i++) {
						if (_.isObject(val[i])) {
							checkWhereQuery(val[i]);
						}
					}
				}
				else if (_.isObject(val)) {
					checkWhereQuery(val);
				}
			}
		}
	}
};
