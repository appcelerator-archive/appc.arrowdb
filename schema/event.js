'use strict';

/*
 The Events model.
 */
module.exports = {
	name: 'event',
	objectName: 'Events',

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
		"acls": {
			// "originalType": "ACLs",
			"type": Array,
			"description": "Array of ACLs associated with this object."
		},
		"created_at": {
			// "originalType": "Date",
			"type": Date,
			"description": "Event creation timestamp."
		},
		"custom_fields": {
			// "originalType": "Hash",
			"type": Object,
			"description": "User defined fields. See Custom Data Fields.[See Custom Data Fields.](http://docs.appcelerator.com/arrowdb/latest/#!/guide/customfields)"
		},
		"details": {
			// "originalType": "String",
			"type": String,
			"description": "Description of the event."
		},
		"duration": {
			// "originalType": "Number",
			"type": Number,
			"description": "Event duration, in seconds."
		},
		"ical": {
			// "originalType": "String",
			"type": String,
			"description": "Event time and recurrence in iCalendar (RFC 5545) format."
		},
		"name": {
			// "originalType": "String",
			"type": String,
			"description": "Event name."
		},
		"photo": {
			// "originalType": "Photos",
			"type": Array,
			"description": "Primary photo for the event."
		},
		"place": {
			// "originalType": "Place",
			"type": Array,
			"description": "ID of the Place object associated with the event."
		},
		"recurring": {
			// "originalType": "String",
			"type": String,
			"description": "Recurrence schedule. Can take the following values: \"daily\", \"weekly\", \"monthly\", or \"yearly\"."
		},
		"recurring_count": {
			// "originalType": "Number",
			"type": Number,
			"description": "Number of occurrences for the event."
		},
		"recurring_until": {
			// "originalType": "Date",
			"type": Date,
			"description": "Date of last recurrence."
		},
		"start_time": {
			// "originalType": "Date",
			"type": Date,
			"description": "Event start time."
		},
		"tags": {
			// "originalType": "Array",
			"type": Array,
			"description": "Array of tags associated with this event."
		},
		"updated_at": {
			// "originalType": "Date",
			"type": Date,
			"description": "Event modification timestamp."
		},
		"user": {
			// "originalType": "Users",
			"type": Array,
			"description": "Event owner."
		}
	},
	/*
	 Methods for this model.
	 */
	methodMeta: {
		"batchDelete": {
			"summary": "Deletes Events objects",
			"description": "Deletes Events objects that match the query constraints provided in the where parameter. If no where parameter is provided, all Events objects are deleted. Note that an HTTP 200 code (success) is returned if the call completed successfully but the query matched no objects. For performance reasons, the number of objects that can be deleted in a single batch delete operation is limited to 100,000. The matched objects are deleted asynchronously in a separate process. Any [Place](http://docs.appcelerator.com/arrowdb/latest/#!/api/Events-property-place) associated with the matched objects are not deleted. You must be an application admin to run this command. ",
			"authRequired": true,
			"instance": true,
			"adminRequired": false,
			"parameters": [
				{
					"name": "where",
					"description": "Encoded JSON object that specifies constraint values for Events objects to delete. If not specified, all Events objects are deleted.\n",
					"type": "Hash"
				}
			]
		},
		"create": {
			"summary": "Create an Event",
			"description": "Create an event. Times given with time zones other than UTC (for example PST during daylight savings is -0700) will be converted to UTC. An ical string will be returned to represent the occurrences of the event. For the event that is set as a recurring event, once created, there will be several \"event occurrences\" created associating with the event object on server side, one \"event occurrence\" represents a single occurrence of the recurring event. An \"event occurrence\" contains start and end time of the event's occurrence which are calculated according to the \"recurring\" settings of the event object. Instead of computing actual individual occurrences of a recurring event on the client side, you can use event occurrences query api to get a list of occurrences associated of a repeating event. To get all occurrences for a recurring event object, you can call [show_occurrences](http://docs.appcelerator.com/arrowdb/latest/#!/api/Events-method-show_occurrences) event occurrence](/docs/api/v1/events/show_occurrences) and pass in the event's id. ",
			"authRequired": true,
			"instance": true,
			"adminRequired": false,
			"response": {
				"singleElement": true
			},
			"parameters": [
				{
					"name": "name",
					"description": "Event name.\n",
					"type": "String",
					"required": true
				},
				{
					"name": "start_time",
					"description": "Event start time.\n",
					"type": "Date",
					"required": true
				},
				{
					"name": "details",
					"description": "Description of the event.\n",
					"type": "String"
				},
				{
					"name": "recurring",
					"description": "Recurrance schedule. Can take the following values: \"daily\", \"weekly\", \"monthly\", or \"yearly\".\n\nMust be used together with recurring_count or recurring_until to limit the number of occurances. The total number of occurrences of an event in either case is limited to 1000.\n",
					"type": "String"
				},
				{
					"name": "recurring_count",
					"description": "Number of occurrences for the event.\n",
					"type": "Number"
				},
				{
					"name": "recurring_until",
					"description": "Date of last recurrance.\n",
					"type": "Date"
				},
				{
					"name": "place_id",
					"description": "ID for the [Places](http://docs.appcelerator.com/arrowdb/latest/#!/api/Places) where the event takes place.\n",
					"type": "String"
				},
				{
					"name": "photo",
					"description": "New photo to attach as the primary photo for the event.\n\nWhen you use the photo parameter to attach a new photo, you can use the [custom resize and sync options](http://docs.appcelerator.com/arrowdb/latest/#!/guide/photosizes).\n",
					"type": "Photos"
				},
				{
					"name": "photo_id",
					"description": "ID of an existing photo to attach as the primary photo for the event.\n",
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
					"name": "acl_name",
					"description": "Name of an [ACLs](http://docs.appcelerator.com/arrowdb/latest/#!/api/ACLs) to associate with this event.\n\nAn ACL can be specified using acl_name or acl_id. The two parameters are mutually exclusive.\n",
					"type": "String"
				},
				{
					"name": "acl_id",
					"description": "ID of an [ACLs](http://docs.appcelerator.com/arrowdb/latest/#!/api/ACLs) to associate with this event.\n\nAn ACL can be specified using acl_name or acl_id. The two parameters are mutually exclusive.\n",
					"type": "String"
				},
				{
					"name": "tags",
					"description": "Comma-separated list of tags associated with this event.\n",
					"type": "String"
				},
				{
					"name": "su_id",
					"description": "User ID to create the event on behalf of.\n\nThe current login user must be an application admin to create an event on behalf of another user.\n",
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
			"summary": "Delete an Events object",
			"description": "Delete the event with the given id. Only the original submitter can delete the event. The [Place](http://docs.appcelerator.com/arrowdb/latest/#!/api/Events-property-place) associated with the object is not deleted. Application Admin can delete any Event object. ",
			"authRequired": true,
			"instance": true,
			"adminRequired": false,
			"response": {
				"singleElement": true
			},
			"parameters": [
				{
					"name": "event_id",
					"description": "ID of the event to delete.\n",
					"type": "String",
					"required": true
				},
				{
					"name": "su_id",
					"description": "User to delete the Event object on behalf of. The user must be the creator of the object.\n\nThe current user must be an application admin to delete an Event object on behalf of another user.\n",
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
			"summary": "Performs a custom query of Events",
			"description": "Perform custom query of events with sorting and paginating. Currently you can not query or sort data stored inside array or hash in custom fields.\n\nIn ArrowDB 1.1.5 and later, you can paginate query results using skip and limit parameters, or by including a where clause to limit the results to objects whose IDs fall within a specified range. For details, see [Query Pagination](http://docs.appcelerator.com/arrowdb/latest/#!/guide/search_query-section-query-pagination). For details about using the query parameters, see the [Search and Query guide](http://docs.appcelerator.com/arrowdb/latest/#!/guide/search_query). ",
			"authRequired": false,
			"instance": true,
			"adminRequired": false,
			"parameters": [
				{
					"name": "page",
					"description": "Note: Starting in ArrowDB 1.1.5, page and per_page are no longer supported in query operations. Applications should instead use skip and limit query parameters.\n",
					"type": "Number"
				},
				{
					"name": "per_page",
					"description": "Note: Starting in ArrowDB 1.1.5, page and per_page are no longer supported in query operations. Applications should instead use skip and limit query parameters.\n\nNote: This parameter is only available to ArrowDB applications created before ArrowDB 1.1.5. Applications created with ArrowDB 1.1.5 and later must use [ranged-based queries](http://docs.appcelerator.com/arrowdb/latest/#!/guide/search_query-section-query-pagination) queries to paginate their queries.\n",
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
					"name": "where",
					"description": "Constraint values for fields. where should be encoded JSON.\n\nIf where is not specified, query returns all objects.\n",
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
					"name": "show_user_like",
					"description": "If set to true, each Event in the response includes \"current_user_liked: true\" if the current user has liked the object. If the current user has not liked the object, the current_user_liked field is not included in the response.\n",
					"type": "Boolean"
				},
				{
					"name": "unsel",
					"description": "Nested object depth level counts in response json. In order to reduce server API calls from an application, the response json may include not just the objects that are being queried/searched, but also with some important data related to the returning objects such as object's owner or referencing objects.\n\nDefault is 1, valid range is 1 to 8.\n",
					"type": "Number"
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
		"queryOccurrences": {
			"summary": "Perform custom query of Event occurrences",
			"description": "Perform custom query of event occurrences with sorting and paginating. Currently, you can not query or sort data stored inside array or hash in custom fields. For details about using the query parameters, see the [Search and Query guide](http://docs.appcelerator.com/arrowdb/latest/#!/guide/search_query). ",
			"authRequired": false,
			"instance": true,
			"adminRequired": false,
			"response": {
				"model": "eventOccurrence",
				"name": "event_occurrences"
			},
			"parameters": [
				{
					"name": "page",
					"description": "Note: Request page number, default is 1.\n\nThis parameter is only available to ArrowDB applications created before ArrowDB 1.1.5. Applications created with ArrowDB 1.1.5 and later must use ranged-based queries queries to paginate their queries.\n",
					"type": "Number"
				},
				{
					"name": "Note: per_page",
					"description": "Number of results per page, default is 10.\n\nThis parameter is only available to ArrowDB applications created before ArrowDB 1.1.5. Applications created with ArrowDB 1.1.5 and later must use ranged-based queries queries to paginate their queries.\n",
					"type": "Number"
				},
				{
					"name": "limit",
					"description": "The number of records to fetch. The value must be greater than 0, and no greater than 1000, or an HTTP 400 (Bad Request) error will be returned.\n",
					"type": "Number"
				},
				{
					"name": "skip",
					"description": "Number of records to skip. Must be used together with limit. The specified value must not be less than 0 or an HTTP 400 error will be returned.\n",
					"type": "Number"
				},
				{
					"name": "where",
					"description": "Constraint values for fields. where should be encoded JSON.\n\nIf where is not specified, query returns all objects.\n",
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
					"description": "Selects the object fields NOT to display. Do not use this parameter with sel.\n",
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
		"show": {
			"summary": "Show Events",
			"description": "Show event(s) with the given IDs. ",
			"authRequired": false,
			"instance": true,
			"adminRequired": false,
			"parameters": [
				{
					"name": "event_id",
					"description": "ID of the event to delete.\n\nEither event_id or event_ids must be specified.\n",
					"type": "String"
				},
				{
					"name": "event_ids",
					"description": "Comma-separated list of event IDs to show.\n",
					"type": "String"
				},
				{
					"name": "response_json_depth",
					"description": "Nested object depth level counts in response JSON.\n\nIn order to reduce server API calls from an application, the response JSON may include not just the identified objects, but also some important data related to the returning objects such as object's owner or referenced objects.\n\nDefault is 1, valid range is 1 to 8.\n",
					"type": "Number"
				},
				{
					"name": "show_user_like",
					"description": "If set to true the Event object in the response will include \"current_user_liked: true\" if the current user has liked the object. If the user has not liked the object, the current_user_liked field is not included in the response.\n",
					"type": "Boolean"
				},
				{
					"name": "pretty_json",
					"description": "Determines if the JSON response is formatted for readability (`true`), or displayed on a\nsingle line (`false`). Default is `false`.\n",
					"type": "Boolean"
				}
			]
		},
		"showOccurrences": {
			"summary": "Show the Event occurrences",
			"description": "Show the event occurrences of an event with the given event_id. ",
			"authRequired": false,
			"instance": true,
			"adminRequired": false,
			"response": {
				"model": "event",
				"name": "event_occurrences"
			},
			"parameters": [
				{
					"name": "event_id",
					"description": "ID of the event to show occurrences of.\n",
					"type": "String",
					"required": true
				},
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
		"update": {
			"summary": "Update an Event",
			"description": "Update the event with the given id. Only the original submitter can update the event. For the event that is set as a recurring event, once created, there will be several \"event occurrences\" created associating with the event object on server side, one \"event occurrence\" represents a single occurrence of the recurring event. An \"event occurrence\" contains start and end time of the event's occurrence which are calulated according to the \"recurring\" settings of the event object. Instead of computing actual individual occurrences of a recurring event on the client side, you can use event occurrences query API to get a list of occurrences associated with a repeating event. To get all \"event occurrence\" of an recurring event object, you can use show_occurrences with the event's id. All the event occurrences will be recomputed if there is any change to the start_time, duration and/or recurring. An application admin can update any Event object. ",
			"authRequired": true,
			"instance": true,
			"adminRequired": false,
			"response": {
				"singleElement": true
			},
			"parameters": [
				{
					"name": "event_id",
					"description": "ID of the event to update.\n",
					"type": "String",
					"required": true
				},
				{
					"name": "name",
					"description": "Updated event name.\n",
					"type": "String"
				},
				{
					"name": "start_time",
					"description": "Updated event start time.\n",
					"type": "Date"
				},
				{
					"name": "duration",
					"description": "Updated event duration, in seconds.\n",
					"type": "Number"
				},
				{
					"name": "recurring",
					"description": "New recurrance schedule. Can take the following values: \"daily\", \"weekly\", \"monthly\", or \"yearly\".\n",
					"type": "String"
				},
				{
					"name": "recurring_count",
					"description": "Updated number of occurrences for the event.\n",
					"type": "Number"
				},
				{
					"name": "recurring_until",
					"description": "Updated date of last recurrance.\n",
					"type": "Date"
				},
				{
					"name": "details",
					"description": "Updated description of the event.\n",
					"type": "String"
				},
				{
					"name": "place_id",
					"description": "ID of the place where this event takes place.\n",
					"type": "String"
				},
				{
					"name": "photo",
					"description": "New photo to assign as the event's primary photo.\n\nWhen you use photo parameter to attach a new photo, you can use it with [custom resize and sync options](http://docs.appcelerator.com/docs/photosizes)\n\nTo remove primary photo, simply set \"photo=\" or \"photo_id=\". If the original photo was created by using photo parameter, the photo will be deleted.\n",
					"type": "Photos"
				},
				{
					"name": "photo_id",
					"description": "ID of an existing photo to use as the event's primary photo.\n\nTo remove primary photo, simply set \"photo=\" or \"photo_id=\". If the original photo was created by using photo parameter, the photo will be deleted.\n",
					"type": "String"
				},
				{
					"name": "tags",
					"description": "Comma-separated list of tags associated with this event.\n",
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
					"name": "acl_name",
					"description": "Name of an [ACLs](http://docs.appcelerator.com/arrowdb/latest/#!/api/ACLs) to associate with this checkin object.\n\nAn ACL can be specified using acl_name or acl_id. The two parameters are mutually exclusive.\n",
					"type": "String"
				},
				{
					"name": "acl_id",
					"description": "ID of an [ACLs](http://docs.appcelerator.com/arrowdb/latest/#!/api/ACLs) to associate with this checkin object.\n\nAn ACL can be specified using acl_name or acl_id. The two parameters are mutually exclusive.\n",
					"type": "String"
				},
				{
					"name": "su_id",
					"description": "User to update the Event object on behalf of. The user must be the creator of the object.\n\nThe current user must be an application admin to update the Event object on behalf of another user.\n",
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
				defaultValue.event_id = instance.getPrimaryKey();
				return defaultValue;
			case 'delete':
				return {
					event_id: instance.getPrimaryKey()
				};
		}
		return defaultValue;
	},

	actions: ["read", "create", "delete", "update"]
};