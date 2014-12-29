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
		 Configuration.
		 */
		pkginfo: _.pick(pkginfo, 'name', 'version', 'description', 'author', 'license', 'keywords', 'repository'),
		logger: APIBuilder.createLogger({}, { name: pkginfo.name }),
		models: APIBuilder.loadModelsForConnector('appc.acs', module),

		/*
		 Lifecycle.
		 */
		constructor: function constructor() {
			// generate the models
/*
			this.models = {};
			Object.keys(acsObjects).filter(function (f) { return f === 'Users'; }).forEach(function (name) {
				var acsObj = acsObjects[name],
					modelName = APIBuilder.singularize(acsObj.objectName || name),
					fields = {};

				// build out the fields
				Object.keys(acsObj.methods).forEach(function (method) {
					var params = acsObj.methods[method].params;
					params && Object.keys(params).forEach(function (param) {
						if (fields[param]) { return; }

						var type = Array.isArray(param.type) ? param.type[0] : param.type,
							field = fields[param] = {
								type: Object, // default to an object
								readonly: !!param.readonly,
								required: !!param.required,
								hidden: !!param.hide
							};

						if (type === 'String') {
							field.type = String;
						} else if (type === 'Number') {
							field.type = Number;
						} else if (type === 'Boolean') {
							field.type = Boolean;
						} else if (type === 'Array') {
							field.type = Array;
						} else if (type === 'Date') {
							field.type = Date;
						}
					});
				});

				console.log(fields);
*/
/*
				var model = models[modelName] = APIBuilder.Model.extend(name, {
						fields: {},
						connector: this
					}))

				dump(modelName, acsObj);

				Object.keys(acsObj.methods).forEach(function (method) {
					if (typeof model[method] !== 'function') {
						model[method] = function () {
							console.log(modelName + ':' + method + '() has been invoked!');
							console.log(arguments);
						};
					}
				});
*/
//			}, this);

/*
			this.schema = {};

			// map api methods to model aliases
			var crudMap = {
				update: 'save',
				query: [ 'find', 'findAll', 'findOne' ]
			};
dump(acsObjects);
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
*/
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
			this.acs = new ACS(key, opts);

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
				model._acs = this.acs;
				model._instanceMethods = {};

				Object.keys(acsObj.methods).forEach(function (method, i, arr) {
					var methodName = acsObj.methods[method].apiMethodName,
						destMethod = method,
						branch = (i + 1 < arr.length ? '├─ ' : '└─ ');

					if (acsObj.methods[method].canonical) {
						this.logger.debug(branch + method + '() skipping canonical method; points to ' + acsObj.methods[method].canonical + '()');
						return;
					}

					// if the ACS method is named the same as an existing one on the model,
					// then we prepend our version so that the model version can call this
					// connector and then our connector can call this method
					if (typeof model[method] === 'function') {
						destMethod = '_' + method;
					}

					this.logger.debug(branch + destMethod + '(' + (acsObj.methods[method].instance ? 'instance, callback' : 'options, callback') + ')');
					branch = '|  ';

					function processResults(callback) {
						return function (err, results) {
							if (err) {
								return callback(err);
							}

							var response = (results.body.response && results.body.response[acsObj.objectName]) || null;
							if (!response) {
								// we don't have a response, but maybe we have a generic value?
								if (acsObj.methods[method].response && results.body.meta && results.body.meta.hasOwnProperty(acsObj.methods[method].response.name || method)) {
									return callback(null, results.body.meta[acsObj.methods[method].response.name || method]);
								}
								return callback(null, null);
							}

							if (acsObj.methods[method].response && /\[.*?\]$/.test(acsObj.methods[method].response.type) && !acsObj.methods[method].response.singleElement) {
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

					if (acsObj.methods[method].instance) {
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
							if (typeof model.translate === 'function') {
								params = model.translate(method, instance, options);
							} else {
								params = instance.values(true);
							}

							instance._acs[methodName].call(instance._acs, params, processResults(callback));
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

							model._acs[methodName].call(model._acs, options, processResults(callback));
						};
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
			this.acs.usersLogin({
				login: this.config.username,
				password: this.config.password
			}, function (err, result) {
				if (!err) {
					this.user = result.body.response.users[0];
				}

				this.logger.debug('successfully logged in');
				this.logger.debug('session cookie:', this.acs.sessionCookieString);

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
		create: function (Model, values, callback) {
			if (typeof values === 'function') {
				callback = values;
				values = {};
			}
			if (typeof callback !== 'function') {
				callback = function () {};
			}
			if (typeof Model._create === 'function') {
				Model._create(values, callback);
			} else {
				callback(null, null);
			}
		},

		findAll: function (Model, callback) {
			console.log('CONNECTOR FINDALL');
			process.exit(0);
		},

		findOne: function (Model, id, callback) {
			console.log('CONNECTOR FINDONE');
			process.exit(0);
		},

		query: function (Model, options, callback) {
			Model._query(options, callback);
		},

		save: function (Model, instance, callback) {
			if (!(instance instanceof Instance)) {
				callback(new Error('Invalid instance'));
			}
			if (typeof callback !== 'function') {
				callback = function () {};
			}
			if (typeof Model._update === 'function') {
				Model._update(instance, callback);
			} else {
				callback(null, null);
			}
		},

		'delete': function (Model, instance, callback) {
			console.log('CONNECTOR DELETE');
			process.exit(0);
		},

		deleteAll: function (Model, callback) {
			console.log('CONNECTOR DELETEALL');
			process.exit(0);
		}
	});

};




/*

OLD STUFF


		_getACSFunction: function _getACSFunction(name, method, orig_name) {
			var obj = this.schema[name];
			if (obj) {
				var fnName = obj.apis[method] && obj.apis[method].method;
				if (!fnName || !this.acs[fnName]) {
					// method not supported
					var err = new Error('method not supported');
					err.code = 404;
					throw err;
				}
				return this.acs[fnName].bind(this.acs);
			}

			// attempt to look at the ACS name by lowercasing
			var lname = name.toLowerCase();

			for (var c = 0; c < acsObjectNames.length; c++) {
				var prop = acsObjectNames[c].toLowerCase();
				if (prop === lname) {
					// use the name we found
					return this._getACSFunction(prop, method, name);
				}
			}

			return null;
		},

		_invoke: function _invoke(Model, method, query, callback) {
			if (typeof fields === 'function') {
				callback = query;
				query = {};
			}

			try {
				var name = Model.getMeta('object') || Model.name,
					fn = this._getACSFunction(name, method);

				if (fn === null) {
					// treat as a custom object
					query.classname = name;
					fn = this._getACSFunction('CustomObjects', method);
				}

				fn(query, function (err, result) {
					this.logger.trace('ACS', name, result);
					if (err) {
						return callback(err);
					}
					callback(null, result.body.response && result.body.response[name] || null);
				}.bind(this));
			} catch (err) {
				callback(err);
			}
		},
*/
		/*
		 CRUD.
		 */
/*
		create: function (Model, values, callback) {
			this._invoke(Model, 'create', Model.instance(values, false).toPayload(), function (err, results) {
				if (err) {
					callback(err);
				} else {
					var instance = Model.instance(results[0], true);
					instance.setPrimaryKey(results[0].id);
					callback(null, instance);
				}
			});
		}
*/

		/*,

		findOne: function (Model, id, callback) {
			this._invoke(Model, 'query', { where: { id: id }, limit: 1 }, function (err, results) {
				if (err) {
					callback(err);
				} else {
					var instance = Model.instance(results[0], true);
					instance.setPrimaryKey(results[0].id);
					callback(null, instance);
				}
			});
		},

		findAll: function (Model, callback) {
			this._invoke(Model, 'query', function (err, results) {
				if (err) {
					callback(err);
				} else {
					var array = [];
					for (var c = 0; c < results.length; c++) {
						var instance = Model.instance(results[c], true);
						instance.setPrimaryKey(results[c].id);
						array.push(instance);
					}
					callback(null, new Collection(Model, array));
				}
			});
		},

		query: function (Model, query, callback) {
			if (typeof query === 'function') {
				callback = query;
				query = {};
			}

			if (query && query.sel && typeof query.sel !== 'string') {
				query.sel = JSON.stringify(query.sel);
			}

			if (query && query.unsel && typeof query.unsel !== 'string') {
				query.unsel = JSON.stringify(query.unsel);
			}
			if (query && query.where) {
				query.where = Model.instance(query.where, true).toPayload();
			}

			this._invoke(Model, 'query', query, function (err, results) {
				if (err) {
					callback(err);
				} else {
					var array = [];
					for (var c = 0; c < results.length; c++) {
						var instance = Model.instance(results[c], true);
						instance.setPrimaryKey(results[c].id);
						array.push(instance);
					}
					callback(null, array);
				}
			});
		}

		save: function(Model, instance, callback) {
			var name = Model.getMeta('object') || formatModelName(Model.name),
				fn = getACSObject(name, 'update');
			fn(instance, createACSHandler(this.logger, name.toLowerCase(), callback, function (results) {
				var instance = Model.instance(results[0], true);
				instance.setPrimaryKey(results[0].id);
				callback(null, instance);
			}));
		},

		'delete': function(Model, instance, callback) {
			var name = Model.getMeta('object') || formatModelName(Model.name),
				fn = getACSObject(name, 'remove'),
				key_field = getPrimaryKeyFieldName(name),
				object = {};
			object[key_field] = instance.getPrimaryKey();
			fn(object, createACSHandler(this.logger, name.toLowerCase(), callback, function (results) {
				callback(null, instance);
			}));
		},

		deleteAll: function (Model, callback) {
			//TODO:
			callback(new Error('not yet implemented'));
		}
*/

/*
// utilities only needed for this connector

function formatModelName(name) {
	name = name.charAt(0).toUpperCase() + name.slice(1);
	if (!/s$/.test(name)) {
		// ACS objects are plural
		name += 's';
	}
	return name;
}


var MethodMapping = {
	'KeyValues': {
		'create': 'set',
		'update': 'set'
	}
};

var IdMapping = {
	'Posts': 'post_id'
};

function getPrimaryKeyFieldName(name) {
	return IdMapping[name] || 'id';
}

function getACSObject(name, method, orig_name) {
	var object = acsObjects[name];
	if (object) {
/*
		if (name in MethodMapping) {
			var map = MethodMapping[name];
			// attempt to remap
			method = map[method] || method;
		}
* /

		var fn = object.methods[method] && object.methods[method].apiMethodName;
		if (!fn) {
			// method not supported
			var err = new Error('method not supported');
			err.code = 404;
			throw err;
		}

/*
		if (name === 'Users' && method === 'remove') {
			// method not supported at this time
			err = new Error('remove method not currently supported');
			err.code = 404;
			throw err;
		}
* /

		return fn;
	}

	// attempt to look at the ACS name by lowercasing
	var acsObjectNames = Object.keys(acsObjects),
		lname = name.toLowerCase();

	for (var c = 0; c < acsObjectNames.length; c++) {
		var prop = acsObjectNames[c].toLowerCase();
		if (prop === lname) {
			// use the name we found
			return getACSObject(prop, method, name);
		}
	}

	// not a known object, treat this as a custom object
	return getACSObject('CustomObjects', method, name);


	//throw new Error('invalid ACS Object named: ' + (orig_name || name));
}

/**
 * generic ACS response handler
 * /
function createACSHandler(logger, key, error, success) {
	return function (err, result) {
		logger.trace('ACS', key, result);

		if (err) {
			return error(err);
		}

		if (result.body.response[key]) {
			return success(result.body.response[key]);
		}

		if (result.meta.success === 'ok') {
			// no results
			return success();
		}

		logger.warn('unexpected ACS result returned', result);
		return error('unexpected result returned');
	};
}
*/
