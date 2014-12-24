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
		id: 'com.appcelerator.api.unauthorized',
		message: 'Unauthorized',
		url: ''
	});
}

server.authorization = APIKeyAuthorization;

// start the server
server.start(function () {
	var connector = server.getConnector('appc.acs');
	var UserModel = connector.getModel('user');

	UserModel.find({
		where: {
			username: 'funtester'
		}
	}, function (err, users) {
		console.log(arguments);
	});
});
