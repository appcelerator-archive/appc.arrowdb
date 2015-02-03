'use strict';

var Arrow = require("arrow");

/*
 The Events model.
 */
module.exports = Arrow.Model.extend("appc.acs/event", {
	/**
	 * Remove generated: true or set it to false if you want to prevent syncModels.js from changing this file.
	 */
	generated: true,
	/*
	 Fields for this model.
	 */
	fields: {
		"name": {
			// "originalType": "String",
			"type": String,
			"description": "Event name."
		},
		"start_time": {
			// "originalType": "Date",
			"type": Date,
			"description": "Event start time."
		},
		"duration": {
			// "originalType": "Number",
			"type": Number,
			"description": "Event duration, in seconds."
		},
		"created_at": {
			// "originalType": "Date",
			"type": Date,
			"description": "Event creation timestamp."
		},
		"updated_at": {
			// "originalType": "Date",
			"type": Date,
			"description": "Event modification timestamp."
		},
		"ical": {
			// "originalType": "String",
			"type": String,
			"description": "Event time and recurrence in iCalendar (RFC 5545) format."
		},
		"recurring": {
			// "originalType": "String",
			"type": String,
			"description": "Recurrence schedule. Can take the following values: \"daily\", \"weekly\", \"monthly\", or \"yearly\".\n"
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
		"details": {
			// "originalType": "String",
			"type": String,
			"description": "Description of the event."
		},
		"user": {
			// "originalType": "Users",
			"type": Array,
			"description": "Event owner."
		},
		"place": {
			// "originalType": "Places",
			"type": Array,
			"description": "Event location."
		},
		"photo": {
			// "originalType": "Photos",
			"type": Array,
			"description": "Primary photo for the event."
		},
		"tags": {
			// "originalType": "Array",
			"type": Array,
			"description": "Array of tags associated with this event.\n"
		},
		"custom_fields": {
			// "originalType": "Hash",
			"type": Object,
			"description": "User defined fields. See [Custom Data Fields](#!/guide/customfields)."
		},
		"acls": {
			// "originalType": "Array",
			"type": Array,
			"description": "Array of ACLs associated with this object.\n"
		}
	},
	/*
	 Methods for this model.
	 */
	methodMeta: {
		"batchDelete": {
			"summary": "Deletes multiple Events objects.",
			"description": "Deletes Events objects that match the query constraints provided in the `where` parameter.\nIf no `where` parameter is provided, all Events objects are deleted. \nNote that an HTTP 200 code (success)\nis returned if the call completed successfully but the query matched no objects.\n\nFor performance reasons, the number of objects that can be deleted in a single batch delete \noperation is limited to 100,000.\n\nThe matched objects are deleted asynchronously in a separate process.\n\nAny Place or Event associated with the matched objects are not deleted.        \n\nYou must be an application admin to run this command.        \n",
			"authRequired": true,
			"instance": true,
			"adminRequired": true,
			"response": {
				"singleElement": true
			},
			"parameters": [
				{
					"name": "where",
					"description": "Encoded JSON object that specifies constraint values for Events objects to delete.\nIf not specified, all Events objects are deleted.\n",
					"type": "Hash"
				}
			]
		},
		"create": {
			"summary": "",
			"description": "Create an event. Times given with time zones other than UTC (for example PST\nduring daylight savings is -0700) will be converted to UTC. An ical string\nwill be returned to represent the occurrences of the event.\n\nFor the event that is set as a recurring event, once created, there will be\nseveral \"event occurrences\" created associating with the event object on\nserver side, one \"event occurrence\" represents a single occurrence of the\nrecurring event. An \"event occurrence\" contains start and end time of the\nevent's occurrence which are calculated according to the \"recurring\" settings\nof the event object.\n\nInstead of computing actual individual occurrences of a recurring event on the\nclient side, you can use event occurrences query api to get a list of\noccurrences associated of a repeating event.\n\nTo get all occurrences for a recurring event object, you can call Events#show_occurrences\nevent occurrence](/docs/api/v1/events/show_occurrences) and pass in the\nevent's `id`.\n",
			"authRequired": true,
			"instance": true,
			"adminRequired": false,
			"response": {
				"singleElement": true
			},
			"parameters": [
				{
					"name": "name",
					"description": "Event name.",
					"type": "String",
					"required": true
				},
				{
					"name": "start_time",
					"description": "Event start time.",
					"type": "Date",
					"required": true
				},
				{
					"name": "details",
					"description": "Description of the event.",
					"type": "String"
				},
				{
					"name": "duration",
					"description": "Event duration, in seconds.",
					"type": "Number"
				},
				{
					"name": "recurring",
					"description": "Recurrance schedule. Can take the following values: \"daily\", \"weekly\", \"monthly\", or \"yearly\".\n\nMust be used together with `recurring_count` or `recurring_until` to limit the\nnumber of occurances. The total number of occurrences of an event in either\ncase is limited to 1000.\n",
					"type": "String"
				},
				{
					"name": "recurring_count",
					"description": "Number of occurrences for the event.",
					"type": "Number"
				},
				{
					"name": "recurring_until",
					"description": "Date of last recurrance.",
					"type": "Date"
				},
				{
					"name": "place_id",
					"description": "ID for the Places where the event takes place.",
					"type": "String"
				},
				{
					"name": "photo",
					"description": "New photo to attach as the primary photo for the event.\n\nWhen you use the `photo` parameter to attach a new photo, you can use the\n[custom resize and sync options](#!/guide/photosizes).\n",
					"type": "Photos"
				},
				{
					"name": "photo_id",
					"description": "ID of an existing photo to attach as the primary photo for the event.\n",
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
					"description": "Name of an ACLs to associate with this event.\n\nAn ACL can be specified using `acl_name` or `acl_id`. The two parameters are\nmutually exclusive.\n",
					"type": "String"
				},
				{
					"name": "acl_id",
					"description": "ID of an ACLs to associate with this event.\n\nAn ACL can be specified using `acl_name` or `acl_id`. The two parameters are\nmutually exclusive.\n",
					"type": "String"
				},
				{
					"name": "tags",
					"description": "Comma-separated list of tags associated with this event.",
					"type": "String"
				},
				{
					"name": "user_id",
					"description": "User ID to create the event on behalf of.\n\nThe current login user must be an application admin to create an event on\nbehalf of another user.\n",
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
			"summary": "Delete an Event",
			"description": "Delete the event with the given `id`. Only the original submitter can delete\nthe event.\n\nThe Place or Event associated with the object is not deleted.        \n\nApplication Admin can delete any Event object.\n",
			"authRequired": true,
			"instance": true,
			"adminRequired": false,
			"response": {
				"singleElement": true
			},
			"parameters": [
				{
					"name": "event_id",
					"description": "ID of the event to delete.",
					"type": "String",
					"required": true
				},
				{
					"name": "user_id",
					"description": "User to delete the Event object on behalf of. The user must be the creator of the object.\n\nThe current user must be an application admin to delete an Event object on\nbehalf of another user.\n",
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
			"summary": "Custom Query Events",
			"description": "Perform custom query of events with sorting and paginating. Currently you can\nnot query or sort data stored inside array or hash in custom fields.\n\nIn ACS 1.1.5 and later, you can paginate query results using `skip` and `limit` parameters, or by including\na `where` clause to limit the results to objects whose IDs fall within a specified range.\nFor details, see [Query Pagination](#!/guide/search_query-section-query-pagination).\n\nIn addition to the custom fields, you can query the following event fields:\n\n\n    \n        Name\n    Type\n        Summary\n    \n  \n    name\n    String\n    Event's name\n  \n  \n    user_id\n    String\n    Event owner's user ID\n  \n  \n    place_id\n    String\n    If an event belongs to a place, the associated place_id\n  \n  \n    tags_array\n    Array\n    Array of tags assigned to the Event.\n  \n  \n    start_time\n    Time\n    Start time of an event\n  \n  \n    num_occurences\n    Integer\n    Number of time the event repeats\n  \n  \n    lnglat\n    Geo location array - [longitude, latitude]\n    If an event belongs to a place, you can use lnglat to query events by place location\n  \n  \n    created_at\n    Date\n    Timestamp when the event was created\n  \n  \n    updated_at\n    Date\n    Timestamp when the event was last updated\n  \n\n\nFor details about using the query parameters,\nsee the [Search and Query guide](#!/guide/search_query).\n",
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
					"description": "\nStarting in ACS 1.1.5, page and per_page are no longer supported in query operations. \nApplications should instead use skip and limit \nquery parameters.\n\n\nThis parameter is only available to ACS applications created before ACS 1.1.5.\nApplications created with ACS 1.1.5 and later must use ranged-based queries queries\nto paginate their queries.\n",
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
					"description": "If set to **true**, each Event in the response includes `\"current_user_liked: true\"`\n if the current user has liked the object. If the current user has not liked the object, the\n`current_user_liked` field is not included in the response.\n",
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
		"queryOccurrences": {
			"summary": "Custom Query Event Occurrences",
			"description": "Perform custom query of event occurrences with sorting and paginating.\n\nCurrently, you can not query or sort data stored inside array or hash in custom\nfields.\n\nIn addition to custom fields, you can query the following fields:\n\n\n    \n        Name\n    Type\n        Summary\n    \n  \n    name\n    String\n    Event's name\n  \n  \n    user_id\n    String\n    Event owner's user id\n  \n  \n    place_id\n    String\n    If an event belongs to a place, the associated place_id\n  \n  \n    start_time\n    Time\n    Start time of an event occurrence\n  \n  \n    end_time\n    Time\n    End time of an event occurrence\n  \n  \n    lnglat\n    Geo location array - [longitude, latitude]\n    If an event belongs to a place, you can use lnglat to query events by place location\n  \n\n\nFor details about using the query parameters,\nsee the [Search and Query guide](#!/guide/search_query).\n",
			"authRequired": false,
			"instance": true,
			"adminRequired": false,
			"response": {
				"singleElement": true
			},
			"parameters": [
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
					"name": "limit",
					"description": "The number of records to fetch. The value must be greater than 0, and no greater than \n1000, or an HTTP 400 (Bad Request) error will be returned.\n",
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
				},
				{
					"name": "pretty_json",
					"description": "Determines if the JSON response is formatted for readability (`true`), or displayed on a\nsingle line (`false`). Default is `false`.\n",
					"type": "Boolean"
				}
			]
		},
		"search": {
			"summary": "",
			"description": "Full text search of events.\n\nOptionally, `latitude` and `longitude` can be given to return the list of\nevents starting from a particular location (location is retrieved from place\nif the event is associated with a place). To bound the results within a\ncertain radius (in km) from the starting coordinates, add the `distance`\nparameter. `q` can be given to search by event name.\n",
			"authRequired": false,
			"instance": true,
			"adminRequired": false,
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
					"name": "place_id",
					"description": "Restrict search results to events located in the identified Places.",
					"type": "String"
				},
				{
					"name": "user_id",
					"description": "Restrict search results to events owned by the identified Users.",
					"type": "String"
				},
				{
					"name": "latitude",
					"description": "Latitude of the search starting point.",
					"type": "Number"
				},
				{
					"name": "longitude",
					"description": "Longitude of the search starting point.",
					"type": "Number"
				},
				{
					"name": "distance",
					"description": "Maximum distance in km from the starting point identified by\n`longitude`, latitude`.\n",
					"type": "Number"
				},
				{
					"name": "start_time",
					"description": "Only return events that start on or after `start_time`.",
					"type": "Date"
				},
				{
					"name": "q",
					"description": "Space-separated list of keywords, used to perform full text search on event\nname and tags.\n",
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
		"searchOccurrences": {
			"summary": "Seach for Event Occurrences",
			"description": "Full text search of event occurrences.\n\nOptionally, `latitude` and `longitude` can be given to return the list of\nevent occurrences starting from a particular location (location is retrieved\nfrom place if the event is associated with a place). To bound the results\nwithin a certain radius (in km) from the starting coordinates, add the\n`distance` parameter. `q` can be given to search by event name.\n",
			"authRequired": false,
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
					"name": "place_id",
					"description": "Restrict search results to events located in the identified Places.",
					"type": "String"
				},
				{
					"name": "user_id",
					"description": "Restrict search results to events owned by the identified Users.",
					"type": "String"
				},
				{
					"name": "latitude",
					"description": "Latitude of the search starting point.",
					"type": "Number"
				},
				{
					"name": "longitude",
					"description": "Longitude of the search starting point.",
					"type": "Number"
				},
				{
					"name": "distance",
					"description": "Maximum distance in km from the starting point identified by\n`longitude`, latitude`.\n",
					"type": "Number"
				},
				{
					"name": "start_time",
					"description": "Only return events that start on or after `start_time`.",
					"type": "Date"
				},
				{
					"name": "end_time",
					"description": "Only return events that end on or before `end_time`.",
					"type": "Date"
				},
				{
					"name": "q",
					"description": "Space-separated list of keywords, used to perform full text search on event\nname and tags.\n",
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
		"show": {
			"summary": "Show Event",
			"description": "Show event(s) with the given IDs.\n",
			"authRequired": false,
			"instance": true,
			"adminRequired": false,
			"response": {
				"singleElement": true
			},
			"parameters": [
				{
					"name": "event_id",
					"description": "ID of the event to delete.\n\nEither `event_id` or `event_ids` must be specified.\n",
					"type": "String"
				},
				{
					"name": "event_ids",
					"description": "Comma-separated list of event IDs to show.",
					"type": "String"
				},
				{
					"name": "response_json_depth",
					"description": "Nested object depth level counts in response JSON.\n\nIn order to reduce server API calls from an application, the response JSON may\ninclude not just the identified objects, but also some important data related\nto the returning objects such as object's owner or referenced objects.\n\nDefault is 1, valid range is 1 to 8.\n",
					"type": "Number"
				},
				{
					"name": "show_user_like",
					"description": "If set to **true** the Event object in the response will include `\"current_user_liked: true\"`\nif the current user has liked the object. If the user has not liked the object, the \n`current_user_liked` field is not included in the response.\n",
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
			"summary": "Show Event Occurrences",
			"description": "Show the event occurrences of an event with the given `event_id`.\n",
			"authRequired": false,
			"instance": true,
			"adminRequired": false,
			"response": {
				"singleElement": true
			},
			"parameters": [
				{
					"name": "event_id",
					"description": "ID of the event to show occurrences of.",
					"type": "String",
					"required": true
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
		"update": {
			"summary": "",
			"description": "Update the event with the given `id`. Only the original submitter can update\nthe event.\n\nFor the event that is set as a recurring event, once created, there will be\nseveral \"event occurrences\" created associating with the event object on\nserver side, one \"event occurrence\" represents a single occurrence of the\nrecurring event. An \"event occurrence\" contains start and end time of the\nevent's occurrence which are calulated according to the \"recurring\" settings\nof the event object.\n\nInstead of computing actual individual occurrences of a recurring event on the\nclient side, you can use event occurrences query API to get a list of\noccurrences associated with a repeating event.\n\nTo get all \"event occurrence\" of an recurring event object, you can use\nEvents#show_occurrences with the event's `id`.\n\nAll the event occurrences will be recomputed if there is any change to the\nstart_time, duration and/or recurring.\n\nAn application admin can update any Event object.\n",
			"authRequired": true,
			"instance": true,
			"adminRequired": false,
			"response": {
				"singleElement": true
			},
			"parameters": [
				{
					"name": "event_id",
					"description": "ID of the event to update.",
					"type": "String",
					"required": true
				},
				{
					"name": "name",
					"description": "Updated event name.",
					"type": "String"
				},
				{
					"name": "start_time",
					"description": "Updated event start time.",
					"type": "Date"
				},
				{
					"name": "duration",
					"description": "Updated event duration, in seconds.",
					"type": "Number"
				},
				{
					"name": "recurring",
					"description": "New recurrance schedule. Can take the following values: \"daily\", \"weekly\", \"monthly\", or \"yearly\".\n",
					"type": "String"
				},
				{
					"name": "recurring_count",
					"description": "Updated number of occurrences for the event.",
					"type": "Number"
				},
				{
					"name": "recurring_until",
					"description": "Updated date of last recurrance.",
					"type": "Date"
				},
				{
					"name": "details",
					"description": "Updated description of the event.",
					"type": "String"
				},
				{
					"name": "place_id",
					"description": "ID of the place where this event takes place.",
					"type": "String"
				},
				{
					"name": "photo",
					"description": "New photo to assign as the event's primary photo.\n\nWhen you use `photo` parameter to attach a new photo, you can use it with\n[custom resize and sync options](/docs/photosizes)\n\nTo remove primary photo, simply set \"photo=\" or \"photo_id=\". If the original\nphoto was created by using `photo` parameter, the photo will be deleted.\n",
					"type": "Photos"
				},
				{
					"name": "photo_id",
					"description": "ID of an existing photo to use as the event's primary photo.\n\nTo remove primary photo, simply set \"photo=\" or \"photo_id=\". If the original\nphoto was created by using `photo` parameter, the photo will be deleted.\n",
					"type": "String"
				},
				{
					"name": "tags",
					"description": "Comma-separated list of tags associated with this event.",
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
					"name": "user_id",
					"description": "User to update the Event object on behalf of. The user must be the creator of the object.\n\nThe current user must be an application admin to update the Event object on\nbehalf of another user.\n",
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
	}
});
