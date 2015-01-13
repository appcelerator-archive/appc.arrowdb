'use strict';

var APIBuilder = require('apibuilder');

module.exports = APIBuilder.Model.extend('acl', {
	fields: {
		created_at: { type: Date },
		name: { type: String },
		pretty_json: { type: Boolean },
		reader_ids: { type: Array },
		writer_ids: { type: Array },
		public_read: { type: Boolean },
		public_write: { type: Boolean },
		readers: { type: Array },
		writers: { type: Array },
		updated_at: { type: Date },
		user: { type: Object },
		user_id: { type: String }
	},

	methodMeta: {
		'add': {
			authRequired: true,
			instance: true
		},
		'addUser': {
			canonical: 'add'
		},
		'check': {
			authRequired: true,
			instance: true,
			response: {
				name: 'permission',
				model: 'acl_permission'
			}
		},
		'checkUser': {
			canonical: 'check'
		},
		'create': {
			authRequired: true,
			response: {
				singleElement: true
			}
		},
		'delete': {
			authRequired: true,
			instance: true
		},
		'remove': {
			apiMethodName: 'aclsRemoveUser',
			authRequired: true,
			instance: true,
			overwrite: true
		},
		'removeUser': {
			canonical: 'remove'
		},
		'show': {
			instance: true,
			response: {
				singleElement: true
			}
		},
		'update': {
			authRequired: true,
			instance: true
		}
	},

	_prepareParams: function (method, instance, params, defaultValue) {
		params || (params = {});

		switch (method) {
			case 'add':
			case 'remove':
				var p = {
					id: instance.getPrimaryKey()
				};
				if (params.reader_ids) {
					p.reader_ids = Array.isArray(params.reader_ids) ? params.reader_ids.join(',') : (params.reader_ids || '');
				}
				if (params.writer_ids) {
					p.writer_ids = Array.isArray(params.writer_ids) ? params.writer_ids.join(',') : (params.writer_ids || '');
				}
				return p;

			case 'check':
				if (typeof params === 'string') {
					return {
						id: instance.getPrimaryKey(),
						user_id: params
					};
				}
				break;

			case 'delete':
			case 'show':
				return {
					id: instance.getPrimaryKey()
				};
		}

		return defaultValue;
	}
});
