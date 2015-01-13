var _ = require('lodash'),
	async = require('async'),
	ACS = require('acs-node'),
	pkginfo = require('pkginfo')(module) && module.exports,
	defaultConfig = require('fs').readFileSync(__dirname + '/../conf/example.config.js', 'utf8');

// --------- ACS Connector -------

exports.create = function(APIBuilder, server) {

	var Connector = APIBuilder.Connector,
		Instance = APIBuilder.Instance,
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
		connect: function(next) {
			//this.logger.info('connect',this.config);

			var env = this.config.env || this.config.environment || 'production',
				key = this.config[env + '_key'] || this.config.key,
				base = (this.config[env + '_baseurl'] || this.config.baseurl || '').replace('https://', '');

			// setup connection to ACS
			ACS.initACS(key, null, base);

			ACS.Users.login({ login: this.config.username, password: this.config.password }, function(data) {
				if (!data || !data.success) {
					return next(data && data.message || 'Error logging in');
				}
				this.user = data && data.users && data.users[0];
				next();
			}.bind(this));
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
		
		/*
		 Metadata.
		 */
		defaultConfig: defaultConfig,
		fetchMetadata: function(next) {
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
		
		/*
		 CRUD.
		 */
		create: function(Model, values, callback) {
			var name = Model.getMeta('object') || formatModelName(Model.name),
				payload = Model.instance(values, false).toPayload(),
				fn = getACSObject(name, 'create');
			fn(payload, createACSHandler(this.logger, name.toLowerCase(), callback, function(results) {
				var instance = Model.instance(results[0], true);
				instance.setPrimaryKey(results[0].id);
				callback(null, instance);
			}));
		},
		findAll: function(Model, callback) {
			var name = Model.getMeta('object') || formatModelName(Model.name),
				fn = getACSObject(name, 'query'),
				query = {};
			fn(query, createACSHandler(this.logger, name.toLowerCase(), callback, function(results) {
				var array = [];
				for (var c = 0; c < results.length; c++) {
					var instance = Model.instance(results[c], true);
					instance.setPrimaryKey(results[c].id);
					array.push(instance);
				}
				callback(null, new Collection(Model, array));
			}));
		},
		findOne: function(Model, id, callback) {
			var name = Model.getMeta('object') || formatModelName(Model.name),
				fn = getACSObject(name, 'query'),
				query = { where: { id: id }, limit: 1 };
			fn(query, createACSHandler(this.logger, name.toLowerCase(), callback, function(results) {
				var instance = Model.instance(results[0], true);
				instance.setPrimaryKey(results[0].id);
				callback(null, instance);
			}));
		},
		query: function(Model, options, callback) {
			var name = Model.getMeta('object') || formatModelName(Model.name),
				fn = getACSObject(name, 'query');

			if (options) {
				if (options.sel && typeof options.sel !== 'string') {
					options.sel = JSON.stringify(Model.translateKeysForPayload(options.sel));
				}
				if (options.unsel && typeof options.unsel !== 'string') {
					options.unsel = JSON.stringify(Model.translateKeysForPayload(options.unsel));
				}
				if (options.where) {
					options.where = Model.translateKeysForPayload(options.where);
				}
				if (options.order && typeof options.order !== 'string') {
					options.order = '';
					var order = Model.translateKeysForPayload(options.order);
					// Translate the dictionary to the ACS string format.
					for (var key in order) {
						if (order.hasOwnProperty(key)) {
							options.order += ((order[key] == 1) ? '' : '-') + key + ','; // jshint ignore:line
						}
					}
					// Remove the trailing comma.
					if (options.order.length > 0) {
						options.order = options.order.slice(0, -1);
					}
				}
			}

			fn(options, createACSHandler(this.logger, name.toLowerCase(), callback, function(results) {
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
			fn(instance, createACSHandler(this.logger, name.toLowerCase(), callback, function(results) {
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
			fn(object, createACSHandler(this.logger, name.toLowerCase(), callback, function(results) {
				callback(null, instance);
			}));
		},
		deleteAll: function(Model, callback) {
			//TODO:
			callback(new Error("not yet implemented"));
		}

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
	var object = ACS[name];
	if (object) {
		if (name in MethodMapping) {
			var map = MethodMapping[name];
			// attempt to remap
			method = map[method] || method;
		}
		var fn = object[method];
		var err;
		if (!fn) {
			// method not supported
			err = new Error("method not supported");
			err.code = 404;
			throw err;
		}
		if (name === 'Users' && method === 'remove') {
			// method not supported at this time
			err = new Error("remove method not currently supported");
			err.code = 404;
			throw err;
		}
		return fn;
	}
	else {
		// attempt to look at the ACS name by lowercasing
		var keys = Object.keys(ACS),
			lname = name.toLowerCase();
		for (var c = 0; c < keys.length; c++) {
			var prop = keys[c].toLowerCase();
			if (prop === lname) {
				// use the name we found
				return getACSObject(prop, method, name);
			}
		}
	}
	throw new Error('invalid ACS Object named: ' + (orig_name || name));
}

/**
 * generic ACS response handler
 */
function createACSHandler(logger, key, error, success) {
	return function(result) {
		logger.trace('ACS', key, result);
		if (result && result.error) {
			return error(result.message);
		}
		if (result && result[key]) {
			return success(result[key]);
		}
		else if (result && result.success) {
			// no results
			return success();
		}
		else {
			logger.warn('unexpected ACS result returned', result);
			return error('unexpected result returned');
		}
	};
}
