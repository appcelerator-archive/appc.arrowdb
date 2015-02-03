'use strict';

var Arrow = require('arrow');

module.exports = Arrow.Model.extend('appc.acs/user', {
	fields: {
		admin: { type: Boolean },
		created_at: { type: Date },
		custom_fields: { type: Object },
		email: { type: String },
		external_accounts: { type: Array },
		first_name: { type: String },
		friend_counts: { type: Object },
		last_name: { type: String },
		photo: { type: Object }, // should be a photo model
		role: { type: String },
		updated_at: { type: Date },
		username: { type: String },
		password: { type: String, hidden: true },
		password_confirmation: { type: String, hidden: true },
		confirmed_at: { type: Date, readonly: true },
		stats: { type: Object, readonly: true }
	},

	methodMeta: {
		'batchDelete': {
			authRequired: true
		},
		'create': {
			response: {
				singleElement: true
			}
		},
		'delete': {
			authRequired: true,
			instance: true
		},
		'deleteAll': {
			disabled: true
		},
		'login': {
			skip: true,
			instance: true,
			response: {
				singleElement: true
			}
		},
		'logout': {
			skip: true,
			instance: true
		},
		'remove': {
			canonical: 'delete'
		},
		'requestResetPassword': {
			instance: true
		},
		'resendConfirmation': {
			instance: true
		},
		'showMe': {
			authRequired: true,
			instance: true,
			response: {
				singleElement: true
			}
		},
		'update': {
			authRequired: true,
			instance: true,
			response: {
				singleElement: true
			}
		}
	},

	_prepareParams: function (method, instance, params, defaultValue) {
		params || (params = {});

		switch (method) {
			case 'login':
				return {
					login: instance.username,
					password: params.password
				};

			case 'update':
				defaultValue.user_id = instance.getPrimaryKey();
				return defaultValue;

			case 'delete':
				return {
					user_id: instance.getPrimaryKey()
				};
		}

		return defaultValue;
	}
});
