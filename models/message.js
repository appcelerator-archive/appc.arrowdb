'use strict';

var Arrow = require("arrow");

/*
 The Messages model.
 */
module.exports = Arrow.Model.extend("appc.arrowdb/message", {
	/**
	 * Remove generated property or set it to false if you want to prevent syncModels.js from changing this file.
	 */
	generated: true,
	/*
	 Fields for this model.
	 */
	fields: {
		"thread_id": {
			// "originalType": "String",
			"type": String,
			"description": "Thread ID of the sent message."
		},
		"status": {
			// "originalType": "String",
			"type": String,
			"description": "Status of the message: in-box messages have status of `read`, `unread`, or\n`replied`.\n"
		},
		"subject": {
			// "originalType": "String",
			"type": String,
			"description": "Message subject."
		},
		"body": {
			// "originalType": "String",
			"type": String,
			"description": "Message body."
		},
		"created_at": {
			// "originalType": "Date",
			"type": Date,
			"description": "Message creation date."
		},
		"updated_at": {
			// "originalType": "Date",
			"type": Date,
			"description": "Message update date."
		},
		"to": {
			// "originalType": "Array",
			"type": Array,
			"description": "Message recipients."
		},
		"from": {
			// "originalType": "Users",
			"type": Array,
			"description": "Message sender."
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
		"deleteThread": {
			"summary": "",
			"description": "Delete all messages in a thread with the given `thread_id`. The thread must be\nin the current user's inbox or sent mail. There is currently no trash folder\nand deletion is permanent.\n",
			"authRequired": true,
			"instance": true,
			"adminRequired": false,
			"response": {
				"singleElement": true
			},
			"parameters": [
				{
					"name": "thread_id",
					"description": "Thread ID of the message thread to delete.",
					"type": "String",
					"required": true
				}
			]
		},
		"showInbox": {
			"summary": "",
			"description": "Shows messages in the current user's inbox. Messages in the inbox have the\nstatus of `unread`, `read`, or `replied`.\n",
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
				}
			]
		},
		"delete": {
			"summary": "",
			"description": "Delete the message with the given `id`. The message must be in the current\nuser's inbox or sent mail. There is currently no trash folder and deletion is\npermanent.\n\nApplication Admin can delete any Message object.\n",
			"authRequired": true,
			"instance": true,
			"adminRequired": false,
			"response": {
				"singleElement": true
			},
			"parameters": [
				{
					"name": "message_id",
					"description": "ID of the message to delete.",
					"type": "String",
					"required": true
				},
				{
					"name": "user_id",
					"description": "User to delete the Message object on behalf of. The user needs to be either the sender\nor recipient of the message.\n\nThe current user must be an application admin to delete a Message object on\nbehalf of another user.\n",
					"type": "String"
				}
			]
		},
		"showSent": {
			"summary": "",
			"description": "Shows messages in the current user's sent messages.",
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
				}
			]
		},
		"show": {
			"summary": "",
			"description": "Shows a message in the user's mailbox.",
			"authRequired": true,
			"instance": true,
			"adminRequired": false,
			"response": {
				"singleElement": true
			},
			"parameters": [
				{
					"name": "message_id",
					"description": "ID of the message.",
					"type": "String",
					"required": true
				}
			]
		},
		"query": {
			"summary": "Performs a custom query of Messages.",
			"description": "Performs a custom query of Messages. Currently you can not query or sort data stored inside \nan array or hash in custom fields.\n\nIn ACS 1.1.5 and later, you can paginate query results using `skip` and `limit` parameters, or by including\na `where` clause to limit the results to objects whose IDs fall within a specified range.\nFor details, see [Query Pagination](#!/guide/search_query-section-query-pagination).        \n\nFor details about using the query parameters,\nsee the [Search and Query guide](#!/guide/search_query).\n",
			"authRequired": false,
			"instance": true,
			"adminRequired": false,
			"parameters": [
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
					"name": "pretty_json",
					"description": "Determines if the JSON response is formatted for readability (`true`), or displayed on a\nsingle line (`false`). Default is `false`.\n",
					"type": "Boolean"
				},
				{
					"name": "where",
					"description": "Constraint values for fields. `where` should be encoded JSON.\n\nYou can query any of the standard values for an ACL object, as well as any\ncustom fields that contain simple values, such as String, Number or Boolean\nvalues.\n\nIf `where` is not specified, `query` returns all objects.\n",
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
		"showThread": {
			"summary": "",
			"description": "Show messages with the given `thread_id` from the user's inbox. If the status\nof any of the returned messages is `unread`, it will be changed to `read`.\n",
			"authRequired": true,
			"instance": true,
			"adminRequired": false,
			"response": {
				"singleElement": true
			},
			"parameters": [
				{
					"name": "thread_id",
					"description": "ID of the thread to show messages from.",
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
				}
			]
		},
		"showThreads": {
			"summary": "",
			"description": "Shows the first message in each of the most recent threads in the user's inbox.",
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
				}
			]
		},
		"create": {
			"summary": "",
			"description": "Sends a message with an optional subject to one or more specified users. The `thread_id` of\nthe first outgoing message is its own id. Replies to the first or subsequent messages in\nthe thread will all use the id of the first message as their `thread_id`. The output of this\nAPI method is the copy of the message saved to the sender's sent mail.\n",
			"authRequired": true,
			"instance": true,
			"adminRequired": false,
			"response": {
				"singleElement": true
			},
			"parameters": [
				{
					"name": "to_ids",
					"description": "Comma-separated list of one or more IDs of Users to send the message to.",
					"type": "String",
					"required": true
				},
				{
					"name": "body",
					"description": "The body of the message.",
					"type": "String",
					"required": true
				},
				{
					"name": "subject",
					"description": "Message subject.",
					"type": "String"
				},
				{
					"name": "custom_fields",
					"description": "User-defined data. See [Custom Objects and Custom Fields](/#!/guide/customfields).",
					"type": "String"
				},
				{
					"name": "user_id",
					"type": "String",
					"description": "ID of the Users to send message on behalf of.\n\nThe current login user must be the application admin, in order to send a\nmessage on behalf of another user.\n"
				},
				{
					"name": "pretty_json",
					"description": "Determines if the JSON response is formatted for readability (`true`), or displayed on a\nsingle line (`false`). Default is `false`.\n",
					"type": "Boolean"
				}
			]
		},
		"reply": {
			"summary": "",
			"description": "Replies to all recipients of the given message `id`. The status of the message\nwill be changed to `replied`.\n",
			"authRequired": true,
			"instance": true,
			"adminRequired": false,
			"response": {
				"singleElement": true
			},
			"parameters": [
				{
					"name": "message_id",
					"description": "ID of the message to reply to.",
					"type": "String",
					"required": true
				},
				{
					"name": "body",
					"description": "Reply message body text.",
					"type": "String",
					"required": true
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
				defaultValue.message_id = instance.getPrimaryKey();
				return defaultValue;
			case 'delete':
				return {
					message_id: instance.getPrimaryKey()
				};
		}
		return defaultValue;
	},

	actions: ["delete","read","create"]
});
