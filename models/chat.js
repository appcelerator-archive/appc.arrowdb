'use strict';

var Arrow = require("arrow.js");

/*
 The Chats model.
 */
module.exports = Arrow.Model.extend("appc.arrowdb/chat", {
	/**
	 * Remove generated: true or set it to false if you want to prevent syncModels.js from changing this file.
	 */
	generated: true,
	/*
	 Fields for this model.
	 */
	fields: {
		"message": {
			// "originalType": "String",
			"type": String,
			"description": "Chat message."
		},
		"photo": {
			// "originalType": "Photos",
			"type": Array,
			"description": "New photo to attach to the chat message.\n"
		},
		"chatgroup": {
			// "originalType": "Hash",
			"type": Object,
			"description": "The chat group that the chat belongs to."
		},
		"custom_fields": {
			// "originalType": "String,Hash",
			"type": Object,
			"description": "User defined fields. See [Custom Data Fields](#!/guide/customfields)."
		},
		"created_at": {
			// "originalType": "Date",
			"type": Date,
			"description": "Creation date for this user object."
		},
		"updated_at": {
			// "originalType": "Date",
			"type": Date,
			"description": "Last update time for this user object."
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
		"getChatGroups": {
			"summary": "List Chat Groups",
			"description": "Lists chat groups.\n\nIf user A sends chat message to user B and C, users A, B and C automatically\nform a chat group. Use this API to get a list of chat groups the current user\nbelongs to.\n",
			"authRequired": true,
			"instance": true,
			"adminRequired": false,
			"response": {
				"singleElement": true
			},
			"parameters": [
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
					"name": "where",
					"description": "Constraint values for fields. `where` should be encoded JSON.\n\nIf `where` is not specified, `query` returns all objects.\nSee the [Search and Query guide](#!/guide/search_query) for more information.\n",
					"type": "String"
				},
				{
					"name": "order",
					"description": "Sort results by one or more fields.\nSee the [Search and Query guide](#!/guide/search_query) for more information.\n",
					"type": "String"
				},
				{
					"name": "response_json_depth",
					"description": "Nested object depth level counts in JSON response.\nTo reduce server API calls the JSON response may\ninclude, in addition to the objects returned by the query, other important data related \nto the returned objects, such as object's owner or referencing objects.\n\nDefault is 1, valid range is 1 to 8.\n",
					"type": "Number"
				},
				{
					"name": "pretty_json",
					"description": "Determines if the JSON response is formatted for readability (`true`), or displayed on a\nsingle line (`false`). Default is `false`.\n",
					"type": "Boolean"
				}
			]
		},
		"create": {
			"summary": "Create a Chat Message",
			"description": "Sends a chat message to another user or a group of users.\n\nSending a message creates a new chat group if there is no existing chat group\ncontaining the current user and the designated recipients.\n\nTo generate a push notification, include the `channel` and\n`payload` parameters.\n",
			"authRequired": true,
			"instance": true,
			"adminRequired": false,
			"response": {
				"singleElement": true
			},
			"parameters": [
				{
					"name": "to_ids",
					"description": "Comma-separated list of user ID(s) to receive the message. The current user ID and `to_ids`\ntogether determine which chat group a message belongs to. The chat group is\ncreated if necessary.\n\nYou must specify either a `to_ids` list or the `chat_group_id` for an existing\nchat group.\n",
					"type": "String"
				},
				{
					"name": "chat_group_id",
					"description": "Identifies an existing chat group by ID. If you already know the id\nof a chat group, you can use it to specify\nwhich chat group this message should go to.\n\nYou must specify either a `to_ids` list or the `chat_group_id` for an existing\nchat group.\n",
					"type": "String"
				},
				{
					"name": "message",
					"description": "Message to send.",
					"type": "String",
					"required": true
				},
				{
					"name": "photo",
					"description": "New photo to attach to the chat message.\n\nWhen you use the `photo` parameter to attach a new photo, you can use the\n[custom resize and sync options](#!/guide/photosizes).\n",
					"type": "Photos"
				},
				{
					"name": "photo_id",
					"description": "ID of an existing photo to attach to the chat message.\n",
					"type": "String"
				},
				{
					"name": "custom_fields",
					"description": "User defined fields. See [Custom Data Fields](#!/guide/customfields).",
					"type": [
						"String",
						"Hash"
					]
				},
				{
					"name": "channel",
					"description": "Channel for a push notification.\n\nTo send a push notification to the recipients after a new chat\nmessage is created, you can pass in the `channel` and `payload` parameters.\nFor more information, see PushNotifications#notify.\n",
					"type": "String"
				},
				{
					"name": "payload",
					"description": "Message payload for push notification.\n\n\nThe message defined in `payload` will be delivered to all the recipients as long\nas they have subscribed to the specified channel.\n\nFor example, if all of your app's users are subscribed to channel \"Chat\", then\nyou can pass channel -- \"Chat\", and payload:\n\n    {\n        \"from\": \"sender user_id\",\n        \"message\": \"Hello everyone!\",\n        \"sound\": \"default\",\n         \"alert\" : \"From Joe: Hello everyone!\"\n    }\n",
					"type": [
						"String",
						"Hash"
					]
				},
				{
					"name": "user_id",
					"description": "Send on behalf of the identified user.\n\nCurrent user must be an application admin to send a message on behalf of\nanother user.\n",
					"type": "String"
				},
				{
					"name": "response_json_depth",
					"description": "To receive a list of participant IDs, set `response_json_depth` to **2**.\nIf you have already cached all the user objects participating\nin the chat group and wish to receive a smaller JSON response, you can set\n`response_json_depth` to **1** to remove participant user's info from chat group in\nthe JSON response.\n\nDefault is 1, valid range is 1 to 8.\n",
					"type": "Number"
				},
				{
					"name": "pretty_json",
					"description": "Determines if the JSON response is formatted for readability (`true`), or displayed on a\nsingle line (`false`). Default is `false`.\n",
					"type": "Boolean"
				}
			]
		},
		"delete": {
			"summary": "Delete a Chat.",
			"description": "Deletes a chat message.\n",
			"authRequired": true,
			"instance": true,
			"adminRequired": false,
			"response": {
				"singleElement": true
			},
			"parameters": [
				{
					"name": "chat_id",
					"description": "ID of the chat message to delete.",
					"type": "String",
					"required": true
				},
				{
					"name": "user_id",
					"description": "User to delete the Chat object on behalf of. The user must be the sender of the chat\nmessage.\n\nCurrent user must be an application admin to send a message on behalf of another user.\n",
					"type": "String"
				},
				{
					"name": "pretty_json",
					"description": "Determines if the JSON response is formatted for readability (`true`), or displayed on a\nsingle line (`false`). Default is `false`.\n",
					"type": "Boolean"
				}
			]
		},
		"query": {
			"summary": "Custom Query Chat Messages",
			"description": "Performs a custom query of chat messages with sorting and pagination. Currently you can\nnot query or sort data stored inside array or hash in custom fields.\n\nIn ACS 1.1.5 and later, you can paginate query results using `skip` and `limit` parameters, or by including\na `where` clause to limit the results to objects whose IDs fall within a specified range.\nFor details, see [Query Pagination](#!/guide/search_query-section-query-pagination).        \n\nFor details about using the query parameters,\nsee the [Search and Query guide](#!/guide/search_query).\n",
			"authRequired": false,
			"instance": true,
			"adminRequired": false,
			"parameters": [
				{
					"name": "participate_ids",
					"description": "Comma-separated list of user ID(s) of the users belonging to a chat group. You can use\nthis field to narrow down a query to a certain chat group. The current user can\nonly query chat messages in chat groups he or she is participating in.\n\nFor example, suppose that users A, B and C form one chat group, and users B and C form a second chat group without A.\nUser A does not have permission to query chats in the chat group that consists of\nonly users B and C.\n\nYou must specify either a `participate_ids` list or the `chat_group_id` of an existing\nchat group to query.\n",
					"type": "String"
				},
				{
					"name": "chat_group_id",
					"description": "A chat group's id. Instead of using a `participate_ids` list, if you already\nknow the id of a chat group, you can use it to narrow down a query.\n\nYou must specify either a `participate_ids` list or the `chat_group_id` of an existing\nchat group to query.\n",
					"type": "String"
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
					"name": "pretty_json",
					"description": "Determines if the JSON response is formatted for readability (`true`), or displayed on a\nsingle line (`false`). Default is `false`.\n",
					"type": "Boolean"
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
					"description": "Constraint values for fields. `where` should be encoded JSON.\n\nYou can query any of the standard values for a Chat object, as well as any\ncustom fields that contain simple values, such as String, Number or Boolean\nvalues.\n\nIf `where` is not specified, `query` returns all objects.\n",
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
				}
			]
		},
		"queryChatGroups": {
			"summary": "Query Chat Groups",
			"description": "Queries chat groups.\n\nIf user A sends a chat message to users B and C, users A, B and C automatically\nform a chat group. Use this API to get a list of chat groups the current user\nbelongs to.\n\nIn ACS 1.1.5 and later, you can paginate query results using `skip` and `limit` parameters, or by including\na `where` clause to limit the results to objects whose IDs fall within a specified range.\nFor details, see [Query Pagination](#!/guide/search_query-section-query-pagination).        \n\nPrior to ACS 1.1.5 you can use `skip` and `limit` parameters, or `page` and `per_page` but \nnot both in the same query.        \n\nFor details about using the query parameters,\nsee the [Search and Query guide](#!/guide/search_query).\n",
			"authRequired": true,
			"instance": true,
			"adminRequired": true,
			"response": {
				"singleElement": true
			},
			"parameters": [
				{
					"name": "participate_ids",
					"description": "Only available for application admins.\n\nComma-separated list of user ID(s) of the users belonging to a chat group. You can use\nthis field to narrow down the query to a certain chat group. The current user can\nonly query chats that he or she is participating in.\n\nFor example, suppose that users A, B and C form one chat group, and users B and C form a second chat group without A.\nUser A does not have permission to query chats in the chat group that consists of\nonly users B and C.\n\nAlternatively, you can use `chat_group_id` to identify a chat group\ninstead.\n",
					"type": "String"
				},
				{
					"name": "page",
					"description": "Request page number, default is 1.\n\nThis parameter is only available to ACS applications created before ACS 1.1.5. \nApplications created with ACS 1.1.5 and later must use ranged-based queries queries\nto paginate their queries.\n",
					"type": "Number"
				},
				{
					"name": "per_page",
					"description": "Number of results per page, default is 10.\n\nThis parameter is only available to ACS applications created before ACS 1.1.5. \nApplications created with ACS 1.1.5 and later must use ranged-based queries queries\nto paginate their queries.\n",
					"type": "Number"
				},
				{
					"name": "pretty_json",
					"description": "Determines if the JSON response is formatted for readability (`true`), or displayed on a\nsingle line (`false`). Default is `false`.\n",
					"type": "Boolean"
				},
				{
					"name": "limit",
					"description": "The number of records to fetch. The value must be greater than 0, and no greater than \n1000, or an HTTP 400 (Bad Request) error will be returned.            \n",
					"type": "Number"
				},
				{
					"name": "skip",
					"description": "Number of records to skip. Must be used together with `limit`.\nThe specified value must not be less than 0 or an HTTP 400 error will be returned.            \n",
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
				}
			]
		},
		"remove": {
			"canonical": "delete"
		}
		
	},

	_prepareParams: function prepareParams(method, instance, params, defaultValue) {
		params || (params = {});
		switch (method) {
			case 'update':
				defaultValue.chat_id = instance.getPrimaryKey();
				return defaultValue;
			case 'delete':
				return {
					chat_id: instance.getPrimaryKey()
				};
		}
		return defaultValue;
	}
});
