'use strict';

var Arrow = require("arrow");

/*
 The PushLogDetails model.
 */
module.exports = Arrow.Model.extend("appc.arrowdb/push_log_detail", {
	/**
	 * Remove generated: true or set it to false if you want to prevent syncModels.js from changing this file.
	 */
	generated: true,
	/*
	 Fields for this model.
	 */
	fields: {
		"android_types": {
			// "originalType": "Array",
			"type": Array,
			"description": "List of Android push notification object types, and the number of notifications\ndelivered using each type. Possible key names are the following:\n\n  * GCM: Google Cloud Messaging service for Android\n  * MQTT:  MQ Telemetry Transport\n"
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
			"description": "The error, if any, associated with the push notification. For a list of possible errors,\nsee [Push Notification Error Message](#!/guide/troubleshooting-section-push-notification-error-messages).\n"
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
			"description": "A number that indicates the notification's status, and can be one of the\nfollowing values:\n\n * 0 - Sending\n * 1 - Success\n * 2 - Fail\n * 3 - Over Due\n"
		},
		"types": {
			// "originalType": "Array",
			"type": Array,
			"description": "A single-element Array containing an object with possible field names \"android\"\nand \"ios\". The value of each field indicates the number of Android and iOS devices, respectively,\nto which the push notification was delivered.\n"
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
	}
});
