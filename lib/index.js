var _ = require('lodash'),
	ACS = require('acs-node'),
	acsObjects = ACS.getACSObjects(),
	acsObjectNames = Object.keys(acsObjects),
	pkginfo = require('pkginfo')(module) && module.exports;

// --------- ACS Connector -------

exports.create = function create(APIBuilder, server) {

	var Connector = APIBuilder.Connector,
		Collection = APIBuilder.Collection;

	return Connector.extend({
		/*
		 Configuration.
		 */
		pkginfo: _.pick(pkginfo, 'name', 'version', 'description', 'author', 'license', 'keywords', 'repository'),
		logger: APIBuilder.createLogger({}, { name: pkginfo.name, useConsole: true, level: 'debug' }),

		/*
		 Lifecycle.
		 */
		constructor: function constructor() {
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

		connect: function connect(next) {
			//this.logger.info('connect',this.config);

			var env = this.config.env || this.config.environment || 'production';

			// setup connection to ACS
			this.acs = new ACS(this.config[env + '_key'] || this.config.key, {
				apiEntryPoint: this.config[env + '_baseurl'] || this.config.baseurl || ''
			});

			this.acs.usersLogin({
				login: this.config.username,
				password: this.config.password
			}, function (err, result) {
				if (!err) {
					this.user = result.body.response.users[0];
				}
				next(err);
			}.bind(this));
		},

		fetchSchema: function (next) {
			next();
		},

		loginRequired: function(request, callback) {
			// only require a login if we don't already have a valid connection

			// FIXME -- support per session login
			callback(null, !this.user);
		},

		login: function(request, callback) {
			callback();
		},

		disconnect: function(next) {
			this.logger.info('disconnect');
			next();
		},

		_getACSFunction: function _getACSFunction(name, method, orig_name) {
			var obj = acsObjects[name];
			if (obj) {
				var fnName = obj.methods[method] && obj.methods[method].apiMethodName;
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

		_invoke: function _invoke(Model, method, fields, callback) {
			if (typeof fields === 'function') {
				callback = fields;
				fields = {};
			}

			var query = {
				fields: fields
			};

			try {
				var name = Model.getMeta('object') || formatModelName(Model.name),
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

					if (result.body.response[name]) {
						return callback(null, result.body.response[name]);
					}

					if (result.meta.success === 'ok') {
						// no results
						return callback(null);
					}

					logger.warn('unexpected ACS result returned', result);
					callback(new Error('unexpected result returned'));
				}.bind(this));
			} catch (err) {
				callback(err);
			}
		},

		/*
		 CRUD.
		 */
		create: function (Model, values, callback) {
			this._invoke(Model, 'create', Model.instance(values, false).toPayload(), function (err, results) {
				if (err) {
					callback(err);
				} else {
					console.log(results);
					var instance = Model.instance(results[0], true);
					instance.setPrimaryKey(results[0].id);
					callback(null, instance);
				}
			});
		},

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
		}

/*
		query: function(Model, query, callback) {
			var name = Model.getMeta('object') || formatModelName(Model.name),
				fn = getACSObject(name, 'query');

			if (query && query.sel && typeof query.sel !== 'string') {
				query.sel = JSON.stringify(query.sel);
			}
			if (query && query.unsel && typeof query.unsel !== 'string') {
				query.unsel = JSON.stringify(query.unsel);
			}

			fn(query, createACSHandler(this.logger, name.toLowerCase(), callback, function(results) {
				var array = [];
				for (var c = 0; c < results.length; c++) {
					var instance = Model.instance(results[c], true);
					instance.setPrimaryKey(results[c].id);
					array.push(instance);
				}
				callback(null, array);
			}));
		},

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
	});

};

// utilities only needed for this connector

function formatModelName(name) {
	name = name.charAt(0).toUpperCase() + name.substring(1);
	if (!/s$/.test(name)) {
		// ACS objects are plural
		name += 's';
	}
	return name;
}

/*
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
