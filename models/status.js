'use strict';

var Arrow = require("arrow.js");

/*
 The Statuses model.
 */
module.exports = Arrow.Model.extend("appc.arrowdb/status", {
	/**
	 * Remove generated: true or set it to false if you want to prevent syncModels.js from changing this file.
	 */
	generated: true,
	/*
	 Fields for this model.
	 */
	fields: {
		"user": {
			// "originalType": "Users",
			"type": Array,
			"description": "Status owner."
		},
		"message": {
			// "originalType": "String",
			"type": String,
			"description": "Status message."
		},
		"place": {
			// "originalType": "Places",
			"type": Array,
			"description": "The Places object associated with this status."
		},
		"event": {
			// "originalType": "Events",
			"type": Array,
			"description": "The Events object associated with this status."
		},
		"photo": {
			// "originalType": "Photos",
			"type": Array,
			"description": "The primary photo for this status."
		},
		"tags": {
			// "originalType": "String",
			"type": String,
			"description": "Comma-separated list of tags associated with this status."
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
		"acls": {
			// "originalType": "Array",
			"type": Array,
			"description": "Single-element array containing the ACLs associated with this status object, if any.\n"
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
		"batchDelete": {
			"summary": "Deletes multiple Statuses objects.",
			"description": "Deletes Statuses objects that match the query constraints provided in the `where` parameter.\nIf no `where` parameter is provided, all Statuses objects are deleted. \nNote that an HTTP 200 code (success)\nis returned if the call completed successfully but the query matched no objects.\n\nFor performance reasons, the number of objects that can be deleted in a single batch delete \noperation is limited to 100,000.\n\nThe matched objects are deleted asynchronously in a separate process. The associated \nEvent, Photo, or Place of each matched object \nis not deleted.   \n\nYou must be an application admin to run this command.\n",
			"authRequired": true,
			"instance": true,
			"adminRequired": true,
			"response": {
				"singleElement": true
			},
			"parameters": [
				{
					"name": "where",
					"description": "Encoded JSON object that specifies constraint values for Statuses objects to delete.\nIf not specified, all Statuses objects are deleted.\n",
					"type": "Hash"
				}
			]
		},
		"create": {
			"summary": "Create a Status",
			"description": "Creates a status for the currenty logged in user. You can optionally associate a new status with \neither an existing Places object or an Events object, but not both.\n\nApplication admins can create a status on behalf of another user by including the\n`user_id` field in the request.\n",
			"authRequired": true,
			"instance": true,
			"adminRequired": false,
			"response": {
				"singleElement": true
			},
			"parameters": [
				{
					"name": "message",
					"description": "Status message.",
					"type": "String",
					"required": true
				},
				{
					"name": "place_id",
					"description": "ID of the Places object this status is associated with. You can associate the status \neither with a Places object or an Events object, but not both.\n",
					"type": "String"
				},
				{
					"name": "event_id",
					"description": "ID of the Events object this status is associated with. You can associate the status \neither with an Events object or a Places object, but not both.\n",
					"type": "String"
				},
				{
					"name": "photo",
					"description": "New photo to attach as the primary photo for this status.\n\nWhen you use the `photo` parameter to attach a new photo, you can use the\n[custom resize and sync options](#!/guide/photosizes).\n",
					"type": "Photos"
				},
				{
					"name": "photo_id",
					"description": "ID of an existing photo to attach as the primary photo for this status.\n",
					"type": "String"
				},
				{
					"name": "tags",
					"description": "Comma separated list of tags for this status.\n",
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
					"name": "acl_name",
					"description": "Name of an ACLs to associate with this status.\n\nAn ACL can be specified using `acl_name` or `acl_id`. The two parameters are\nmutually exclusive.\n",
					"type": "String"
				},
				{
					"name": "acl_id",
					"description": "ID of an ACLs to associate with this status.\n\nAn ACL can be specified using `acl_name` or `acl_id`. The two parameters are\nmutually exclusive.\n",
					"type": "String"
				},
				{
					"name": "user_id",
					"description": "User ID to create the status on behalf of. You must be logged in as an application admin\nto create a status on behalf of another user.\n",
					"type": "String"
				},
				{
					"name": "pretty_json",
					"description": "Determines if the JSON response is formatted for readability (`true`), or displayed on a\nsingle line (`false`). Default is `false`.\n",
					"type": "Boolean"
				}
			]
		},
		"delete": {
			"summary": "Delete a Status",
			"description": "Deletes a status for the currenty logged in user.\nThe associated Event, Photo, or Place is not deleted.           \n",
			"authRequired": true,
			"instance": true,
			"adminRequired": false,
			"response": {
				"singleElement": true
			},
			"parameters": [
				{
					"name": "status_id",
					"description": "ID of the status to delete.",
					"type": "String",
					"required": true
				},
				{
					"name": "user_id",
					"description": "User ID to destroy the status on behalf of.\n\nThe current login user must be an application admin to destroy a status on\nbehalf of another user.\n",
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
			"summary": "Custom Query Status",
			"description": "Performs a custom query of statuses with sorting and pagination. Currently you\ncan not query or sort data stored inside array or hash in custom fields.\n\n\nIn addition to custom fields, the following pre-defined fields can be used to\nquery and sort statuses:\n\n*   `user_id` : `String`.  Status owner's user ID.\n*   `event_id` : `String`.  ID for the Events associated with this status.\n*   `place_id` : `String`.  ID for the Place associated with this status.\n*   `created_at` : `Date`.  Timestamp when the status was created.\n*   `updated_at` : `Date`.  Timestamp when the status was last updated.\n\nIn ACS 1.1.5 and later, you can paginate query results using `skip` and `limit` parameters, or by including\na `where` clause to limit the results to objects whose IDs fall within a specified range.\nFor details, see [Query Pagination](#!/guide/search_query-section-query-pagination).\n\nFor details about using the query parameters,\nsee the [Search and Query guide](#!/guide/search_query).\n",
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
					"name": "show_user_like",
					"description": "If set to **true**, each Status object in the response includes `\"current_user_liked: true\"`\n if the current user has liked the object. If the user has not liked the object, the \n`current_user_liked` field is not included in the response.\n",
					"type": "Boolean"
				},
				{
					"name": "unsel",
					"description": "Selects the object fields NOT to display. Do not use this parameter with `sel`.\n",
					"type": "Hash"
				},
				{
					"name": "response_json_depth",
					"description": "Nested object depth level counts in the response JSON.  \n\nIn order to reduce server API calls from an application, the response JSON may\ninclude not just the objects that are being queried/searched, but also \nsome important data related to the returned objects, such as owners and\nreferenced objects.  \n\nDefault is 1, valid range is 1 to 8.\n",
					"type": "Number"
				},
				{
					"name": "pretty_json",
					"description": "Determines if the JSON response is formatted for readability (`true`), or displayed on a\nsingle line (`false`). Default is `false`.\n",
					"type": "Boolean"
				}
			]
		},
		"show": {
			"summary": "Show a status",
			"description": "Returns the identified status message.\n",
			"authRequired": false,
			"instance": true,
			"adminRequired": false,
			"response": {
				"singleElement": true
			},
			"parameters": [
				{
					"name": "status_id",
					"description": "ID of the status to show.",
					"type": "String",
					"required": true
				},
				{
					"name": "response_json_depth",
					"description": "Nested object depth level counts in response JSON.\n\nIn order to reduce server API calls from an application, the response JSON may\ninclude not just the objects that are being queried/searched, but also\nsome important data related to the returned objects such as object's owner or\nreferenced objects.\n\nDefault is 1, valid range is 1 to 8.\n",
					"type": "Number"
				},
				{
					"name": "show_user_like",
					"description": "If set to **true** the Status object in the response will include `\"current_user_liked: true\"`\nif the current user has liked the object. If the user has not liked the object, the \n`current_user_liked` field is not included in the response.\n",
					"type": "Boolean"
				},
				{
					"name": "pretty_json",
					"description": "Determines if the JSON response is formatted for readability (`true`), or displayed on a\nsingle line (`false`). Default is `false`.\n",
					"type": "Boolean"
				}
			]
		},
		"update": {
			"summary": "Updates a Status",
			"description": "Updates a status for the currenty logged in user. You can optionally associate the updated status \nwith either an existing Places object or an Events object, but not both.\n\nApplication admins can update another user's status on their behalf by including the\n`user_id` field in the request.\n",
			"authRequired": true,
			"instance": true,
			"adminRequired": false,
			"response": {
				"singleElement": true
			},
			"parameters": [
				{
					"name": "status_id",
					"description": "ID of the status to update.",
					"type": "String",
					"required": true
				},
				{
					"name": "message",
					"description": "Status message.",
					"type": "String"
				},
				{
					"name": "place_id",
					"description": "ID of the Places object this status is associated with. You can associate the status \neither with a Places object or an Events object, but not both.\n",
					"type": "String"
				},
				{
					"name": "event_id",
					"description": "ID of the Events object this status is associated with. You can associate the status \neither with an Events object or a Places object, but not both.\n",
					"type": "String"
				},
				{
					"name": "photo",
					"description": "New photo to attach as the primary photo for this status.\n\nWhen you use the `photo` parameter to attach a new photo, you can use the\n[custom resize and sync options](#!/guide/photosizes).\n",
					"type": "Photos"
				},
				{
					"name": "photo_id",
					"description": "ID of an existing photo to attach as the primary photo for this status.\n",
					"type": "String"
				},
				{
					"name": "tags",
					"description": "Comma separated list of tags for this status.\n",
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
					"name": "acl_name",
					"description": "Name of an ACLs to associate with this status.\n\nAn ACL can be specified using `acl_name` or `acl_id`. The two parameters are\nmutually exclusive.\n",
					"type": "String"
				},
				{
					"name": "acl_id",
					"description": "ID of an ACLs to associate with this status.\n\nAn ACL can be specified using `acl_name` or `acl_id`. The two parameters are\nmutually exclusive.\n",
					"type": "String"
				},
				{
					"name": "user_id",
					"description": "User ID to update the status on behalf of.\n\nThe current login user must be an application admin to update a status on\nbehalf of another user.\n",
					"type": "String"
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
				defaultValue.status_id = instance.getPrimaryKey();
				return defaultValue;
			case 'delete':
				return {
					status_id: instance.getPrimaryKey()
				};
		}
		return defaultValue;
	}
});
