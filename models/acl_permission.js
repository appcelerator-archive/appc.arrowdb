'use strict';

var Arrow = require('arrow');

module.exports = Arrow.Model.extend('appc.acs/acl_permission', {
	fields: {
		read_permission: { type: Boolean },
		write_permission: { type: Boolean }
	}
});
