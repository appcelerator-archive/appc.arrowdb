'use strict';

var Arrow = require("arrow");

/*
 The PushLogs model.
 */
module.exports = Arrow.Model.extend("appc.arrowdb/push_log", {
	/**
	 * Remove _generated property or set it to false if you want to prevent syncModels.js from changing this file.
	 */
	_generated: true,

	/**
	 * indicate that the model was generated
	 */
	generated: true,

	/**
	 * if this model is visible
	 */
	visible: true,

	/*
	 Fields for this model.
	 */
	fields: {
		"_id": {
			// "originalType": "String",
			"type": String,
			"description": "Log item ID."
		},
		"payload": {
			// "originalType": "String",
			"type": String,
			"description": "Notification payload."
		},
		"to_ids": {
			// "originalType": "Array",
			"type": Array,
			"description": "Array of User IDs that push notification was delivered to."
		},
		"channel": {
			// "originalType": "String",
			"type": String,
			"description": "Name of the channel to which the push notification was delivered."
		},
		"app_id": {
			// "originalType": "String",
			"type": String,
			"description": "Application ID."
		},
		"push_schedule_id": {
			// "originalType": "String",
			"type": String,
			"description": "ID of the PushSchedules used to create the push notification (only present if the push notification was created by a PushSchedule). "
		},
		"scheduled_at": {
			// "originalType": "Date",
			"type": Date,
			"description": "Date that push notification was scheduled (only present if the push notification was created by a schedule.) "
		},
		"created_at": {
			// "originalType": "Date",
			"type": Date,
			"description": "Date that push notification was created."
		},
		"updated_at": {
			// "originalType": "Date",
			"type": Date,
			"description": "Date that push notification was updated."
		},
		"custom_fields": {
			// "originalType": "",
			"type": Object,
			"description": "User defined fields."
		},
		"user_id": {
			// "originalType": "",
			"type": String,
			"description": "Specifies the owner of object."
		}
	},
	/*
	 Methods for this model.
	 */
	methodMeta: {
	},

	_prepareParams: function prepareParams(method, instance, params, defaultValue) {
		params || (params = {});
		switch (method) {
			case 'update':
				defaultValue.push_log_id = instance.getPrimaryKey();
				return defaultValue;
			case 'delete':
				return {
					push_log_id: instance.getPrimaryKey()
				};
		}
		return defaultValue;
	},

	actions: []
});
