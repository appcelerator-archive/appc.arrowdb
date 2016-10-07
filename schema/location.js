'use strict';

var Arrow = require('arrow');

/*
 The Chats model.
 */
module.exports = {
	name: 'location',
	objectName: 'locations',

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
		"city": {
			// "originalType": "String",
			"type": String,
			"description": "The city of the client's location."
		},
		"country_code": {
			// "originalType": "String",
			"type": String,
			"description": "The country of the client's location."
		},
		"latitude": {
			// "originalType": "Number",
			"type": Number,
			"description": "The client's latitude by geolocation."
		},
		"longitude": {
			// "originalType": "Number",
			"type": Number,
			"description": "The client's longitude by geolocation."
		},
		"state": {
			// "originalType": "String",
			"type": String,
			"description": "The state of the client's location."
		}
	}
};
