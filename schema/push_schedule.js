'use strict';

var Arrow = require('arrow');
/*
 The PushSchedules model.
 */
module.exports = {
	name: 'pushSchedule',
	objectName: 'PushSchedules',

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
		"name": {
			// "originalType": "String",
			"type": String,
			"description": "Arbitrary name for the scheduled push notification."
		},
		"push_notification": {
			// "originalType": "Hash",
			"type": Object,
			"description": "Push notification to send for scheduled pushes.\n\n * channel (String): Name of the channel to send the push notification to. The name of the push channel cannot start with a hash symbol ('#') or contain a comma (',').\n * payload (Hash): Payload to send to the device. Same format as PushNotifications.notify.\n* to_ids (Array/String): Array or comma-separated list of IDs to send push notifications to.\n * options (Hash): Dictionary of additional options\n** expire_after_seconds (Number): Expiration time in seconds of when to stop sending the push notification based on the start date. For example, if the push notification is scheduled to be sent in a week and the expiration time is for a day. The push expires in eight days and will not be sent if the user's device has been off before the send day and after the end of the expiration period."
		},
		"recurrence": {
			// "originalType": "Hash",
			"type": Object,
			"description": "Schedules the recurrence of the push notification.\n\n * interval (String): Either daily, weekly or monthly.\n * end_time (Date): Datetime to end the push notifications in ISO 8601 format. Must occur after start_time."
		},
		"start_time": {
			// "originalType": "Date",
			"type": Date,
			"description": "Datetime to start the scheduled push notification in ISO 8601 format."
		},
		"schedule": {
			// "originalType": "PushSchedule",
			"type": Object,
			"description": "Push notification to schedule."
		},
		"where": {
			// "originalType": "Hash",
			"type": Object,
			"description": "A JSON-encoded object that defines a location query used to select the devices that will receive the scheduled notification. Up to 1000 users can be returned by the query. To specify a location query, set the loc field to a [MongoDB Geospatial Query](http://docs.mongodb.org/manual/reference/operator/query-geospatial/). For details about using the where parameter, see the [Search and Query guide](http://docs.appcelerator.com/arrowdb/latest/#!/guide/search_query)."
		}
	},
	/*
	 Methods for this model.
	 */
	methodMeta: {
		"create": {
			"summary": "Create a scheduled push notification",
			"description": "Creates a scheduled push notification. At minimum, you must specify the start_time, and payload parameters. A push schedule can optionally define a location query so that only devices in the specified geographic region will receive the push notification. The current user must be an application admin to use this API. ",
			"authRequired": true,
			"instance": true,
			"adminRequired": true,
			"response": {
				"name": "push_schedules"
			},
			"parameters": [
				{
					"name": "schedule",
					"description": "Push notification to schedule.\n",
					"type": "Object",
					"required": true
				},
				{
					"name": "where",
					"description": "A JSON-encoded object that defines a location query used to select the devices that will receive the scheduled notification. Up to 1000 users can be returned by the query. To specify a location query, set the loc field to a [MongoDB Geospatial Query](http://docs.mongodb.org/manual/reference/operator/query-geospatial/)\n\nFor details about using the where parameter, see the [Search and Query guide](http://docs.appcelerator.com/arrowdb/latest/#!/guide/search_query).\n",
					"type": "Hash"
				},
				{
					"name": "pretty_json",
					"description": "Determines if the JSON response is formatted for readability (`true`), or displayed on a\nsingle line (`false`). Default is `false`.\n",
					"type": "Boolean"
				}
			]
		},
		"delete": {
			"summary": "Delete a scheduled push notification",
			"description": "Deletes a scheduled push notification. The current user must be an application admin to use this API. ",
			"authRequired": true,
			"instance": true,
			"adminRequired": true,
			"response": {
				"name": "push_schedules"
			},
			"parameters": [
				{
					"name": "ids",
					"description": "Array of push schedule IDs to delete.\n",
					"type": "Array"
				},
				{
					"name": "pretty_json",
					"description": "Determines if the JSON response is formatted for readability (`true`), or displayed on a\nsingle line (`false`). Default is `false`.\n",
					"type": "Boolean"
				}
			]
		},
		"query": {
			"summary": "Performs a custom query of scheduled Push Notifications",
			"description": "Queries the list of scheduled push notifications. The current logged-in user must be an application admin to use this API. In ArrowDB 1.1.5 and later, you can paginate query results using skip and limit parameters, or by including a where clause to limit the results to objects whose IDs fall within a specified range. For details, see [Query Pagination](http://docs.appcelerator.com/arrowdb/latest/#!/guide/search_query-section-query-pagination). ",
			"authRequired": true,
			"instance": true,
			"adminRequired": true,
			"response": {
				"name": "push_schedules"
			},
			"parameters": [
				{
					"name": "name",
					"description": "Name given to the scheduled push notification.\n",
					"type": "String"
				},
				{
					"name": "page",
					"description": "Note: Starting in ArrowDB 1.1.5, page and per_page are no longer supported in query operations. Applications should instead use skip and limit query parameters.\n",
					"type": "Number"
				},
				{
					"name": "per_page",
					"description": "Note: Starting in ArrowDB 1.1.5, page and per_page are no longer supported in query operations. Applications should instead use skip and limit query parameters.\n",
					"type": "Number"
				},
				{
					"name": "limit",
					"description": "The number of records to fetch. The value must be greater than 0, and no greater than 1000, or an HTTP 400 (Bad Request) error will be returned. Default value of limit is 10.\n",
					"type": "Number"
				},
				{
					"name": "skip",
					"description": "The number of records to skip. The value must be greater than or equal to 0, and no greater than 4999, or an HTTP 400 error will be returned. To skip 5000 records or more you need to perform a range-based query. See [Query Pagination](http://docs.appcelerator.com/arrowdb/latest/#!/guide/search_query-section-query-pagination) for more information.\n",
					"type": "Number"
				},
				{
					"name": "pretty_json",
					"description": "Determines if the JSON response is formatted for readability (`true`), or displayed on a\nsingle line (`false`). Default is `false`.\n",
					"type": "Boolean"
				}
			]
		},
		"update": {
			"summary": "Update a scheduled push notification",
			"description": "Updates a scheduled push notification. All parameters specified in the PushSchedules [create](http://docs.appcelerator.com/arrowdb/latest/#!/api/PushSchedules-method-create) method can be updated, with the following exceptions: * The schedule's start time cannot be updated, and the start_time parameter is ignored, if provided. * When specifying a new end_time parameter, the new date and time must be greater than the current time, and the previously specified end_time value must not have expired. The current user must be an application administrator to invoke the command. ",
			"authRequired": true,
			"instance": true,
			"adminRequired": true,
			"response": {
				"singleElement": true,
				"name": "push_schedules"
			},
			"parameters": [
				{
					"name": "schedule",
					"description": "Push notification to schedule.\n",
					"type": "Object",
					"required": true
				},
				{
					"name": "id",
					"description": "ID of the PushSchedule object returned by [create](http://docs.appcelerator.com/arrowdb/latest/#!/api/PushSchedules-method-create).\n",
					"type": "String",
					"required": true
				},
				{
					"name": "where",
					"description": "A JSON-encoded object that defines a location query used to select the devices that will receive the scheduled notification. Up to 1000 users can be returned by the query. To specify a location query, set the loc field to a [MongoDB Geospatial Query](http://docs.mongodb.org/manual/reference/operator/query-geospatial/).\n\nFor an example of using this parameter, see the REST examples in the PushSchedules [create](http://docs.appcelerator.com/arrowdb/latest/#!/api/PushSchedules-method-create) method. For details about using the where parameter, see the [Search and Query guide](http://docs.appcelerator.com/arrowdb/latest/#!/guide/search_query).\n",
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
				defaultValue.push_schedule_id = instance.getPrimaryKey();
				return defaultValue;
			case 'delete':
				return {
					push_schedule_id: instance.getPrimaryKey()
				};
		}
		return defaultValue;
	},

	actions: ["read", "create", "delete", "update"]
};