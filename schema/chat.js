'use strict';

var Arrow = require('arrow');

/*
 The Chats model.
 */
module.exports = {
	name: 'chat',
	objectName: 'Chats',

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
		"to_ids": {
			// "originalType": "String",
			"type": String,
			"description": "Comma-separated list of user ID(s) to receive the message. The current user `ID` and `to_ids` together determine which chat group a message belongs to. The chat group is created if necessary. You must specify either a `to_ids` list or the `chat_group_id` for an existing chat group."
		},
		"chat_group_id": {
			// "originalType": "String",
			"type": String,
			"description": "Identifies an existing chat group by ID. If you already know the id of a chat group, you can use it to specify which chat group this message should go to. You must specify either a `to_ids` list or the `chat_group_id` for an existing chat group."
		},
		"chat_groups": {
			// "originalType": "Array",
			"type": Array,
			"description": "Identifies an existing chat group by ID. If you already know the id of a chat group, you can use it to specify which chat group this message should go to. You must specify either a `to_ids` list or the `chat_group_id` for an existing chat group."
		},
		"custom_fields": {
			// "originalType": "String/Hash",
			"type": Object,
			"description": "User defined fields. See [Custom Data Fields](http://docs.appcelerator.com/arrowdb/latest/#!/guide/customfields)."
		},
		"message": {
			// "originalType": "String",
			"type": String,
			"description": "Chat message."
		},
		"photos": {
			// "originalType": "Photo",
			"type": Array,
			"description": "New photo to attach to the chat message. When you use the photo parameter to attach a new photo, you can use the [custom resize and sync options](http://docs.appcelerator.com/arrowdb/latest/#!/guide/photosizes).\n"
		}
	},
	/*
	 Methods for this model.
	 */
	methodMeta: {
		"create": {
			"summary": "Create a Chat",
			"description": "Sends a chat message to another user or a group of users. Sending a message creates a new chat group if there is no existing chat group containing the current user and the designated recipients. To generate a push notification, include the channel and payload parameters. ",
			"authRequired": true,
			"instance": true,
			"adminRequired": false,
			"response": {
				"singleElement": true
			},
			"parameters": [
				{
					"name": "to_ids",
					"description": "Comma-separated list of user ID(s) to receive the message. The current user ID and to_ids together determine which chat group a message belongs to. The chat group is created if necessary.\n\nYou must specify either a to_ids list or the chat_group_id for an existing chat group.\n",
					"type": "String"
				},
				{
					"name": "chat_group_id",
					"description": "Identifies an existing chat group by ID. If you already know the id of a chat group, you can use it to specify which chat group this message should go to.\n\nYou must specify either a to_ids list or the chat_group_id for an existing chat group.\n",
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
					"description": "New photo to attach to the chat message.\n\nWhen you use the photo parameter to attach a new photo, you can use the [custom resize and sync options](http://docs.appcelerator.com/arrowdb/latest/#!/guide/photosizes).\n",
					"type": "Photos"
				},
				{
					"name": "photo_id",
					"description": "ID of an existing photo to attach to the chat message.\n",
					"type": "String"
				},
				{
					"name": "custom_fields",
					"description": "User defined fields. See [Custom Data Fields](http://docs.appcelerator.com/arrowdb/latest/#!/guide/customfields).\n",
					"type": [
						"String",
						"Hash"
					]
				},
				{
					"name": "channel",
					"description": "Channel for a push notification.\n\nTo send a push notification to the recipients after a new chat message is created, you can pass in the channel and payload parameters. For more information, see [PushNotifications.notify](http://docs.appcelerator.com/arrowdb/latest/#!/api/PushNotifications-method-notify).\n",
					"type": "String"
				},
				{
					"name": "payload",
					"description": "Message payload for push notification.\n\nThe message defined in payload will be delivered to all the recipients as long as they have [subscribed](http://docs.appcelerator.com/arrowdb/latest/#!/api/PushNotifications-method-subscribe) to the specified channel.\n\nFor example, if all of your app's users are subscribed to channel \"Chat\", then you can pass channel -- \"Chat\", and payload:\n\n{\"from\": \"sender user_id\",\"message\": \"Hello everyone!\",\"sound\": \"default\",\"alert\" : \"From Joe: Hello everyone!\"}\n",
					"type": [
						"String",
						"Hash"
					]
				},
				{
					"name": "su_id",
					"description": "Send on behalf of the identified user.\n\nCurrent user must be an application admin to send a message on behalf of another user.\n",
					"type": "String"
				},
				{
					"name": "response_json_depth",
					"description": "To receive a list of participant IDs, set response_json_depth to 2. If you have already cached all the user objects participating in the chat group and wish to receive a smaller JSON response, you can set response_json_depth to 1 to remove participant user's info from chat group in the JSON response.\n\nDefault is 1, valid range is 1 to 8.\n",
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
			"summary": "Delete a Chat",
			"description": "Deletes a chat message. ",
			"authRequired": true,
			"instance": true,
			"adminRequired": false,
			"parameters": [
				{
					"name": "chat_id",
					"description": "ID of the chat message to delete.\n",
					"type": "String",
					"required": true
				},
				{
					"name": "su_id",
					"description": "User to delete the Chat object on behalf of. The user must be the sender of the chat message.\nCurrent user must be an application admin to send a message on behalf of another user.\n",
					"type": "String"
				},
				{
					"name": "pretty_json",
					"description": "Determines if the JSON response is formatted for readability (`true`), or displayed on a\nsingle line (`false`). Default is `false`.\n",
					"type": "Boolean"
				}
			]
		},
		"getChatGroups": {
			"summary": "List Chat Groups",
			"description": "Lists chat groups. If user A sends chat message to user B and C, users A, B and C automatically form a chat group. Use this API to get a list of chat groups the current user belongs to. ",
			"authRequired": false,
			"instance": true,
			"adminRequired": false,	
			"response": {
				"model": "chatGroup",
				"name": "chat_groups"
			},
			"parameters": [
				{
					"name": "page",
					"description": "Request page number, default is 1.\n",
					"type": "Number"
				},
				{
					"name": "per_page",
					"description": "Number of results per page, default is 10.\n",
					"type": "Number"
				},
				{
					"name": "where",
					"description": "Constraint values for fields. where should be encoded JSON.\nIf where is not specified, query returns all objects. See the [Search and Query guide](http://docs.appcelerator.com/arrowdb/latest/#!/guide/search_query) for more information.\n",
					"type": "String"
				},
				{
					"name": "order",
					"description": "Sort results by one or more fields. See the [Search and Query guide](http://docs.appcelerator.com/arrowdb/latest/#!/guide/search_query) for more information.\n",
					"type": "String"
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
		"query": {
			"summary": "Performs a custom query of Chats",
			"description": "Performs a custom query of chat messages with sorting and pagination. Currently you can not query or sort data stored inside array or hash in custom fields. In ArrowDB 1.1.5 and later, you can paginate query results using skip and limit parameters, or by including a where clause to limit the results to objects whose IDs fall within a specified range. For details, see [Query Pagination](http://docs.appcelerator.com/arrowdb/latest/#!/guide/search_query-section-query-pagination). For details about using the query parameters, see the [Search and Query guide](http://docs.appcelerator.com/arrowdb/latest/#!/guide/search_query). ",
			"authRequired": false,
			"instance": true,
			"adminRequired": false,
			"parameters": [
				{
					"name": "participate_ids",
					"description": "Comma-separated list of user ID(s) of the users belonging to a chat group. You can use this field to narrow down a query to a certain chat group. The current user can only query chat messages in chat groups he or she is participating in.\nFor example, suppose that users A, B and C form one chat group, and users B and C form a second chat group without A. User A does not have permission to query chats in the chat group that consists of only users B and C.\nYou must specify either a participate_ids list or the chat_group_id of an existing chat group to query.\n",
					"type": "String"
				},
				{
					"name": "chat_group_id",
					"description": "A chat group's id. Instead of using a participate_ids list, if you already know the id of a chat group, you can use it to narrow down a query.\nYou must specify either a participate_ids list or the chat_group_id of an existing chat group to query.",
					"type": "String"
				},
				{
					"name": "page",
					"description": "Note: Starting in ArrowDB 1.1.5, page and per_page are no longer supported in query operations. Applications should instead use skip and limit query parameters.\n",
					"type": "Number"
				},
				{
					"name": "per_page",
					"description": "Note: The number of records to skip. The value must be greater than or equal to 0, and no greater \nthan 4999, or an HTTP 400 error will be returned. To skip 5000 records or more \nyou need to perform a range-based query. See \nQuery Pagination for more information.\n",
					"type": "Number"
				},
				{
					"name": "limit",
					"description": "The number of records to fetch. The value must be greater than 0, and no greater than 1000, or an HTTP 400 (Bad Request) error will be returned. Default value of limit is 10.\n",
					"type": "Number"
				},
				{
					"name": "skip",
					"description": "The number of records to skip. The value must be greater than or equal to 0, and no greater than 4999, or an HTTP 400 error will be returned. To skip 5000 records or more you need to perform a range-based query. See Query Pagination for more information.\n",
					"type": "Number"
				},
				{
					"name": "where",
					"description": "Constraint values for fields. where should be encoded JSON.\nYou can query any of the standard values for a Chat object, as well as any custom fields that contain simple values, such as String, Number or Boolean values.\nIf where is not specified, query returns all objects.\n",
					"type": "Hash"
				},
				{
					"name": "order",
					"description": "Sort results by one or more fields.\n",
					"type": "String"
				},
				{
					"name": "sel",
					"description": "Selects the object fields to display. Do not use this parameter with unsel.\n",
					"type": "Hash"
				},
				{
					"name": "unsel",
					"description": "Selects the object fields NOT to display. Do not use this parameter with sel.",
					"type": "Hash"
				},
				{
					"name": "response_json_depth",
					"description": "Nested object depth level counts in response json. In order to reduce server API calls from an application, the response json may include not just the objects that are being queried/searched, but also with some important data related to the returning objects such as object's owner or referencing objects.\n\nDefault is 1, valid range is 1 to 8.\n",
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
	},

	actions: ["create", "delete", "read"]
};
