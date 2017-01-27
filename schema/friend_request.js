'use strict';

var Arrow = require('arrow');

/*
 The Chats model.
 */
module.exports = {
	name: 'friendRequest',
	objectName: 'FriendRequests',

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
		"user": {
			// "originalType": "User",
			"type": Object,
			"description": "User object for the user making the request."
		}
	}
};
