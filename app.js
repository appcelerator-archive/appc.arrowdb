/**
 * NOTE: this file is simply for testing your Connector and
 * not used or packaged with the actual connector when published
 */

var APIBuilder = require('appcelerator').apibuilder,
	async = require('async'), // TEMP!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
	server = new APIBuilder();

// lifecycle examples
server.on('starting', function() {
	server.logger.info('server is starting!');
});

server.on('started', function() {
	server.logger.info('server started!');
});

//--------------------- implement authorization ---------------------//

// fetch our configured apikey
var apikey = server.get('apikey');
server.logger.info('APIKey is:', apikey);

function APIKeyAuthorization(req, resp, next) {
	if (!apikey) {
		return next();
	}
	if (req.headers['apikey']) {
		var key = req.headers['apikey'];
		if (key == apikey) {
			return next();
		}
	}
	resp.status(401);
	return resp.json({
		id: "com.appcelerator.api.unauthorized",
		message: "Unauthorized",
		url: ""
	});
}

//--------------------- simple user model ---------------------//

var User = APIBuilder.Model.extend('user', {
	fields: {
		first_name: { type: String },
		last_name: { type: String },
		email: { type: String },
		role: { type: String },
		username: { type: String, readonly: true },
		password: { type: String, hidden: true },
		password_confirmation: { type: String, hidden: true },
		count: { type: Number }
	},
	connector: 'appc.acs'	// a model level connector
/*
	metadata: {
		'appc.acs': {
			object: 'Users'
		}
	}
*/
});

var Fruit = APIBuilder.Model.extend('fruit', {
	fields: {
		name: { type: String },
		color: { type: String }
	},
	connector: 'appc.acs'	// a model level connector
/*
	metadata: {
		'appc.acs': {
			object: 'Users'
		}
	}
*/
});

// add an authorization policy for all requests at the server log
server.authorization = APIKeyAuthorization;

// create a user api from a user model
server.addModel(User);
server.addModel(Fruit);

// HACK
APIBuilder.getConnector('appc.acs');

// start the server
server.start(function (err) {
	if (err) {
		server.logger.error(err);
	} else {
		server.logger.info('server started on port', server.port);
	}

	async.series([
		function (next) {
			Fruit.findAll(function(err, result) {
				console.log('findAll() results:');
				console.log(arguments);
				console.log('\n');
				next();
			});
		},

		function (next) {
			Fruit.create({
				name: 'apple',
				color: 'red'
			}, function (err, result) {
				console.log('create() results:');
				console.log(arguments);
				console.log('\n');
				next();
			});
		},

		function (next) {
			Fruit.findAll(function(err, result) {
				console.log('findAll() results:');
				console.log(arguments);
				console.log('\n');
				next();
			});
		}
	]);

/*
	User.findAll(function(err, result) {
		console.log('findAll() results:');
		console.log(arguments);
	});

	User.findOne('548a21e1d3a37bd24a03e4d4', function(err, result) {
		console.log('good findOne() results:');
		console.log(arguments);
	});

	User.findOne('foo', function(err, result) {
		console.log('bad findOne() results:');
		console.log(arguments);
	});
*/
});
