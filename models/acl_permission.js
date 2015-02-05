'use strict';

var Arrow = require('arrow.js');

module.exports = Arrow.Model.extend('appc.arrowdb/acl_permission', {
	fields: {
		read_permission: { type: Boolean },
		write_permission: { type: Boolean }
	}
});
