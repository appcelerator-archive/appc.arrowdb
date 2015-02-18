'use strict';

var Arrow = require("arrow");

/*
 The PushSchedulePayload model.
 */
module.exports = Arrow.Model.extend("appc.arrowdb/push_schedule_payload", {
	/**
	 * Remove generated: true or set it to false if you want to prevent syncModels.js from changing this file.
	 */
	generated: true,
	/*
	 Fields for this model.
	 */
	fields: {
		"start_time": {
			// "originalType": "Date",
			"type": Date,
			"description": "Datetime to start the push notifications in ISO 8601 format"
		},
		"name": {
			// "originalType": "String",
			"type": String,
			"description": "Arbitray name to give to the scheduled push notification."
		},
		"push_notification": {
			// "originalType": "Hash",
			"type": Object,
			"description": "Push notification to send.\n\n  * *channel* (String): Name of the channel to send the push notification to.\n    The name of the push channel cannot start with a hash symbol ('#').\n  * *payload* (PushPayload): Payload to send to the device. (**required**).\n  * *to_ids* (Array/String): Array or comma-separated list of IDs to send push notifications to.\n  * *options* (Hash): Dictionary to specify additional options:\n\n      * *expire_after_seconds* (Number): Expiration time in seconds of when to stop\n        sending the push notification based on the start date. For example, if the push\n        notification is scheduled to be sent in a week and the expiration time is for a\n        day.  The push expires in eight days and will not be sent if the user's device\n        has been off before the send day and after the end of the expiration period.\n \n"
		},
		"recurrence": {
			// "originalType": "Hash",
			"type": Object,
			"description": "Schedules the recurrence of the push notification.\n\n  * *interval* (String): Set to either `daily`, `weekly` or `monthly`.\n  * *end_time* (Date): Datetime to end the push notifications in ISO 8601 format.\n    Must occur after *start_time*.\n"
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
				defaultValue.push_schedule_payload_id = instance.getPrimaryKey();
				return defaultValue;
			case 'delete':
				return {
					push_schedule_payload_id: instance.getPrimaryKey()
				};
		}
		return defaultValue;
	},

	actions: []
});
