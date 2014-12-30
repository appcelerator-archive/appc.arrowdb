'use strict';

var APIBuilder = require('apibuilder');

module.exports = APIBuilder.Model.extend('user', {
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

	prepareParams: function (method, instance, params) {
		params || (params = {});

		switch (method) {
			case 'login':
				return {
					login: instance.username,
					password: params.password
				};

			case 'delete':
				return {};
		}

		return instance.values(true);
	}
});
