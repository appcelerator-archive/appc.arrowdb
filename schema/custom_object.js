'use strict';

var Arrow = require('arrow');

module.exports = {
	name: 'customObject',
	objectName: 'CustomObjects',

	/**
	 * Remove _syncModelsCanUpdateThis property or set it to false if you want to prevent syncModels.js from changing this file.
	 */
	_syncModelsCanUpdateThis: false,

	/**
	 * indicate that the model was generated
	 */
	generated: true,

	/**
	 * if this model is visible
	 */
	visible: false,

	fields: {
		classname: {type: String},
		created_at: {type: Date},
		fields: {type: Object},
		updated_at: {type: Date}
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

	instance: function instance(values, skipNotFound, params) {
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

		values.classname || (values.classname = params.classname);

		return new Arrow.Instance(this, values, skipNotFound);
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
};