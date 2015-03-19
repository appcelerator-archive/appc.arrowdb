'use strict';

var Arrow = require("arrow");

/*
 The PushLogDetails model.
 */
module.exports = Arrow.Model.extend("appc.arrowdb/push_log_detail", {
	/**
	 * Remove _syncModelsCanUpdateThis property or set it to false if you want to prevent syncModels.js from changing this file.
	 */
	_syncModelsCanUpdateThis: true,

	/**
	 * indicate that the model was generated
	 */
	generated: true,

	/**
	 * if this model is visible
	 */
	visible: false,

	/*
	 Fields for this model.
	 */
	fields: {
		"android_types": {
			// "originalType": "Array",
			"type": Array,
			"description": "List of Android push notification object types, and the number of notifications delivered using each type. Possible key names are the following:    * GCM: Google Cloud Messaging service for Android   * MQTT:  MQ Telemetry Transport "
		},
		"app_id": {
			// "originalType": "String",
			"type": String,
			"description": "Application ID."
		},
		"channel": {
			// "originalType": "String",
			"type": String,
			"description": "Name of the channel to which the notification was delivered."
		},
		"created_at": {
			// "originalType": "Date",
			"type": Date,
			"description": "Timestamp when the log item was created."
		},
		"device_count": {
			// "originalType": "Number",
			"type": Number,
			"description": "The total number of devices to which the notification was delivered."
		},
		"error_message": {
			// "originalType": "String",
			"type": String,
			"description": "The error, if any, associated with the push notification. For a list of possible errors, see [Push Notification Error Message](#!/guide/troubleshooting-section-push-notification-error-messages). "
		},
		"locked_at": {
			// "originalType": "Date",
			"type": Date,
			"description": "Timestamp when the log item was locked."
		},
		"pem_sent_at": {
			// "originalType": "Date",
			"type": Date,
			"description": "Timestamp when log item was inserted by Platform event system."
		},
		"push_id": {
			// "originalType": "String",
			"type": String,
			"description": "ID of push notification log item that was queried."
		},
		"send_status": {
			// "originalType": "Number",
			"type": Number,
			"description": "A number that indicates the notification's status, and can be one of the following values:   * 0 - Sending  * 1 - Success  * 2 - Fail  * 3 - Over Due "
		},
		"types": {
			// "originalType": "Array",
			"type": Array,
			"description": "A single-element Array containing an object with possible field names \"android\" and \"ios\". The value of each field indicates the number of Android and iOS devices, respectively, to which the push notification was delivered. "
		},
		"updated_at": {
			// "originalType": "Date",
			"type": Date,
			"description": "Timestamp when log item was updated."
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
				defaultValue.push_log_detail_id = instance.getPrimaryKey();
				return defaultValue;
			case 'delete':
				return {
					push_log_detail_id: instance.getPrimaryKey()
				};
		}
		return defaultValue;
	},

	actions: []
});
