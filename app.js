/**
 * NOTE: This file is simply for testing this connector and will not
 * be used or packaged with the actual connector when published.
 */
var APIBuilder = require('appcelerator').apibuilder,
	server = new APIBuilder();

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
	connector: 'appc.acs'
});
server.addModel(User);

server.start();