'use strict';

var Arrow = require("arrow");

/*
 The PushPayload model.
 */
module.exports = Arrow.Model.extend("appc.arrowdb/push_payload", {
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
		"alert": {
			// "originalType": "String",
			"type": String,
			"description": "Notification message to be displayed."
		},
		"badge": {
			// "originalType": "String",
			"type": String,
			"description": "Number to set as the badge on the application's icon. Specify positive and negative numbers with the `+` and `-` symbols to increment or decrement the current badge number, respectively. "
		},
		"category": {
			// "originalType": "String",
			"type": String,
			"description": "String identifier of the user notification category to associate with the notification. **iOS only.**  For Titanium applications, this is the same value as the [identifer](http://docs.appcelerator.com/titanium/latest/#!/api/Titanium.App.iOS.UserNotificationCategory-property-identifier) property of the `UserNotificationCategory` object. "
		},
		"content-available": {
			// "originalType": "Number",
			"type": Number,
			"description": "Set to `1` to indicate that there is new content to download for Newsstand apps and background download content. **iOS only.**  Used to trigger the [`silentpush`](http://docs.appcelerator.com/titanium/latest/#!/api/Titanium.App.iOS-event-silentpush) event in Titanium applications. Set the `alert` field to an empty string to make the notification silent. "
		},
		"icon": {
			// "originalType": "String",
			"type": String,
			"description": "Filename minus the extension of the icon to display in the notification center. **Android only.**  Place the file in `/res/drawable` for native Android applications or `/Resources` for Titanium applications. Uses the app's icon by default. "
		},
		"sound": {
			// "originalType": "String",
			"type": String,
			"description": "Filename minus the extension of the sound to play.    * For native Android applications, place the file in the `/assets/sound` directory.   * For native iOS applications, place the file in the main bundle.   * For Android applications built with Titanium, place the file in the `/Resources/sound` directory.   * For iOS applications built with Titanium, place the file in the `/Resources` directory. "
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
