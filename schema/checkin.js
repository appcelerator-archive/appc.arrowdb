'use strict';

/*
 The Checkins model.
 */
module.exports = {
    name: 'checkin',
    objectName: 'Checkins',

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
    visible: true,

	/*
	 Fields for this model.
	 */
    fields: {
        "created_at": {
            // "originalType": "Date",
            "type": Date,
            "description": "Message creation date."
        },
        "custom_fields ": {
            // "originalType": "String/Hash",
            "type": Object,
            "description": "User defined fields. See [Custom Data Fields](http://docs.appcelerator.com/arrowdb/latest/#!/guide/customfields)."
        },
        "event_id": {
            // "originalType": "String",
            "type": String,
            "description": "ID of the the event object associated with the checkin."
        },
        "message": {
            // "originalType": "String",
            "type": String,
            "description": "Checkin message."
        },
        "photo": {
            // "originalType": "Photos",
            "type": Array,
            "description": "The primary photo for the checkin."
        },
        "place_id": {
            // "originalType": "String",
            "type": String,
            "description": "ID of the place object associated with the checkin."
        },
        "tags": {
            // "originalType": "String",
            "type": String,
            "description": "Comma-separated list of tags associated with this checkin."
        },
        "updated_at": {
            // "originalType": "Date",
            "type": Date,
            "description": "Message update date."
        },
        "user": {
            // "originalType": "Users",
            "type": Array,
            "description": "Checkin owner."
        }
    },
	/*
	 Methods for this model.
	 */
    methodMeta: {
        "show": {
            "summary": "Show an Checkin",
            "description": "Returns the contents of the identified checkin. ",
            "authRequired": false,
            "instance": true,
            "adminRequired": false,
            "response": {
                "singleElement": true
            },
            "parameters": [
                {
                    "name": "checkin_id",
                    "description": "ID of the checkin to show.\n",
                    "type": "String",
                    "required": true
                },
                {
                    "name": "response_json_depth",
                    "description": "Nested object depth level counts in response json. In order to reduce server API calls from an application, the response json may include not just the objects that are being queried/searched, but also with some important data related to the returning objects such as object's owner or referencing objects.\n",
                    "type": "Number"
                },
                {
                    "name": "show_user_like",
                    "description": "If set to true the Checkin object in the response will include \"current_user_liked: true\" if the current user has liked the object. If the user has not liked the object, the current_user_liked field is not included in the response.\n",
                    "type": "Boolean"
                },
                {
                    "name": "pretty_json",
                    "description": "Determines if the JSON response is formatted for readability (`true`), or displayed on a\nsingle line (`false`). Default is `false`.\n",
                    "type": "Boolean"
                }
            ]
        },
        "query": {
            "summary": "Performs a custom query of Checkins",
            "description": "Performs a custom query of checkins with sorting and pagination. Currently you can not query or sort data stored inside array or hash in custom fields. In ArrowDB 1.1.5 and later, you can paginate query results using skip and limit parameters, or by including a where clause to limit the results to objects whose IDs fall within a specified range. For details, see [Query Pagination](http://docs.appcelerator.com/arrowdb/latest/#!/guide/search_query-section-query-pagination).\n\nFor details about using the query parameters, see the [Search and Query guide](http://docs.appcelerator.com/arrowdb/latest/#!/guide/search_query). ",
            "authRequired": false,
            "instance": true,
            "adminRequired": false,
            "parameters": [
                {
                    "name": "page",
                    "description": "Request page number, default is 1.\n\nNote: This parameter is only available to ArrowDB applications created before ArrowDB 1.1.5. Applications created with ArrowDB 1.1.5 and later must use [ranged-based queries](http://docs.appcelerator.com/arrowdb/latest/#!/guide/search_query-section-query-pagination) queries to paginate their queries.\n",
                    "type": "Number"
                },
                {
                    "name": "per_page",
                    "description": "Number of results per page, default is 10.\n\nNote: This parameter is only available to ArrowDB applications created before ArrowDB 1.1.5. Applications created with ArrowDB 1.1.5 and later must use [ranged-based queries](http://docs.appcelerator.com/arrowdb/latest/#!/guide/search_query-section-query-pagination) queries to paginate their queries.\n",
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
                    "description": "Constraint values for fields. where should be encoded JSON.\nIf where is not specified, query returns all objects.\n",
                    "type": "Hash"
                },
                {
                    "name": "order",
                    "description": "Sort results by one or more fields.\n",
                    "type": "String"
                },
                {
                    "name": "sel",
                    "description": "Selects the object fields to display. Do not use this parameter with unsel.\n. For example:\n\nsel={\"all\":[\"username\",\"first_name\",\"confirmed_at\"]}\n\nNote: you need to use \"all\" then a list of fields you wan to sel as it applies to the nested json.\n",
                    "type": "Hash"
                },
                {
                    "name": "show_user_like",
                    "description": "f set to true, each Checkin object in the response includes \"current_user_liked: true\" if the current user has liked the object. If the user has not liked the object, the current_user_liked` field is not included in the response.\n",
                    "type": "Boolean"
                },
                {
                    "name": "unsel",
                    "description": "Selects the object fields NOT to display. Do not use this parameter with sel. For example:\n\nunsel={\"all\":[\"username\",\"first_name\",\"admin\"]}\n",
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
        "create": {
            "summary": "Create a Checkin",
            "description": "Creates a checkin associated with either a [Places](http://docs.appcelerator.com/arrowdb/latest/#!/api/Places) or [Events](http://docs.appcelerator.com/arrowdb/latest/#!/api/Events) object. You should specify either a Places or Events object, but not both. If both are provided, the Places object will be used. A checkin message is optional. The optional photo parameter contains the binary data stream representing the photo included with the checkin. If a photo is included, the response includes a \"processed\" flag which indicates if the photo has been resized and stored reliably in the Appcelerator Cloud Services storage engine. This will be false initially be false. ",
            "authRequired": true,
            "instance": true,
            "adminRequired": false,
            "response": {
                "singleElement": true
            },
            "parameters": [
                {
                    "name": "place_id",
                    "description": "ID of the [Places](http://docs.appcelerator.com/arrowdb/latest/#!/api/Places) to check in to.\n\nYou can associate a checkin with either a [Places](http://docs.appcelerator.com/arrowdb/latest/#!/api/Places) or [Events](http://docs.appcelerator.com/arrowdb/latest/#!/api/Events) object but not both.\n",
                    "type": "String"
                },
                {
                    "name": "event_id",
                    "description": "ID of the [Events](http://docs.appcelerator.com/arrowdb/latest/#!/api/Events) to check in to.\n\nYou can associate a checkin with either a [Places](http://docs.appcelerator.com/arrowdb/latest/#!/api/Places) or [Events](http://docs.appcelerator.com/arrowdb/latest/#!/api/Events) object but not both.\n",
                    "type": "String"
                },
                {
                    "name": "message",
                    "description": "Message to attach to the checkin.\n",
                    "type": "String"
                },
                {
                    "name": "photo",
                    "description": "New photo to attach as the primary photo for the checkin.\n\nWhen you use the photo parameter to attach a new photo, you can use the [custom resize and sync options](http://docs.appcelerator.com/arrowdb/latest/#!/guide/photosizes).\n",
                    "type": "Array"
                },
                {
                    "name": "photo_id",
                    "description": "ID of an existing photo to attach as the primary photo for the checkin.\n",
                    "type": "String"
                },
                {
                    "name": "tags",
                    "description": "Comma separated list of tags for this checkin.\n",
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
                    "description": "User ID to create the checkin on behalf of.\nThe current login user must be an application admin to create a checkin on behalf of another user.\n",
                    "type": "String"
                },
                {
                    "name": "response_json_depth",
                    "description": "Nested object depth level counts in response json.\nIn order to reduce server API calls from an application, the JSON response may include not just the objects that are being queried/searched, but also important data related to the queried objects, such as the object's owner or referencing objects.\nDefault depth is 1. Valid values are 1-8.\n",
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
            "summary": "Delete a Checkin",
            "description": "Deletes a checkin. The [Place](http://docs.appcelerator.com/arrowdb/latest/#!/api/Checkins-property-place), [Event](http://docs.appcelerator.com/arrowdb/latest/#!/api/Checkins-property-event), or [Photo](http://docs.appcelerator.com/arrowdb/latest/#!/api/Checkins-property-photo) associated with the checkin is not deleted. An application admin can delete any Checkin object. ",
            "authRequired": true,
            "instance": true,
            "adminRequired": false,
            "response": {
                "singleElement": true
            },
            "parameters": [
                {
                    "name": "checkin_id ",
                    "description": "ID of the checkin to delete.\n",
                    "type": "String",
                    "required": true
                },
                {
                    "name": "su_id",
                    "description": "Determines if the JSON response is formatted for readability (true), or displayed on a single line (false). Default is false.\n",
                    "type": "String"
                },
                {
                    "name": "pretty_json",
                    "description": "Determines if the JSON response is formatted for readability (`true`), or displayed on a\nsingle line (`false`). Default is `false`.\n",
                    "type": "Boolean"
                }
            ]
        },
        "update": {
            "summary": "Update a Checkin",
            "description": "Updates a checkin for the currenty logged in user. Application admins can update another user's checkin on their behalf by including the su_id field in the request. ",
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
                    "description": "ID of the [Places](http://docs.appcelerator.com/arrowdb/latest/#!/api/Places) to check in to.\n\nYou can associate a checkin with either a [Places](http://docs.appcelerator.com/arrowdb/latest/#!/api/Places) or [Events](http://docs.appcelerator.com/arrowdb/latest/#!/api/Events) object but not both.\n",
                    "type": "String"
                },
                {
                    "name": "event_id",
                    "description": "ID of the [Events](http://docs.appcelerator.com/arrowdb/latest/#!/api/Events) to check in to.\n\nYou can associate a checkin with either a [Places](http://docs.appcelerator.com/arrowdb/latest/#!/api/Places) or [Events](http://docs.appcelerator.com/arrowdb/latest/#!/api/Events) object but not both.\n",
                    "type": "String"
                },
                {
                    "name": "message",
                    "description": "Message to attach to the checkin.\n",
                    "type": "String"
                },
                {
                    "name": "photo",
                    "description": "New [Photos](http://docs.appcelerator.com/arrowdb/latest/#!/api/Photos) object to attach as the primary photo for the checkin.When you use the photo parameter to attach a new photo, you can use the [custom resize and sync options](http://docs.appcelerator.com/arrowdb/latest/#!/guide/photosizes.\n",
                    "type": "Array"
                },
                {
                    "name": "photo_id",
                    "description": "ID of an existing [Photos](http://docs.appcelerator.com/arrowdb/latest/#!/api/Photos) object to attach as the primary photo for the checkin.\n",
                    "type": "String"
                },
                {
                    "name": "tags",
                    "description": "Comma-separated list of tags for this checkin.\n",
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
                    "type": "Number"
                },
                {
                    "name": "acl_id",
                    "description": "ID of an [ACLs](http://docs.appcelerator.com/arrowdb/latest/#!/api/ACLs) to associate with this checkin object.\n\nAn ACL can be specified using acl_name or acl_id. The two parameters are mutually exclusive.\n",
                    "type": "String"
                },
                {
                    "name": "su_id",
                    "description": "ID of [Users](http://docs.appcelerator.com/arrowdb/latest/#!/api/Users) to update the checkin on behalf of.The current login user must be an application admin to create a checkin on behalf of another user.\n",
                    "type": "String"
                },
                {
                    "name": "pretty_json",
                    "description": "Determines if the JSON response is formatted for readability (`true`), or displayed on a\nsingle line (`false`). Default is `false`.\n",
                    "type": "Boolean"
                }
            ]
        },
        "batchDelete": {
            "summary": "Deletes multiple Checkins objects",
            "description": "Deletes Checkin objects that match the query constraints provided in the where parameter. If no where parameter is provided, all Checkin objects are deleted. Note that an HTTP 200 code (success) is returned if the call completed successfully but the query matched no objects. For performance reasons, the number of objects that can be deleted in a single batch delete operation is limited to 100,000. The matched objects are deleted asynchronously in a separate process. The Place, Event, or Photo associated with any of the matched objects is not deleted. You must be an application admin to run this command. ",
            "authRequired": true,
            "instance": true,
            "adminRequired": true,
            "response": {
                "singleElement": true
            },
            "parameters": [
                {
                    "name": "where",
                    "description": "Encoded JSON object that specifies constraint values for Checkins objects to delete. If not specified, all Checkins objects are deleted.\n",
                    "type": "Hash"
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

    actions: ["read", "create", "delete", "update"]
};