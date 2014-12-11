var _ = require('lodash'),
	async = require('async'),
	ACS = require('acs-node'),
	pkginfo = require('pkginfo')(module) && module.exports;

// --------- ACS Connector -------

exports.create = function(APIBuilder, server) {

	var Connector = APIBuilder.Connector,
		Instance = APIBuilder.Instance,
		Collection = APIBuilder.Collection;

	return Connector.extend({

		// generated configuration
		config: APIBuilder.Loader(),
		name: pkginfo.name,
		pkginfo: _.pick(pkginfo, 'name', 'version', 'description', 'author', 'license', 'keywords', 'repository'),
		logger: APIBuilder.createLogger({}, { name: 'appc.acs', useConsole: true, level: 'debug' }),

		// implementation

		constructor: function() {
		},
		fetchConfig: function(next) {
			next(null, this.config);
		},
		fetchMetadata: function(next) {
			next(null, {
				fields: [
					APIBuilder.Metadata.Text({
						name: 'key',
						description: 'API Key',
						required: true
					}),
					APIBuilder.Metadata.Text({
						name: 'username',
						description: 'username for login',
						required: true
					}),
					APIBuilder.Metadata.Password({
						name: 'password',
						description: 'password',
						required: true,
						validator: /[a-z\d]{3,}/i
					})
				]
			});
		},
		fetchSchema: function(next) {
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
		connect: function(next) {
			//this.logger.info('connect',this.config);

			var env = this.config.env || this.config.environment || 'production',
				key = this.config[env + '_key'] || this.config.key,
				base = (this.config[env + '_baseurl'] || this.config.baseurl || '').replace('https://','');

			// setup connection to ACS
			ACS.initACS(key,null,base);

			ACS.Users.login({ login: this.config.username, password: this.config.password }, function(data) {
				if (!data || !data.success) {
					return next(data && data.message || 'Error logging in');
				}
				this.user = data && data.users && data.users[0];
				next();
			}.bind(this));
		},
		disconnect: function(next) {
			this.logger.info('disconnect');
			next();
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
		save: function(Model, instance, callback) {
			var name = Model.getMeta('object') || formatModelName(Model.name),
				fn = getACSObject(name, 'update');
			fn(instance, createACSHandler(this.logger, name.toLowerCase(), callback, function(results) {
				var instance = Model.instance(results[0], true);
				instance.setPrimaryKey(results[0].id);
				callback(null, instance);
			}));
		},
		delete: function(Model, instance, callback) {
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
		},
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
