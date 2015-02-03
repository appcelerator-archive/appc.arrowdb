'use strict';

var Arrow = require("arrow");

/*
 The SocialIntegrations model.
 */
module.exports = Arrow.Model.extend("appc.acs/social_integration", {
	/**
	 * Remove generated: true or set it to false if you want to prevent syncModels.js from changing this file.
	 */
	generated: true,
	/*
	 Fields for this model.
	 */
	fields: {
	},
	/*
	 Methods for this model.
	 */
	methodMeta: {
		"facebookSearchFriends": {
			"summary": "Find Facebook Friends",
			"description": "Find the current user's Facebook Friends who also registered in the same App.\n",
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
			"description": "Associates an external account with an existing Appcelerator Cloud Services\nuser account. Registered and logged in Appcelerator Cloud Services users can\nlink one or more external accounts to their existing account. Once linked, the\nuser can login using either Appcelerator Cloud Services account or any of the\nlinked external accounts.\n",
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
		"externalAccountUnlink": {
			"summary": "Unlink an external account",
			"description": "Disassociate an external account from a Appcelerator Cloud Services user\naccount.\n",
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
		"externalAccountLogin": {
			"summary": "Login with external account",
			"description": "Users can login using an external account such as Facebook, Twitter,\nLinkedin, etc without creating an account with Appcelerator Cloud Services\nahead of time. The external account login creates a Appcelerator Cloud\nServices account if it hasn't been created, otherwise, it will login using the\nuser who has the matching external account info.\n",
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
	}
});
