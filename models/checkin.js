'use strict';

var Arrow = require("arrow");

/*
 The Checkins model.
 */
module.exports = Arrow.Model.extend("appc.arrowdb/checkin", {
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
		"user": {
			// "originalType": "Users",
			"type": Array,
			"description": "Checkin owner."
		},
		"message": {
			// "originalType": "String",
			"type": String,
			"description": "Checkin message."
		},
		"place": {
			// "originalType": "Places",
			"type": Array,
			"description": "The place object associated with the checkin."
		},
		"event": {
			// "originalType": "Events",
			"type": Array,
			"description": "The event object associated with the checkin."
		},
		"photo": {
			// "originalType": "Photos",
			"type": Array,
			"description": "The primary photo for the checkin."
		},
		"tags": {
			// "originalType": "String",
			"type": String,
			"description": "Comma-separated list of tags associated with this checkin."
		},
		"custom_fields": {
			// "originalType": "String,Hash",
			"type": Object,
			"description": "User defined fields. See [Custom Data Fields](#!/guide/customfields)."
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
		"show": {
			"summary": "Show a Checkin",
			"description": "Returns the contents of the identified checkin.",
			"authRequired": false,
			"instance": true,
			"adminRequired": false,
			"response": {
				"singleElement": true
			},
			"parameters": [
				{
					"name": "checkin_id",
					"description": "ID of the checkin to show.",
					"type": "String",
					"required": true
				},
				{
					"name": "response_json_depth",
					"description": "Nested object depth level counts in response json.\nIn order to reduce server API calls from an application, the response json may\ninclude not just the objects that are being queried/searched, but also with\nsome important data related to the returning objects such as object's owner or\nreferencing objects.\n",
					"type": "Number"
				},
				{
					"name": "show_user_like",
					"description": "If set to **true** the Checkin object in the response will include `\"current_user_liked: true\"`\nif the current user has liked the object. If the user has not liked the object, the\n`current_user_liked` field is not included in the response.\n",
					"type": "Boolean"
				},
				{
					"name": "pretty_json",
					"description": "Determines if the JSON response is formatted for readability (`true`), or displayed on a\nsingle line (`false`). Default is `false`.\n",
					"type": "Boolean"
				}
			]
		},
		"delete": {
			"summary": "Delete a Checkin",
			"description": "Deletes a checkin.   The Place, Event, or Photo associated with the checkin is not deleted.  An application admin can delete any Checkin object.  ",
			"authRequired": true,
			"instance": true,
			"adminRequired": false,
			"response": {
				"singleElement": true
			},
			"parameters": [
				{
					"name": "checkin_id",
					"description": "ID of the checkin to delete.",
					"type": "String",
					"required": true
				},
				{
					"name": "pretty_json",
					"description": "Determines if the JSON response is formatted for readability (`true`), or displayed on a\nsingle line (`false`). Default is `false`.\n",
					"type": "Boolean"
				},
				{
					"name": "su_id",
					"description": "User to delete the Checkin object on behalf of. The user must be the creator of the object.\n\nThe current user must be an application admin to delete a Checkin object on\nbehalf of another user.\n",
					"type": "String"
				}
			]
		},
		"update": {
			"summary": "",
			"description": "Updates a checkin for the currenty logged in user.  Application admins can update another user's checkin on their behalf by including the `su_id` field in the request. ",
			"authRequired": true,
			"instance": true,
			"adminRequired": false,
			"response": {
				"singleElement": true
			},
			"parameters": [
				{
					"name": "checkin_id",
					"description": "ID of the Checkins to update.\n",
					"type": "String",
					"required": true
				},
				{
					"name": "place_id",
					"description": "ID of the Places to check in to.\n\nYou can associate a checkin with either a Places or Events object but not both.\n",
					"type": "String"
				},
				{
					"name": "event_id",
					"description": "ID of the Events to check in to.\n\nYou can associate a checkin with either a Places or Events object but not both.\n",
					"type": "String"
				},
				{
					"name": "message",
					"description": "Message to attach to the checkin.",
					"type": "String"
				},
				{
					"name": "photo",
					"description": "New Photos object to attach as the primary photo for the checkin.\n\nWhen you use the `photo` parameter to attach a new photo, you can use the\n[custom resize and sync options](#!/guide/photosizes).\n",
					"type": "Photos"
				},
				{
					"name": "photo_id",
					"description": "ID of an existing Photos object to attach as the primary photo for the checkin.\n",
					"type": "String"
				},
				{
					"name": "pretty_json",
					"description": "Determines if the JSON response is formatted for readability (`true`), or displayed on a\nsingle line (`false`). Default is `false`.\n",
					"type": "Boolean"
				},
				{
					"name": "tags",
					"description": "Comma-separated list of tags for this checkin.\n",
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
					"description": "Name of an ACLs to associate with this checkin object.\n\nAn ACL can be specified using `acl_name` or `acl_id`. The two parameters are\nmutually exclusive.\n",
					"type": "String"
				},
				{
					"name": "acl_id",
					"description": "ID of an ACLs to associate with this checkin object.\n\nAn ACL can be specified using `acl_name` or `acl_id`. The two parameters are\nmutually exclusive.\n",
					"type": "String"
				},
				{
					"name": "su_id",
					"description": "ID of Users to update the checkin on behalf of.\n\nThe current login user must be an application admin to create a checkin on\nbehalf of another user.\n",
					"type": "String"
				}
			]
		},
		"batchDelete": {
			"summary": "Deletes multiple Checkin objects.",
			"description": "Deletes Checkin objects that match the query constraints provided in the `where` parameter. If no `where` parameter is provided, all Checkin objects are deleted. Note that an HTTP 200 code (success) is returned if the call completed successfully but the query matched no objects.  For performance reasons, the number of objects that can be deleted in a single batch delete  operation is limited to 100,000.  The matched objects are deleted asynchronously in a separate process. The Place,  Event, or Photo associated with any of the matched objects is  not deleted.  You must be an application admin to run this command.         ",
			"authRequired": true,
			"instance": true,
			"adminRequired": true,
			"response": {
				"singleElement": true
			},
			"parameters": [
				{
					"name": "where",
					"description": "Encoded JSON object that specifies constraint values for Checkins objects to delete.\nIf not specified, all Checkins objects are deleted.\n",
					"type": "Hash"
				}
			]
		},
		"query": {
			"summary": "Custom Query Checkins",
			"description": "Performs a custom query of checkins with sorting and pagination. Currently you can not query or sort data stored inside array or hash in custom fields.  In ACS 1.1.5 and later, you can paginate query results using `skip` and `limit` parameters, or by including a `where` clause to limit the results to objects whose IDs fall within a specified range. For details, see [Query Pagination](#!/guide/search_query-section-query-pagination).  For details about using the query parameters, see the [Search and Query guide](#!/guide/search_query). ",
			"authRequired": false,
			"instance": true,
			"adminRequired": false,
			"parameters": [
				{
					"name": "page",
					"description": "Request page number, default is 1.\n\nThis parameter is only available to ACS applications created before ACS 1.1.5. \nApplications created with ACS 1.1.5 and later must use ranged-based queries queries\nto paginate their queries.\n",
					"type": "Number"
				},
				{
					"name": "per_page",
					"description": "Number of results per page, default is 10.\n\nThis parameter is only available to ACS applications created before ACS 1.1.5. \nApplications created with ACS 1.1.5 and later must use ranged-based queries queries\nto paginate their queries.        \n",
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
					"description": "If set to **true**, each Checkin object in the response includes \"current_user_liked: true\"`\nif the current user has liked the object. If the user has not liked the object, the\n`current_user_liked` field is not included in the response.\n",
					"type": "Boolean"
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
		"create": {
			"summary": "Checkin to a Place or Event",
			"description": "Creates a checkin associated with either a Places or Events object.   You should specify either a Places or Events object, but not both. If both are provided, the Places object will be used.  A checkin message is optional. The optional photo parameter contains the binary data stream representing the photo included with the checkin. If a photo is included, the response includes a \"processed\" flag which indicates if the photo has been resized and stored reliably in the Appcelerator Cloud Services storage engine. This will be false initially be false. ",
			"authRequired": true,
			"instance": true,
			"adminRequired": false,
			"response": {
				"singleElement": true
			},
			"parameters": [
				{
					"name": "place_id",
					"description": "ID of the Places to check in to.\n\nYou can associate a checkin with either a Places or Events object but not both.\n",
					"type": "String"
				},
				{
					"name": "event_id",
					"description": "ID of the Events to check in to.\n\nYou can associate a checkin with either a Places or Events object but not both.\n",
					"type": "String"
				},
				{
					"name": "message",
					"description": "Message to attach to the checkin.",
					"type": "String"
				},
				{
					"name": "photo",
					"description": "New photo to attach as the primary photo for the checkin.\n\nWhen you use the `photo` parameter to attach a new photo, you can use the\n[custom resize and sync options](#!/guide/photosizes).\n",
					"type": "Photos"
				},
				{
					"name": "photo_id",
					"description": "ID of an existing photo to attach as the primary photo for the checkin.\n",
					"type": "String"
				},
				{
					"name": "pretty_json",
					"description": "Determines if the JSON response is formatted for readability (`true`), or displayed on a\nsingle line (`false`). Default is `false`.\n",
					"type": "Boolean"
				},
				{
					"name": "response_json_depth",
					"description": "Nested object depth level counts in response json.\n\nIn order to reduce server API calls from an application, the JSON response may\ninclude not just the objects that are being queried/searched, but also\nimportant data related to the queried objects, such as the object's owner or\nreferencing objects.\n\nDefault depth is 1. Valid values are 1-8.\n",
					"type": "Number"
				},
				{
					"name": "tags",
					"description": "Comma separated list of tags for this checkin.\n",
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
					"description": "Name of an ACLs to associate with this checkin object.\n\nAn ACL can be specified using `acl_name` or `acl_id`. The two parameters are\nmutually exclusive.\n",
					"type": "String"
				},
				{
					"name": "acl_id",
					"description": "ID of an ACLs to associate with this checkin object.\n\nAn ACL can be specified using `acl_name` or `acl_id`. The two parameters are\nmutually exclusive.\n",
					"type": "String"
				},
				{
					"name": "su_id",
					"description": "User ID to create the checkin on behalf of.\n\nThe current login user must be an application admin to create a checkin on\nbehalf of another user.\n",
					"type": "String"
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
				defaultValue.checkin_id = instance.getPrimaryKey();
				return defaultValue;
			case 'delete':
				return {
					checkin_id: instance.getPrimaryKey()
				};
		}
		return defaultValue;
	},

	actions: ["delete","update","read","create"]
});
