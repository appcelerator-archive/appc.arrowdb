'use strict';

var Arrow = require("arrow");

/*
 The PushPayload model.
 */
module.exports = Arrow.Model.extend("appc.arrowdb/push_payload", {
	/**
	 * Remove generated: true or set it to false if you want to prevent syncModels.js from changing this file.
	 */
	generated: true,
	/*
	 Fields for this model.
	 */
	fields: {
		"alert": {
			// "originalType": "String",
			"type": String,
			"description": "Notification message to be displayed."
		},
		"badge": {
			// "originalType": "String",
			"type": String,
			"description": "Number to set as the badge on the application's icon.\nSpecify positive and negative numbers with the `+` and `-`\nsymbols to increment or decrement the current badge number, respectively.\n"
		},
		"category": {
			// "originalType": "String",
			"type": String,
			"description": "String identifier of the user notification category to associate with the notification.\n**iOS only.**\n\nFor Titanium applications, this is the same value as the\n[identifer](http://docs.appcelerator.com/titanium/latest/#!/api/Titanium.App.iOS.UserNotificationCategory-property-identifier)\nproperty of the `UserNotificationCategory` object.\n"
		},
		"content-available": {
			// "originalType": "Number",
			"type": Number,
			"description": "Set to `1` to indicate that there is new content to download for Newsstand apps and background download content.\n**iOS only.**\n\nUsed to trigger the\n[`silentpush`](http://docs.appcelerator.com/titanium/latest/#!/api/Titanium.App.iOS-event-silentpush)\nevent in Titanium applications. Set the `alert` field to an empty string to make the\nnotification silent.\n"
		},
		"icon": {
			// "originalType": "String",
			"type": String,
			"description": "Filename minus the extension of the icon to display in the notification center.\n**Android only.**\n\nPlace the file in `/res/drawable` for native Android applications or `/Resources` for Titanium applications.\nUses the app's icon by default.\n"
		},
		"sound": {
			// "originalType": "String",
			"type": String,
			"description": "Filename minus the extension of the sound to play.\n\n  * For native Android applications, place the file in the `/assets/sound` directory.\n  * For native iOS applications, place the file in the main bundle.\n  * For Android applications built with Titanium, place the file in the `/Resources/sound` directory.\n  * For iOS applications built with Titanium, place the file in the `/Resources` directory.\n"
		},
		"title": {
			// "originalType": "String",
			"type": String,
			"description": "Title of the notification. **Android only.**"
		},
		"vibrate": {
			// "originalType": "String",
			"type": String,
			"description": "If true, the device vibrates for one second. **Android only.**"
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
				defaultValue.push_payload_id = instance.getPrimaryKey();
				return defaultValue;
			case 'delete':
				return {
					push_payload_id: instance.getPrimaryKey()
				};
		}
		return defaultValue;
	},

	actions: []
});
