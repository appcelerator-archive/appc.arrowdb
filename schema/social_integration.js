'use strict';

/*
 The SocialIntegrations model.
 */
module.exports = {
	name: 'socialIntegration',
	objectName: 'SocialIntegrations',

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
	fields: {},
	/*
	 Methods for this model.
	 */
	methodMeta: {
		"externalAccountUnlink": {
			"summary": "Unlink an external account",
			"description": "Disassociate an external account from a Appcelerator Cloud Services user account. ",
			"authRequired": true,
			"instance": true,
			"adminRequired": false,
			"response": {
				"singleElement": true
			},
			"parameters": [
				{
					"name": "id",
					"description": "External account's user ID.\n",
					"type": "String",
					"required": true
				},
				{
					"name": "type",
					"description": "Type of the external account, for example, \"facebook\", \"linkedin\", or\n\"twitter\".\n",
					"type": "String",
					"required": true
				},
				{
					"name": "pretty_json",
					"description": "Determines if the JSON response is formatted for readability (`true`), or displayed on a\nsingle line (`false`). Default is `false`.\n",
					"type": "Boolean"
				}
			]
		},
		"facebookSearchFriends": {
			"summary": "Find Facebook Friends",
			"description": "Find the current user's Facebook Friends who also registered in the same App. ",
			"authRequired": true,
			"instance": true,
			"adminRequired": false,
			"response": {
				"singleElement": true
			},
			"parameters": [
				{
					"name": "pretty_json",
					"description": "Determines if the JSON response is formatted for readability (`true`), or displayed on a\nsingle line (`false`). Default is `false`.\n",
					"type": "Boolean"
				}
			]
		},
		"externalAccountLink": {
			"summary": "Link an external Account",
			"description": "Associates an external account with an existing Appcelerator Cloud Services user account. Registered and logged in Appcelerator Cloud Services users can link one or more external accounts to their existing account. Once linked, the user can login using either Appcelerator Cloud Services account or any of the linked external accounts. ",
			"authRequired": true,
			"instance": true,
			"adminRequired": false,
			"response": {
				"singleElement": true
			},
			"parameters": [
				{
					"name": "id",
					"description": "External account's user ID. Optional for Facebook; if ID is missing and `type`\nis `facebook`, Appcelerator Cloud Services uses the Facebook token to obtain\nthe user ID.\n",
					"type": "String",
					"required": true
				},
				{
					"name": "type",
					"description": "Type of the external account, for example, \"facebook\", \"linkedin\", or\n\"twitter\".\n",
					"type": "String",
					"required": true
				},
				{
					"name": "token",
					"description": "Token provided by the external account. Currently only Facebook tokens are\nvalidated  by the Appcelerator Cloud Services server.\n",
					"type": "String",
					"required": true
				},
				{
					"name": "pretty_json",
					"description": "Determines if the JSON response is formatted for readability (`true`), or displayed on a\nsingle line (`false`). Default is `false`.\n",
					"type": "Boolean"
				}
			]
		},
		"externalAccountLogin": {
			"summary": "Login with external account",
			"description": "Users can login using an external account such as Facebook, Twitter, Linkedin, etc without creating an account with Appcelerator Cloud Services ahead of time. The external account login creates a Appcelerator Cloud Services account if it hasn't been created, otherwise, it will login using the user who has the matching external account info. ",
			"authRequired": false,
			"instance": true,
			"adminRequired": false,
			"response": {
				"singleElement": true
			},
			"parameters": [
				{
					"name": "id",
					"description": "External account's user ID. Optional for Facebook; if ID is missing and `type`\nis `facebook`, Appcelerator Cloud Services uses the Facebook token to obtain\nthe user ID.\n",
					"type": "String",
					"required": true
				},
				{
					"name": "type",
					"description": "Type of the external account, for example, \"facebook\", \"linkedin\", or\n\"twitter\".\n",
					"type": "String",
					"required": true
				},
				{
					"name": "token",
					"description": "Token provided by the external account. Currently only Facebook tokens are\nvalidated  by the Appcelerator Cloud Services server.\n",
					"type": "String",
					"required": true
				},
				{
					"name": "acl_name",
					"description": "Name of an ACLs to associate with this object.\n\nAn ACL can be specified using `acl_name` or `acl_id`. The two parameters are\nmutually exclusive.\n",
					"type": "String"
				},
				{
					"name": "acl_id",
					"description": "ID of an ACLs to associate with this object.\n\nAn ACL can be specified using `acl_name` or `acl_id`. The two parameters are\nmutually exclusive.\n",
					"type": "String"
				},
				{
					"name": "pretty_json",
					"description": "Determines if the JSON response is formatted for readability (`true`), or displayed on a\nsingle line (`false`). Default is `false`.\n",
					"type": "Boolean"
				}
			]
		}
	},

	_prepareParams: function prepareParams(method, instance, params, defaultValue) {
		params || (params = {});
		switch (method) {
			case 'update':
				defaultValue.social_integration_id = instance.getPrimaryKey();
				return defaultValue;
			case 'delete':
				return {
					social_integration_id: instance.getPrimaryKey()
				};
		}
		return defaultValue;
	},

	actions: []
};
