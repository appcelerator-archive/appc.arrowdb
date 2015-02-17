/**
 * NOTE: This file is simply for testing this connector and will not
 * be used or packaged with the actual connector when published.
 */

var Arrow = require('arrow'),
	server = new Arrow({ignoreDuplicateModels:true});

// lifecycle examples
server.on('starting', function() {
	server.logger.info('server is starting!');
});

server.on('started', function() {
	server.logger.info('server started!');
});

// start the server
server.start(function () {
	var connector = server.getConnector('appc.arrowdb');
	var UserModel = connector.getModel('user');

	UserModel.find({
		where: {
			username: 'funtester'
		}
	}, function (err, users) {
		console.log(users.toJSON());
	});
});
