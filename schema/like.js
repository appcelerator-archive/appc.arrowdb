'use strict';

/*
 The Likes model.
 */
module.exports = {
	name: 'like',
	objectName: 'Likes',

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
		// "originalType": "Date",
		"created_at": {
			"type": Date,
			"description": "Creation date for this liked object."
		},
		// "originalType": "String",
		"post_id": {
			"type": String,
			"description": "Post object to like."
		},
		// "originalType": "String",
		"photo_id": {
			"type": String,
			"description": "Photo object to like."
		},
		// "originalType": "String",
		"user_id": {
			"type": String,
			"description": "User object to like."
		},
		// "originalType": "String",
		"event_id": {
			"type": String,
			"description": "Event object to like."
		},
		// "originalType": "String",
		"place_id": {
			"type": String,
			"description": "Event object to like."
		},
		// "originalType": "String",
		"places": {
			"type": Array,
			"description": "Place object to like."
		},
		// "originalType": "String",
		"checkin_id": {
			"type": String,
			"description": "Checkin object to like."
		},
		// "originalType": "String",
		"status_id": {
			"type": String,
			"description": "Status object to like."
		},
		// "originalType": "String",
		"review_id": {
			"type": String,
			"description": "Review object to like."
		},
		// "originalType": "String",
		"custom_object_id": {
			"type": String,
			"description": "Custom object to like."
		},
		// "originalType": "String",
		"likeable_id": {
			"type": String,
			"description": "Object ID of the liked object."
		},
		// "originalType": "String",
		"likeable_type": {
			"type": String,
			"description": "Object type of the liked object, which is the name of the object, such as Post, Photo, etc."
		},
		"user": {
			// "originalType": "Users",
			"type": Array,
			"description": "User who generated the like."
		},
		"updated_at": {
			// "originalType": "Date",
			"type": Date,
			"description": "Last update time for this liked object."
		}
	},
	/*
	 Methods for this model.
	 */
	methodMeta: {
		"create": {
			"summary": "Add a Like",
			"description": "Adds a \"like\" to an object. Currently, likes can only be associated with one of the following object types, and a user can only like an object once:\n\n * Posts * Photos * Users * Events * Checkins * Places * CustomObjects * Statuses * Reviews Once an object has one or more likes attached to it, it will return a total like count with the object: \"likes_count\": 2 You should specify one, and only one, ArrowDB object ID parameter to identify the target object. ",
			"authRequired": true,
			"instance": true,
			"adminRequired": false,
			"parameters": [
				{
					"name": "post_id",
					"description": "Post object to like.\n",
					"type": "String"
				},
				{
					"name": "photo_id",
					"description": "Photo object to like.\n",
					"type": "String"
				},
				{
					"name": "user_id",
					"description": "User object to like.\n",
					"type": "String"
				},
				{
					"name": "event_id",
					"description": "Event object to like.\n",
					"type": "String"
				},
				{
					"name": "place_id",
					"description": "Place object to like.\n",
					"type": "String"
				},
				{
					"name": "checkin_id",
					"description": "Checkin object to like.\n",
					"type": "String"
				},
				{
					"name": "status_id",
					"description": "Status object to like.\n",
					"type": "String"
				},
				{
					"name": "review_id",
					"description": "Review object to like.\n",
					"type": "String"
				},
				{
					"name": "custom_object_id",
					"description": "Custom object to like.\n",
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
			"summary": "",
			"description": "Perform custom query of geofences with sorting and paginating.\n\nIn ArrowDB 1.1.5 and later, you can paginate query results using skip and limit parameters, or by including a where clause to limit the results to objects whose IDs fall within a specified range. For details, see [Query Pagination](http://docs.appcelerator.com/arrowdb/latest/#!/guide/search_query-section-query-pagination).\n\nFor details about using the query parameters, see the [Search and Query guide](http://docs.appcelerator.com/arrowdb/latest/#!/guide/search_query). ",
			"authRequired": false,
			"instance": true,
			"adminRequired": false,
			"parameters": [
				{
					"name": "page",
					"description": "Starting in ArrowDB 1.1.5, page and per_page are no longer supported in query operations. Applications should instead use skip and limit query parameters.",
					"type": "Number"
				},
				{
					"name": "per_page",
					"description": "Starting in ArrowDB 1.1.5, page and per_page are no longer supported in query operations. Applications should instead use skip and limit query parameters.",
					"type": "Number"
				},
				{
					"name": "limit",
					"description": "The number of records to fetch. The value must be greater than 0, and no greater than 1000, or an HTTP 400 (Bad Request) error will be returned. Default value of limit is 10.",
					"type": "Number"
				},
				{
					"name": "skip",
					"description": "The number of records to skip. The value must be greater than or equal to 0, and no greater than 4999, or an HTTP 400 error will be returned. To skip 5000 records or more you need to perform a range-based query. See [Query Pagination](http://docs.appcelerator.com/arrowdb/latest/#!/guide/search_query-section-query-pagination) for more information.",
					"type": "Number"
				},
				{
					"name": "limit",
					"description": "The number of records to fetch. The value must be greater than 0, and no greater than 1000, or an HTTP 400 (Bad Request) error will be returned. Default value of limit is 10.",
					"type": "Number"
				},
				{
					"name": "where",
					"description": "A JSON-encoded object that defines the query used.\n\nThe following fields can be used for the query:\n\nstart_time\nend_time\nloc : For this property, specify a MongoDB Geospatial Query.\n\nIf where is not specified, query returns all objects.",
					"type": "Hash"
				},
				{
					"name": "response_json_depth",
					"description": "Nested object depth level counts in response json. In order to reduce server API calls from an application, the response json may include not just the objects that are being queried/searched, but also with some important data related to the returning objects such as object's owner or referencing objects.\n\nDefault is 1, valid range is 1 to 8.",
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
			"summary": "Delete a Like",
			"description": "Delete the like from the target object. Only the original submitter can delete the like. Specify one and only one of the ID parameters to identify the target object. ",
			"authRequired": true,
			"instance": true,
			"adminRequired": false,
			"parameters": [
				{
					"name": "post_id",
					"description": "Post object to delete \"like\" from.\n",
					"type": "String"
				},
				{
					"name": "photo_id",
					"description": "Photo object to delete \"like\" from.\n",
					"type": "String"
				},
				{
					"name": "user_id",
					"description": "User object to delete \"like\" from.\n",
					"type": "String"
				},
				{
					"name": "event_id",
					"description": "Event object to delete \"like\" from.\n",
					"type": "String"
				},
				{
					"name": "place_id",
					"description": "Place object to delete \"like\" from.\n",
					"type": "String"
				},
				{
					"name": "checkin_id",
					"description": "Checkin object to delete \"like\" from.\n",
					"type": "String"
				},
				{
					"name": "status_id",
					"description": "Status object to delete \"like\" from.\n",
					"type": "String"
				},
				{
					"name": "review_id",
					"description": "Review object to delete \"like\" from.\n",
					"type": "String"
				},
				{
					"name": "custom_object_id",
					"description": "Custom object to delete \"like\" from.\n",
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
				defaultValue.like_id = instance.getPrimaryKey();
				return defaultValue;
			case 'delete':
				return {
					like_id: instance.getPrimaryKey()
				};
		}
		return defaultValue;
	},

	actions: ["delete", "create", "read"]
};
