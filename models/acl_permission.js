'use strict';

var APIBuilder = require('apibuilder');

module.exports = APIBuilder.Model.extend('acl_permission', {
	fields: {
		read_permission: { type: Boolean },
		write_permission: { type: Boolean }
	}
});
