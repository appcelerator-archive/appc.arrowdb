'use strict';

var Arrow = require('arrow');

/*
 The PushLogDetails model.
 */
module.exports = {
	name: 'pushLogDetails',
	objectName: 'PushLogDetails',

	/**
	 * Remove _syncModelsCanUpdateThis property or set it to false if you want to prevent syncModels.js from changing this file.
	 */
	_syncModelsCanUpdateThis: true,

	/**
	 * indicate that the model was generated
	 */
	generated: false,

	/**
	 * if this model is visible
	 */
	visible: false,

	/*
	 Fields for this model.
	 */
	fields: {
		"android_types": {
			// "originalType": "Hash[]",
			"type": Object,
			"description": "List of Android push notification object types, and the number of notifications delivered using each type. Possible key names are the following:\n\n * GCM: Google Cloud Messaging service for Android"
		},
		"app_id": {
			// "originalType": "String",
			"type": String,
			"description": "Application ID."
		},
		"created_at": {
			// "originalType": "Date",
			"type": Date,
			"description": ""
		},
		"updated_at": {
			// "originalType": "Date",
			"type": Date,
			"description": ""
		},
		"channel": {
			// "originalType": "String",
			"type": String,
			"description": "Name of the channel to which the push notification was delivered."
		},
		"device_count": {
			// "originalType": "Number",
			"type": Number,
			"description": "The total number of devices to which the notification was delivered."
		},
		"error_message": {
			// "originalType": "String",
			"type": String,
			"description": "The error, if any, associated with the push notification. For a list of possible errors, see [Push Notification Error Message](http://docs.appcelerator.com/arrowdb/latest/#!/guide/troubleshooting-section-push-notification-error-messages)."
		},
		"push_id": {
			// "originalType": "String",
			"type": String,
			"description": "ID of push notification log item that was queried."
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
		"send_status": {
			// "originalType": "Number",
			"type": Number,
			"description": "A number that indicates the notification's status, and can be one of the following values:\n\n * 0 - Sending\n * 1 - Success\n * 2 - Fail\n * 3 - Over Due"
		},
		"types": {
			// "originalType": "Hash[]",
			"type": Array,
			"description": "A single-element Array containing an object with possible field names \"android\" and \"ios\". The value of each field indicates the number of Android and iOS devices, respectively, to which the push notification was delivered."
		}
	}
};
