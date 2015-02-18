'use strict';

var Arrow = require("arrow");

/*
 The Friends model.
 */
module.exports = Arrow.Model.extend("appc.arrowdb/friend", {
	/**
	 * Remove generated property or set it to false if you want to prevent syncModels.js from changing this file.
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
		"add": {
			"summary": "Add Friends",
			"description": "Add friends to the current user. By default the friend request is two-way\n(like Facebook), so after a friend request is made and approved both users\nwill show up in each others' friend lists. This default can be changed to one-\nway following (like Twitter) in the App Settings for each of your apps.\n\nTwo-way or one-way friend requests must be approved by the recipient unless\n`approval_required=false` is also sent with the request. This allows the user\nto add any user as a friend without requiring approval.\n",
			"authRequired": true,
			"instance": true,
			"adminRequired": false,
			"response": {
				"singleElement": true
			},
			"parameters": [
				{
					"name": "user_ids",
					"description": "Comma-separated list consisting of IDs of one or more users to add as\nfriends to the current user. A user cannot add himself or herself as a friend.\n",
					"type": "String",
					"required": true
				},
				{
					"name": "approval_required",
					"description": "Indicates whether the friend request requires\napproval by the other users.\n\nDefault: `true`\n",
					"type": "Boolean"
				},
				{
					"name": "pretty_json",
					"description": "Determines if the JSON response is formatted for readability (`true`), or displayed on a\nsingle line (`false`). Default is `false`.\n",
					"type": "Boolean"
				}
			]
		},
		"query": {
			"summary": "Custom Query of Friends",
			"description": "Performs custom query of Friends objects with sorting and paginating of the current\nlogged-in user or the specified user.  Only an application admin can perform a query against\na specified user using the `user_id` field.\n\nIf one-way friendship is enabled, the query returns the users being followed.  To return\nthe user's followers, set the `followers` field to true.\n\nYou can query or sort based on the data in any of the standard Friend fields.\nYou can also query and sort data based on the values of any custom fields,\nif the values are simple JSON values.\n\nCurrently you **cannot** sort or query based on data stored inside array or hash\nobjects in custom fields.\n\nFor details about using the query parameters,\nsee the [Search and Query guide](#!/guide/search_query).\n",
			"authRequired": true,
			"instance": true,
			"adminRequired": false,
			"parameters": [
				{
					"name": "user_id",
					"description": "Only an application admin can use this field.\nID of the user to search for friends. If friendship is set to one way, by default it\nsearches against users that the identified user is following. You can pass\n`followers=true` to search the user's followers.\n",
					"type": "String"
				},
				{
					"name": "followers",
					"description": "If set to true and one-way friendship is enabled, returns the user's followers instead\nof the users being followed.\n",
					"type": "Boolean"
				},
				{
					"name": "page",
					"description": "\nStarting in ACS 1.1.5, page and per_page are no longer supported in query operations. \nApplications should instead use skip and limit \nquery parameters.\n",
					"type": "Number"
				},
				{
					"name": "per_page",
					"description": "\nStarting in ACS 1.1.5, page and per_page are no longer supported in query operations. \nApplications should instead use skip and limit \nquery parameters.\n",
					"type": "Number"
				},
				{
					"name": "limit",
					"description": "The number of records to fetch. The value must be greater than 0, and no greater than \n1000, or an HTTP 400 (Bad Request) error will be returned. Default value of `limit` is 10.\n",
					"type": "Number"
				},
				{
					"name": "skip",
					"description": "The number of records to skip. The value must be greater than or equal to 0, and no greater \nthan 4999, or an HTTP 400 error will be returned. To skip 5000 records or more \nyou need to perform a range-based query. See \nQuery Pagination for more information.\n",
					"type": "Number"
				},
				{
					"name": "where",
					"description": "Constraint values for fields. `where` should be encoded JSON.\n\nIf `where` is not specified, `query` returns all objects.\n",
					"type": "Hash"
				},
				{
					"name": "order",
					"description": "Sort results by one or more fields.\n",
					"type": "String"
				},
				{
					"name": "sel",
					"description": "Selects the object fields to display. Do not use this parameter with `unsel`.\n",
					"type": "Hash"
				},
				{
					"name": "unsel",
					"description": "Selects the object fields NOT to display. Do not use this parameter with `sel`.\n",
					"type": "Hash"
				},
				{
					"name": "response_json_depth",
					"description": "Nested object depth level counts in response json.\nIn order to reduce server API calls from an application, the response json may\ninclude not just the objects that are being queried/searched, but also with\nsome important data related to the returning objects such as object's owner or\nreferencing objects.\n\nDefault is 1, valid range is 1 to 8.\n",
					"type": "Number"
				},
				{
					"name": "pretty_json",
					"description": "Determines if the JSON response is formatted for readability (`true`), or displayed on a\nsingle line (`false`). Default is `false`.\n",
					"type": "Boolean"
				}
			]
		},
		"requests": {
			"summary": "Show Friend Requests",
			"description": "View pending friend requests.\n",
			"authRequired": true,
			"instance": true,
			"adminRequired": false,
			"response": {
				"singleElement": true
			},
			"parameters": [
				{
					"name": "requests_to",
					"description": "If set to true, returns the users requesting the current user as a friend\nrather than the pending friend requests that the user needs to approve.\n",
					"type": "Boolean"
				},
				{
					"name": "response_json_depth",
					"description": "Nested object depth level counts in response JSON.\n\nIn order to reduce server API calls from an application, the response JSON may\ninclude not just the objects that are being referred to, but also\nsome important data related to the returned objects such as object's owner or\nreferenced objects.\n\nDefault is 1, valid range is 1 to 8.\n",
					"type": "Number"
				},
				{
					"name": "pretty_json",
					"description": "Determines if the JSON response is formatted for readability (`true`), or displayed on a\nsingle line (`false`). Default is `false`.\n",
					"type": "Boolean"
				}
			]
		},
		"search": {
			"summary": "Search Friends",
			"description": "Performs a search for users who are friends of the currently logged-in user. An application admin\ncan search for friends of an arbitrary user by specifing the the `user_id` field.\n\nSpecifying the optional `q` parameter allows searching by first name, last name, email address,\nor username. If no `q` parameter is specified, all friends of the specified user are returned.\n\nIf one-way friendship is enabled, the search returns the users being followed. To return\nthe user's followers, set the `followers` field to true.        \n",
			"authRequired": true,
			"instance": true,
			"adminRequired": false,
			"parameters": [
				{
					"name": "user_id",
					"description": "ID of the user to search for friends. **You must be an application admin to use this field.**\n\nIf friendship is set to one way,\nby default it searches against users that the identified user is **following**. You can\npass `followers=true` to search the user's followers.\n",
					"type": "String"
				},
				{
					"name": "followers",
					"description": "If you have friends set to one way, pass `followers=true` to query user's\nfollowers.\n",
					"type": "Boolean"
				},
				{
					"name": "q",
					"description": "Space-separated list of keywords used to perform full text search on first name, last name,\nemail address, username and tags.\n",
					"type": "String"
				},
				{
					"name": "page",
					"description": "Request page number, default is 1.",
					"type": "Number"
				},
				{
					"name": "per_page",
					"description": "Number of results per page, default is 10.",
					"type": "Number"
				},
				{
					"name": "response_json_depth",
					"description": "Nested object depth level counts in response json.\nIn order to reduce server API calls from an application, the response json may\ninclude not just the objects that are being queried/searched, but also with\nsome important data related to the returning objects such as object's owner or\nreferencing objects.\n\nDefault is 1, valid range is 1 to 8.\n",
					"type": "Number"
				},
				{
					"name": "pretty_json",
					"description": "Determines if the JSON response is formatted for readability (`true`), or displayed on a\nsingle line (`false`). Default is `false`.\n",
					"type": "Boolean"
				}
			]
		},
		"remove": {
			"summary": "Remove Friends",
			"description": "Removes one or more friends from the user's friends list.\n",
			"authRequired": true,
			"instance": true,
			"adminRequired": false,
			"response": {
				"singleElement": true
			},
			"parameters": [
				{
					"name": "user_ids",
					"description": "Comma-separated list consisting of IDs of one or more users to remove from the current user.\n",
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
		"approve": {
			"summary": "Approve Friend Requests",
			"description": "Approve an existing friend request. Each user will be added to the other's\nfriend list.\n",
			"authRequired": true,
			"instance": true,
			"adminRequired": false,
			"response": {
				"singleElement": true
			},
			"parameters": [
				{
					"name": "user_ids",
					"description": "Comma-separated list consisting of IDs of one or more users to approve as\nfriends to the current user.\n",
					"type": "String",
					"required": true
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
				defaultValue.friend_id = instance.getPrimaryKey();
				return defaultValue;
			case 'delete':
				return {
					friend_id: instance.getPrimaryKey()
				};
		}
		return defaultValue;
	},

	actions: ["read","delete"]
});
