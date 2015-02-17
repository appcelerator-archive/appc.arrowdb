'use strict';

var Arrow = require("arrow");

/*
 The Likes model.
 */
module.exports = Arrow.Model.extend("appc.arrowdb/like", {
	/**
	 * Remove generated: true or set it to false if you want to prevent syncModels.js from changing this file.
	 */
	generated: true,
	/*
	 Fields for this model.
	 */
	fields: {
		"likeable_type": {
			// "originalType": "String",
			"type": String,
			"description": "Object type of the liked object, which is the name of the object, such as `Post`, `Photo`, etc."
		},
		"likeable_id": {
			// "originalType": "String",
			"type": String,
			"description": "Object ID of the liked object."
		},
		"created_at": {
			// "originalType": "Date",
			"type": Date,
			"description": "Creation date for this liked object."
		},
		"updated_at": {
			// "originalType": "Date",
			"type": Date,
			"description": "Last update time for this liked object."
		},
		"user": {
			// "originalType": "Users",
			"type": Array,
			"description": "User who generated the like."
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
		"create": {
			"summary": "Create Like",
			"description": "Adds a \"like\" to an object. Currently, likes can only be associated with one of\nthe following object types, and a user can only like an object once:\n\n*   Posts\n*   Photos\n*   Users\n*   Events\n*   Checkins\n*   Places\n*   CustomObjects\n*   Statuses\n*   Reviews\n\nOnce an object has one or more likes attached to it, it will return a\ntotal like count with the object:\n\n    \"likes_count\": 2\n\nYou should specify one, and only one, ACS object ID parameter to identify the target object.\n",
			"authRequired": true,
			"instance": true,
			"adminRequired": false,
			"response": {
				"singleElement": true
			},
			"parameters": [
				{
					"name": "post_id",
					"description": "Post object to like.",
					"type": "String"
				},
				{
					"name": "photo_id",
					"description": "Photo object to like.",
					"type": "String"
				},
				{
					"name": "user_id",
					"description": "User object to like.",
					"type": "String"
				},
				{
					"name": "event_id",
					"description": "Event object to like.",
					"type": "String"
				},
				{
					"name": "place_id",
					"description": "Place object to like.",
					"type": "String"
				},
				{
					"name": "checkin_id",
					"description": "Checkin object to like.",
					"type": "String"
				},
				{
					"name": "status_id",
					"description": "Status object to like.",
					"type": "String"
				},
				{
					"name": "review_id",
					"description": "Review object to like.",
					"type": "String"
				},
				{
					"name": "custom_object_id",
					"description": "Custom object to like.",
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
			"summary": "Delete a Like",
			"description": "Delete the like from the target object. Only the original submitter can delete\nthe like.\n\nSpecify one and only one of the ID parameters to identify  the target object.\n",
			"authRequired": true,
			"instance": true,
			"adminRequired": false,
			"response": {
				"singleElement": true
			},
			"parameters": [
				{
					"name": "post_id",
					"description": "Post object to delete \"like\" from.",
					"type": "String"
				},
				{
					"name": "photo_id",
					"description": "Photo object to delete \"like\" from.",
					"type": "String"
				},
				{
					"name": "user_id",
					"description": "User object to delete \"like\" from.",
					"type": "String"
				},
				{
					"name": "event_id",
					"description": "Event object to delete \"like\" from.",
					"type": "String"
				},
				{
					"name": "place_id",
					"description": "Place object to delete \"like\" from.",
					"type": "String"
				},
				{
					"name": "checkin_id",
					"description": "Checkin object to delete \"like\" from.",
					"type": "String"
				},
				{
					"name": "status_id",
					"description": "Status object to delete \"like\" from.",
					"type": "String"
				},
				{
					"name": "review_id",
					"description": "Review object to delete \"like\" from.",
					"type": "String"
				},
				{
					"name": "custom_object_id",
					"description": "Custom object to delete \"like\" from.",
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
			"summary": "Custom Query of Likes",
			"description": "Performs custom query of likes with sorting and paginating.\n\nYou can either query the likes of an object using the object's ID,\nsuch as the `post_id`, `photo_id`, etc. parameter, or the likes generated by a user,\nby specifying the `user_id` parameter.\n\nA non-administrator user can only retrieve results on the likes they generated.\n\nApplication administrators can retrieve results on the likes of all users and\nquery likes generated by other users by specifying the `user_id` parameter.\n\nIn addition to custom fields, the following pre-defined fields can be used to\nquery and sort likes:\n\n*   `user_id` : `String`. User ID of the User that generated the likes.\n    Only an application admininstrator can query likes of other users.\n*   `likeable_type` : `String`. Object type of the like object, which is the name of the object,\n    such as `Post`, `Photo`, etc.\n*   `likeable_id` : `String`. Object ID of the like object.\n*   `created_at` : `Date`. Timestamp when the like was created.\n*   `updated_at` : `Date`. Timestamp when the like was last updated.\n\nIn ACS 1.1.5 and later, you can paginate query results using `skip` and `limit` parameters, or by including\na `where` clause to limit the results to objects whose IDs fall within a specified range.\nFor details, see [Query Pagination](#!/guide/search_query-section-query-pagination).\n\nFor details about using the query parameters,\nsee the [Search and Query guide](#!/guide/search_query).\n",
			"authRequired": true,
			"instance": true,
			"adminRequired": false,
			"parameters": [
				{
					"name": "post_id",
					"description": "Limit query to likes on the identified Post object.",
					"type": "String"
				},
				{
					"name": "photo_id",
					"description": "Limit query to likes on the identified Photo object.",
					"type": "String"
				},
				{
					"name": "event_id",
					"description": "Limit query to likes on the identified Event object.",
					"type": "String"
				},
				{
					"name": "place_id",
					"description": "Limit query to likes on the identified Place object.",
					"type": "String"
				},
				{
					"name": "checkin_id",
					"description": "Limit query to likes on the identified Checkin object.",
					"type": "String"
				},
				{
					"name": "review_id",
					"description": "Limit query to likes on the identified Review object.",
					"type": "String"
				},
				{
					"name": "custom_object_id",
					"description": "Limit query to likes on the identified Custom object.",
					"type": "String"
				},
				{
					"name": "user_object_id",
					"description": "Limit query to likes on the identified User object.",
					"type": "String"
				},
				{
					"name": "user_id",
					"description": "Limit query to likes generated by the identified User.\nOnly an application administrator can query likes generated by other users.\n",
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
					"description": "Nested object depth level counts in the response JSON.\n\nIn order to reduce server API calls from an application, the response JSON may\ninclude not just the objects that are being queried/searched, but also\nsome important data related to the returned objects, such as owners and\nreferenced objects.\n\nDefault is 1, valid range is 1 to 8.\n",
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
				defaultValue.like_id = instance.getPrimaryKey();
				return defaultValue;
			case 'delete':
				return {
					like_id: instance.getPrimaryKey()
				};
		}
		return defaultValue;
	}
});
