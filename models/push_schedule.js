'use strict';

var APIBuilder = require("apibuilder");

/*
 The PushSchedules model.
 */
module.exports = APIBuilder.Model.extend("push_schedule", {
	/**
	 * Remove generated: true or set it to false if you want to prevent syncModels.js from changing this file.
	 */
	generated: true,
	/*
	 Fields for this model.
	 */
	fields: {
		"start_time": {
			// "originalType": "Date",
			"type": Date,
			"description": "Datetime to start the scheduled push notification in ISO 8601 format."
		},
		"name": {
			// "originalType": "String",
			"type": String,
			"description": "Arbitrary name for the scheduled push notification."
		},
		"push_notification": {
			// "originalType": "Hash",
			"type": Object,
			"description": "Push notification to send for scheduled pushes.\n\n  * *channel* (String): Name of the channel to send the push notification to.\n    The name of the push channel cannot start with a hash symbol ('#').\n  * *payload* (Hash): Payload to send to the device. Same format as PushNotifications#notify.\n  * *to_ids* (Array/String): Array or comma-separated list of IDs to send push notifications to.\n  * *options* (Hash): Dictionary of additional options\n      * *expire_after_seconds* (Number): Expiration time in seconds of when to stop\n        sending the push notification based on the start date. For example, if the push\n        notification is scheduled to be sent in a week and the expiration time is for a\n        day. The push expires in eight days and will not be sent if the user's device\n        has been off before the send day and after the end of the expiration period.\n"
		},
		"recurrence": {
			// "originalType": "Hash",
			"type": Object,
			"description": "Schedules the recurrence of the push notification.\n\n  * *interval* (Number/String): Value in minutes to repeat the notification or `daily`, `weekly` or `monthly`.\n  * *end_time* (Date): Datetime to end the push notifications in ISO 8601 format. Must occur after `start_time`.\n"
		}
	},
	/*
	 Methods for this model.
	 */
	methodMeta: {
		"create": {
			"summary": "create",
			"description": "Creates a scheduled push notification.  At minimum, you must specify the `start_time`,\nand `payload` parameters. A push schedule can optionally define a location query so that\nonly devices in the specified geographic region will receive the push notification.\n\nThis feature is only available for Enterprise users, and the current user must be an application admin.\n",
			"authRequired": true,
			"instance": true,
			"adminRequired": true,
			"response": {
				"singleElement": true
			},
			"parameters": [
				{
					"name": "schedule",
					"description": "Push notification to schedule.",
					"type": "PushSchedulePayload",
					"required": true
				},
				{
					"name": "where",
					"description": "A JSON-encoded object that defines a location query used to select the devices\nthat will receive the scheduled notification. Up to 1000 users can be returned by the query. To specify a location query, set the `loc` field to a\n[MongoDB Geospatial Query](http://docs.mongodb.org/manual/reference/operator/query-geospatial/).\nThe following query searches for all users within 2 km of Oakland, CA, USA:\n\n    where={\n      \"loc\": {\n        \"$nearSphere\" : { \n          \"$geometry\" : { \n            \"type\" : \"Point\" , \n            \"coordinates\" : [-122.2708,37.8044] } , \n            \"$maxDistance\" : 2000 \n          }\n        }\n      }\n\nFor details about using the `where` parameter, see the [Search and Query guide](#!/guide/search_query).\n",
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
			"summary": "delete",
			"description": "Deletes a scheduled push notification.\n\nThis feature is only available for Enterprise users.\n\nThe current user must be an application admin.\n",
			"authRequired": true,
			"instance": true,
			"adminRequired": true,
			"response": {
				"singleElement": true
			},
			"parameters": [
				{
					"name": "ids",
					"description": "Array of push schedule IDs to delete.",
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
			"summary": "query",
			"description": "Queries the list of scheduled push notifications.\n\nThis feature is only available for Enterprise users, and the current logged-in user must be an \napplication admin.\n\nIn ACS 1.1.5 and later, you can paginate query results using `skip` and `limit` parameters, or by including\na `where` clause to limit the results to objects whose IDs fall within a specified range.\nFor details, see [Query Pagination](#!/guide/search_query-section-query-pagination).\n",
			"authRequired": true,
			"instance": true,
			"adminRequired": true,
			"parameters": [
				{
					"name": "name",
					"description": "Name given to the scheduled push notification.",
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
					"name": "pretty_json",
					"description": "Determines if the JSON response is formatted for readability (`true`), or displayed on a\nsingle line (`false`). Default is `false`.\n",
					"type": "Boolean"
				}
			]
		},
		"update": {
			"summary": "update",
			"description": "Updates a scheduled push notification. All parameters specified in the PushSchedules \nPushSchedules#create method can be updated, with the following exceptions:\n\n  * The schedule's start time cannot be updated, and the `start_time` parameter is ignored, if provided.\n  * When specifying a new `end_time` parameter, the new date and time must be greater than \n    the current time, and the previously specified `end_time` value must not have expired.\n\nThis feature is only available for Enterprise users. Also, the current user must be an \napplication administrator to invoke the command.\n",
			"authRequired": true,
			"instance": true,
			"adminRequired": true,
			"response": {
				"singleElement": true
			},
			"parameters": [
				{
					"name": "schedule",
					"description": "Push notification to schedule.",
					"type": "PushSchedulePayload",
					"required": true
				},
				{
					"name": "id",
					"description": "ID of the PushSchedule object returned by PushSchedules#create.\n",
					"type": "String",
					"required": true
				},
				{
					"name": "where",
					"description": "\nA JSON-encoded object that defines a location query used to select the devices\nthat will receive the scheduled notification. Up to 1000 users can be returned by the query. To specify a location query, set the `loc` field to a\n[MongoDB Geospatial Query](http://docs.mongodb.org/manual/reference/operator/query-geospatial/).\nThe following query searches for all users within 2 km of Oakland, CA, USA:\n\n    where={\n      \"loc\": {\n        \"$nearSphere\" : { \n          \"$geometry\" : { \n            \"type\" : \"Point\" , \n            \"coordinates\" : [-122.2708,37.8044] } , \n            \"$maxDistance\" : 2000 \n          }\n        }\n      }\n\nFor an example of using this parameter, see the REST examples in the PushSchedules PushSchedules#create method.\nFor details about using the `where` parameter, see the [Search and Query guide](#!/guide/search_query).\n",
					"type": "Hash"
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
				defaultValue.push_schedule_id = instance.getPrimaryKey();
				return defaultValue;
			case 'delete':
				return {
					push_schedule_id: instance.getPrimaryKey()
				};
		}
		return defaultValue;
	}
});
