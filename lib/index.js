var Mobware = require('mobware2'),
	_ = require('lodash'),
	ACS = require('acs-node'),
	pkginfo = require('pkginfo')(module),
	pkginfo = module.exports;

exports = module.exports = Connector;

// --------- ACS connector -------

function Connector(obj) {
	return Mobware.createConnector(obj||{},{

		// pull in metadata from our package.json for this connector
		pkginfo: _.pick(pkginfo,'name','version','description','author','license','keywords','repository'),

		// implementation methods
		name: 'ACS',

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
		readOne: function(model, id, next) {
			var name = model.getMetadata('object') || formatModelName(model.name),
				fn = getACSObject(name,'query'),
				query = {where:{id:id}, limit:1};
			console.log(query);
			fn(query, createACSHandler(this.logger,name.toLowerCase(),next,function(results){
				model.set(results[0]);
				next(null, model);
			}));
		},
		readAll: function(model, next){
			var name = model.getMetadata('object') || formatModelName(model.name),
				fn = getACSObject(name,'query'),
				query = {};
			fn(query, createACSHandler(this.logger,name.toLowerCase(),next,function(results){
				var array = [];
				for (var c=0;c<results.length;c++) {
					array.push(model.new(results[c],true));
				}
				next(null, array);
			}));
		},
		create: function(model, next){
			var name = model.getMetadata('object') || formatModelName(model.name),
				fn = getACSObject(name,'create'),
				obj = model.toJSON();
			fn(obj, createACSHandler(this.logger,name.toLowerCase(),next,function(results){
				model.set(results[0]);
				next(null, model);
			}));
		},
		update: function(model, next){
			var name = model.getMetadata('object') || formatModelName(model.name),
				fn = getACSObject(name,'update'),
				obj = model.toJSON(true);
			console.log('update',obj);
			fn(obj, createACSHandler(this.logger,name.toLowerCase(),next,function(results){
				model.set(results[0]);
				next(null, model);
			}));
		},
		delete: function(model, id, next) {
			var name = model.getMetadata('object') || formatModelName(model.name),
				fn = getACSObject(name,'remove'),
				obj = model.toJSON();
			fn(obj, createACSHandler(this.logger,name.toLowerCase(),next,function(results){
				model.set(results[0]);
				next(null, model);
			}));
		},
		query: function(model, query, next) {
			var name = model.getMetadata('object') || formatModelName(model.name),
				fn = getACSObject(name,'query');
			fn(query, createACSHandler(this.logger,name.toLowerCase(),next,function(results){
				var array = [];
				for (var c=0;c<results.length;c++) {
					array.push(model.new(results[c],true));
				}
				next(null, array);
			}));
		}
	});
}

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
