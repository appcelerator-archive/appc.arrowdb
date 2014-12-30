var _ = require('lodash'),
	ACS = require('acs-node'),
	acsObjects = ACS.getACSObjects(),
	acsObjectNames = Object.keys(acsObjects),
	pkginfo = require('pkginfo')(module) && module.exports;

var util = require('util');
function dump() {
	Array.prototype.slice.call(arguments).forEach(function (arg) {
		console.log(util.inspect(arg, false, null, true));
	});
}

// --------- ACS Connector -------

exports.create = function create(APIBuilder, server) {

	var Collection = APIBuilder.Collection,
		Instance = APIBuilder.Instance;

	return APIBuilder.Connector.extend({
		/*
		 * Configuration
		 */
		pkginfo: _.pick(pkginfo, 'name', 'version', 'description', 'author', 'license', 'keywords', 'repository'),
		logger: APIBuilder.createLogger({}, { name: pkginfo.name }),
		models: APIBuilder.loadModelsForConnector('appc.acs', module),

		/*
		 * Lifecycle
		 */
		constructor: function constructor() {
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
						methodName = methodInfo.apiMethodName,
						crudMethod = crudMap[method];

					if (crudMethod) {
						if (typeof crudMethod === 'string') {
							crudMethod = [ crudMethod ];
						}
						Array.isArray(crudMethod) && crudMethod.forEach(function (cm) {
							if (!api.apis[cm]) {
								api.apis[cm] = {
									method: methodName
								};
							}
						});
					}

					api.apis[method] = {
						method: methodName
					};
				});
			}, this);
		},

		postCreate: function() {
			var env = this.config.env || this.config.environment || 'production',
				key = this.config[env + '_key'] || this.config.key,
				opts = {
					apiEntryPoint: this.config[env + '_baseurl'] || this.config.baseurl || ''
				},
				logger = this.logger,
				modelMap = {};

			// create ACS instance
			this.connectorACS = new ACS(key, opts);

			function createInstance(model, values) {
				var instance = model.instance(values, true);
				instance.setPrimaryKey(values.id);
				instance._acs = new ACS(key, opts);
				model._instanceMethods && Object.keys(model._instanceMethods).forEach(function (method) {
					instance[method] = model._instanceMethods[method].bind(instance);
				});
				return instance;
			}

			this.logger.debug('Wiring up static methods on models');
			Object.keys(acsObjects).forEach(function (name) {
				var acsObj = acsObjects[name],
					modelName = APIBuilder.singularize(acsObj.objectName || name),
					model = this.models[modelName];

				if (!model) {
					this.logger.debug('model "%s" does not exist, skipping', modelName);
					return;
				}

				this.logger.debug(name);
				modelMap[modelName] = name;
				model._instanceMethods = {};

				Object.keys(acsObj.methods).forEach(function (method, i, arr) {
					var methodInfo = acsObj.methods[method],
						methodName = methodInfo.apiMethodName,
						destMethod = method,
						branch = (i + 1 < arr.length ? '├─ ' : '└─ ');

					if (methodInfo.canonical) {
						this.logger.debug(branch + method + '() skipping canonical method; points to ' + methodInfo.canonical + '()');
						return;
					}

					// if the ACS method is named the same as an existing one on the model,
					// then we prepend our version so that the model version can call this
					// connector and then our connector can call this method
					if (typeof model[method] === 'function') {
						destMethod = '_' + method;
					}

					this.logger.debug(branch + destMethod + '(' + (methodInfo.instance ? 'instance, callback' : 'options, callback') + ')');
					branch = '|  ';

					function processResults(instance, callback) {
						if (typeof instance === 'function' && !(instance instanceof Instance)) {
							callback = instance;
							instance = null;
						}

						return function (err, results) {
							if (err) {
								return callback(err);
							}

							var response = (results.body.response && results.body.response[acsObj.objectName]) || null;
							if (!response) {
								// we don't have a response, but maybe we have a generic value?
								if (methodInfo.response && results.body.meta && results.body.meta.hasOwnProperty(methodInfo.response.name || method)) {
									return callback(null, results.body.meta[methodInfo.response.name || method]);
								}
								return callback(null, instance);
							}

							if (methodInfo.response && /\[.*?\]$/.test(methodInfo.response.type) && !methodInfo.response.singleElement) {
								// array of models
								var items = [];
								for (var c = 0; c < response.length; c++) {
									items.push(createInstance(model, response[c]));
								}
								return callback(null, new APIBuilder.Collection(model, items));
							}

							// single model
							callback(null, createInstance(model, response[0]));
						};
					}

					if (methodInfo.instance) {
						// add the method to the model. if the method already exists (i.e. create, delete, query),
						// then the method name will be prefixed with an underscore.
						model[destMethod] = function (instance, options, callback) {
							if (!(instance instanceof Instance)) {
								callback(new Error('Invalid instance'));
							}

							if (typeof options === 'function') {
								callback = options;
								options = {};
							}
							if (typeof callback !== 'function') {
								callback = function () {};
							}

							var params;
							if (typeof model.prepareParams === 'function') {
								params = model.prepareParams(method, instance, options);
							} else {
								params = instance.values(true);
							}

							instance._acs[methodName].call(instance._acs, params, processResults(instance, callback));
						};

						model._instanceMethods[method] = function (options, callback) {
							if (typeof options === 'function') {
								callback = options;
								options = {};
							}
							if (typeof callback !== 'function') {
								callback = function () {};
							}

							// should we be set()'ing each option value on this?

							if (model[method].length > 2) {
								return model[method](this, options, callback);
							}
							return model[method](this, callback);
						};
					} else {
						model[destMethod] = function (options, callback) {
							if (typeof options === 'function') {
								callback = options;
								options = {};
							}

							this.connectorACS[methodName].call(this.connectorACS, options, processResults(callback));
						}.bind(this);
					}
				}, this);
			}, this);
		},

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

		fetchConfig: function fetchConfig(next) {
			next(null, this.config);
		},

		getModel: function getModel(name) {
			if (this.models[name]) {
				return this.models[name];
			}

			// we have a custom object, so create an empty model
			return (this.models[name] = APIBuilder.Model.extend(name, {
				fields: {},
				connector: this
			}));
		},

		connect: function connect(next) {
			this.logger.debug('logging into ACS as', this.config.username);
			this.connectorACS.usersLogin({
				login: this.config.username,
				password: this.config.password
			}, function (err, result) {
				if (!err) {
					this.user = result.body.response.users[0];
				}

				this.logger.debug('successfully logged in');
				this.logger.debug('session cookie:', this.connectorACS.sessionCookieString);

				next(err);
			}.bind(this));
		},

		fetchSchema: function (next) {
			next(null, this.schema);
		},

		loginRequired: function(request, callback) {
			// only require a login if we don't already have a valid connection

			// FIXME -- support per session login
			callback(null, !this.user);
		},

		login: function(request, response, callback) {
			callback();
		},

		/*
		 CRUD.
		 */
		create: invoker('_create'),

		findAll: function (Model, callback) {
			Model._query(callback);
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

		'delete': invoker('_delete', true),

		deleteAll: function (Model, callback) {
			console.log('CONNECTOR DELETEALL');
			process.exit(0);
		}
	});

	function invoker(method, isInstance) {
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
				if (typeof obj !== 'object') {
					obj = {};
				}
			}
			if (typeof callback !== 'function') {
				callback = function () {};
			}
			if (typeof Model[method] === 'function') {
				Model[method](obj, callback);
			} else {
				callback(null, null);
			}
		};
	}
};
