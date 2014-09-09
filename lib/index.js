var APIBuilder = require('apibuilder'),
	_ = require('lodash'),
	async = require('async'),
	crypto = require('crypto'),
	ACS = require('acs-node'),
	pkginfo = require('pkginfo')(module),
	pkginfo = module.exports,
	Connector = APIBuilder.Connector,
	Collection = APIBuilder.Collection,
	Instance = APIBuilder.Instance;

// --------- in memory DB connector -------

module.exports = Connector.extend({

	// generated configuration
	config: APIBuilder.Loader(),
	name: 'ACS',
	pkginfo: _.pick(pkginfo,'name','version','description','author','license','keywords','repository'),
	logger: APIBuilder.createLogger({},{name:'ACS',useConsole:true,level:'debug'}),

	// implementation

	constructor: function() {
	},
	fetchConfig: function(next) {
		next(null, this.config);
	},
	fetchMetadata: function(next){
		next(null, {
			fields: [
				Mobware.Metadata.Text({
					name: 'key',
					description: 'API Key',
					required: true
				}),
				Mobware.Metadata.Text({
					name: 'username',
					description: 'username for login',
					required: true
				}),
				Mobware.Metadata.Password({
					name: 'password',
					description: 'password',
					required: true,
					validator: /[a-z\d]{3,}/i
				})
			]
		});
	},
	fetchSchema: function(next){
		next();
	},
	loginRequired: function(request, callback) {
		// only require a login if we don't already have a valid connection

		// FIXME -- support per session login
		callback(null, !!!this.user);
	},
	login: function(request, callback) {
		callback();
	},
	connect: function(next) {
		this.logger.info('connect',this.config);

		// setup connection to ACS
		ACS.initACS(this.config.key);

		ACS.Users.login({login:this.config.username,password:this.config.password}, function(data){
			if (!data || !data.success) {
				return next(data && data.message || 'Error logging in');
			}
			this.user = data && data.users && data.users[0];
			next();
		}.bind(this));
	},
	disconnect: function(next){
		this.logger.info('disconnect');
		next();
	},
	findOne: function (Model, id, callback) {
		var name = Model.getMeta('object') || formatModelName(Model.name),
			fn = getACSObject(name,'query'),
			query = {where:{id:id}, limit:1};
		console.log(query);
		fn(query, createACSHandler(this.logger,name.toLowerCase(),callback,function(results){
			var instance = Model.instance(results[0],true);
			instance.setPrimaryKey(results[0].id);
			callback(null, instance);
		}));
	},
	findAll: function (Model, callback) {
		var name = Model.getMeta('object') || formatModelName(Model.name),
			fn = getACSObject(name,'query'),
			query = {};
		fn(query, createACSHandler(this.logger,name.toLowerCase(),callback,function(results){
			var array = [];
			for (var c=0;c<results.length;c++) {
				var instance = Model.instance(results[c],true);
				array.push(instance);
			}
			callback(null, new Collection(Model,array));
		}));
	},
	create: function (Model, values, callback) {
		var name = Model.getMeta('object') || formatModelName(Model.name),
			fn = getACSObject(name,'create');
		fn(values, createACSHandler(this.logger,name.toLowerCase(),callback,function(results){
			var instance = Model.instance(results[0],true);
			instance.setPrimaryKey(results[0].id);
			callback(null, instance);
		}));
	},
	save: function (Model, instance, callback) {
		var name = Model.getMeta('object') || formatModelName(Model.name),
			fn = getACSObject(name,'update');
		fn(instance, createACSHandler(this.logger,name.toLowerCase(),callback,function(results){
			var instance = Model.instance(results[0],true);
			instance.setPrimaryKey(results[0].id);
			callback(null, model);
		}));
	},
	delete: function (Model, instance, callback) {
		var name = Model.getMeta('object') || formatModelName(Model.name),
			fn = getACSObject(name,'remove');
		fn(instance, createACSHandler(this.logger,name.toLowerCase(),callback,function(results){
			var instance = Model.instance(results[0],true);
			instance.setPrimaryKey(results[0].id);
			callback(null, instance);
		}));
	},
	deleteAll: function (Model, callback) {
		//TODO:
		callback(new Error("not yet implemented"));
	},
	query: function(Model, query, callback) {
		var name = Model.getMeta('object') || formatModelName(model.name),
			fn = getACSObject(name,'query');
		fn(query, createACSHandler(this.logger,name.toLowerCase(),callback,function(results){
			var array = [];
			for (var c=0;c<results.length;c++) {
				var instance = Model.instance(results[c],true);
				instance.setPrimaryKey(results[c].id);
				array.push(instance);
			}
			callback(null, array);
		}));
	}

});


// utilities only needed for this connector

function formatModelName(name) {
	name = name.charAt(0).toUpperCase() + name.substring(1);
	if (!/s$/.test(name)) {
		// ACS objects are plural
		name += 's';
	}
	return name;
}

function getACSObject(name, method, orig_name) {
	var object = ACS[name];
	if (object) {
		var fn = object[method];
		if (!fn) {
			// method not supported
			var err = new Error("method not supported");
			err.code = 404;
			throw err;
		}
		if (name === 'Users' && method === 'remove') {
			// method not supported at this time
			var err = new Error("method not supported");
			err.code = 404;
			throw err;
		}
		return fn;
	}
	else {
		// attempt to look at the ACS name by lowercasing
		var keys = Object.keys(ACS),
			lname = name.toLowerCase();
		for (var c=0;c<keys.length;c++) {
			var prop = keys[c].toLowerCase();
			if (prop === lname) {
				// use the name we found
				return getACSObject(prop, method, name);
			}
		}
	}
	throw new Error('invalid ACS Object named: '+(orig_name||name));
}

/**
 * generic ACS response handler
 */
function createACSHandler(logger, key, error, success) {
	return function(result) {
		logger.trace('ACS',key,result);
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
			logger.warn('unexpected ACS result returned',result);
			return error('unexpected result returned');
		}
	}
}
