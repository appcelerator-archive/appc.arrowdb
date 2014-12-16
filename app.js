/**
 * NOTE: this file is simply for testing your Connector and
 * not used or packaged with the actual connector when published
 */

var APIBuilder = require('appcelerator').apibuilder,
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
		password_confirmation: { type: String, hidden: true }
	},
	connector: 'appc.acs'	// a model level connector
});

// add an authorization policy for all requests at the server log
server.authorization = APIKeyAuthorization;

// create a user api from a user model
server.addModel(User);

// HACK
APIBuilder.getConnector('appc.acs');

// start the server
server.start();
