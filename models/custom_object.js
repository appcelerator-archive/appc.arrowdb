'use strict';

var APIBuilder = require('apibuilder');

module.exports = APIBuilder.Model.extend('customObject', {
	fields: {
		classname: { type: String },
		created_at: { type: Date },
		fields: { type: Object },
		updated_at: { type: Date }
	},

	methodMeta: {
		'adminDropCollection': {
			authRequired: true
		},
		'batchDelete': {
			alias: 'deleteAll',
			authRequired: true
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
			canonical: 'delete'
		},
		'show': {
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

	instance: function instance(values, skipNotFound) {
		if (values.cname) {
			values.classname = values.cname;
			delete values.cname;
		}

		Object.keys(values).forEach(function (key) {
			if (key !== 'id' && key !== 'user' && key !== 'classname' && !this.fields[key]) {
				values.fields || (values.fields = {});
				values.fields[key] = values[key];
				delete values[key];
			}
		}, this);

		return new APIBuilder.Instance(this, values, skipNotFound);
	},

	_getResponseModelName: function (methodInfo, params, results) {
		return params && params.classname;
	},

	_prepareParams: function (method, instance, params, defaultValue) {
		params || (params = {});

		switch (method) {
			case 'delete':
				return {
					classname: instance.classname,
					id: instance.getPrimaryKey()
				};
		}

		return defaultValue;
	}
});