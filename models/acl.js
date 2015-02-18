'use strict';

var Arrow = require("arrow");

/*
 The ACLs model.
 */
module.exports = Arrow.Model.extend("appc.arrowdb/acl", {
	/**
	 * Remove generated: true or set it to false if you want to prevent syncModels.js from changing this file.
	 */
	generated: false,
	/*
	 Fields for this model.
	 */
	fields: {
		"name": {
			// "originalType": "String",
			"type": String,
			"description": "Name of the ACL object."
		},
		"readers": {
			// "originalType": "Array",
			"type": Array,
			"description": "List of IDs identifying users who can read objects controlled by this ACL.\n"
		},
		"writers": {
			// "originalType": "Array",
			"type": Array,
			"description": "List of IDs identifying users who can update objects controlled by this ACL.\n"
		},
		"public_read": {
			// "originalType": "String",
			"type": String,
			"description": "Determines whether objects controlled by this ACS are publicly readable. \n\nDefault is false.\n"
		},
		"public_write": {
			// "originalType": "String",
			"type": String,
			"description": "Determines whether objects controlled by this ACS are publicly writable. \n\nDefault is false.\n"
		},
		"user": {
			// "originalType": "Users",
			"type": Array,
			"description": "Owner of the ACL."
		},
		"created_at": {
			// "originalType": "Date",
			"type": Date,
			"description": "ACL creation date."
		},
		"updated_at": {
			// "originalType": "Date",
			"type": Date,
			"description": "ACL update date."
		},
		"pretty_json": {
			// "originalType": "Boolean",
			"type": Boolean,
			"description": "Determines if the JSON response is formatted for readability (`true`), or displayed on a\nsingle line (`false`). Default is `false`.\n"
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
		"remove": {
			"summary": "Remove user(s) from an ACL",
			"description": "Removes one or more user(s) from an ACL object with the given `id` or `name`.\n\nYou can remove users from the `readers` list, which grants read permission, the\n`writers` list, which grants update/delete permission, or both.\n",
			"authRequired": true,
			"instance": true,
			"adminRequired": false,
			"response": {
				"singleElement": true
			},
			"parameters": [
				{
					"name": "name",
					"description": "Name of the ACL object.\n\nEither `name` or `id` must be specified.\n",
					"type": "String"
				},
				{
					"name": "id",
					"description": "ID of the ACL oject.\n\nEither `name` or `id` must be specified.\n",
					"type": "String"
				},
				{
					"name": "pretty_json",
					"description": "Determines if the JSON response is formatted for readability (`true`), or displayed on a\nsingle line (`false`). Default is `false`.\n",
					"type": "Boolean"
				},
				{
					"name": "reader_ids",
					"description": "Comma separated list of IDs to remove from the `readers` list.\n",
					"type": "String",
					"required": true
				},
				{
					"name": "writer_ids",
					"description": "Comma separated list of IDs to remove from the `writers` list.\n",
					"type": "String",
					"required": true
				}
			]
		},
		"add": {
			"summary": "Add user(s) to an ACL.",
			"description": "Adds one or more user(s) to an existing ACL object, identified by its `id` or `name`.\n",
			"authRequired": true,
			"instance": true,
			"adminRequired": false,
			"response": {
				"singleElement": true
			},
			"parameters": [
				{
					"name": "name",
					"description": "Name of the ACL object.\n\nEither `name` or `id` must be specified.\n",
					"type": "String"
				},
				{
					"name": "id",
					"description": "ID of the ACL oject.\n\nEither `name` or `id` must be specified.\n",
					"type": "String"
				},
				{
					"name": "pretty_json",
					"description": "Determines if the JSON response is formatted for readability (`true`), or displayed on a\nsingle line (`false`). Default is `false`.\n",
					"type": "Boolean"
				},
				{
					"name": "reader_ids",
					"description": "Comma separated list of IDs identifying users who can read objects\ncontrolled by this ACL.\n",
					"type": "String",
					"required": true
				},
				{
					"name": "writer_ids",
					"description": "Comma separated list of IDs identifying users who can update an object.\ncontrolled by this ACL.\n",
					"type": "String",
					"required": true
				}
			]
		},
		"show": {
			"summary": "Show an ACL",
			"description": "Shows the ACL object with the given `id` or `name`.\n",
			"authRequired": false,
			"instance": true,
			"adminRequired": false,
			"response": {
				"singleElement": true
			},
			"parameters": [
				{
					"name": "id",
					"description": "ID of the ACL oject.\n\nEither `name` or `id` must be specified.\n",
					"type": "String"
				},
				{
					"name": "name",
					"description": "Name of the ACL object.\n\nEither `name` or `id` must be specified.\n",
					"type": "String"
				},
				{
					"name": "pretty_json",
					"description": "Determines if the JSON response is formatted for readability (`true`), or displayed on a\nsingle line (`false`). Default is `false`.\n",
					"type": "Boolean"
				}
			]
		},
		"check": {
			"summary": "Checks a user's permission in an ACL.",
			"description": "Checks the permissions a specified user is granted by a specified ACL.\nIn the response, \"read_permission\": \"yes\" means the user has read permission; if\nthis property is omitted or the value is not \"yes\", the user does not have read\npermission.\n\nSimilarly, \"write_permission\": \"yes\" means the user has write permission. If the\nproperty is omitted or the value is not \"yes\", the user does not have write\npermission.\n",
			"authRequired": true,
			"instance": true,
			"adminRequired": false,
			"response": {
				"singleElement": true
			},
			"parameters": [
				{
					"name": "name",
					"description": "Name of the ACL object.\n\nEither `name` or `id` must be specified.\n",
					"type": "String"
				},
				{
					"name": "id",
					"description": "ID of the ACL oject.\n\nEither `name` or `id` must be specified.\n",
					"type": "String"
				},
				{
					"name": "pretty_json",
					"description": "Determines if the JSON response is formatted for readability (`true`), or displayed on a\nsingle line (`false`). Default is `false`.\n",
					"type": "Boolean"
				},
				{
					"name": "user_id",
					"description": "User ID of the user to check.",
					"type": "String"
				}
			]
		},
		"create": {
			"summary": "Create an access control list",
			"description": "Creates an ACL object, which can be used to control access to ACS objects.\n",
			"authRequired": true,
			"instance": true,
			"adminRequired": false,
			"response": {
				"singleElement": true
			},
			"parameters": [
				{
					"name": "name",
					"description": "Name of the ACL object.\n",
					"type": "String",
					"required": true
				},
				{
					"name": "reader_ids",
					"description": "Comma separated list of IDs identifying users who can read objects\ncontrolled by this ACL.\n",
					"type": "String"
				},
				{
					"name": "writer_ids",
					"description": "Comma separated list of IDs identifying users who can update an object.\ncontrolled by this ACL.\n",
					"type": "String"
				},
				{
					"name": "pretty_json",
					"description": "Determines if the JSON response is formatted for readability (`true`), or displayed on a\nsingle line (`false`). Default is `false`.\n",
					"type": "Boolean"
				},
				{
					"name": "public_read",
					"description": "Determines whether objects controlled by this ACS are publically readable.\n\nDefault is false.\n",
					"type": "String"
				},
				{
					"name": "public_write",
					"description": "Determines whether objects controlled by this ACS are publically writable.\n\nDefault is false.\n",
					"type": "String"
				},
				{
					"name": "user_id",
					"description": "Specifies the owner of the new URL.\n\nOnly allowed if the current login user is an application admin. Otherwise, the\nnew ACL is always owned by the current login user.\n",
					"type": "String"
				}
			]
		},
		"query": {
			"summary": "Performs a custom query of ACLs.",
			"description": "Performs a custom query of ACLs. Currently you can not query or sort data stored inside \nan array or hash in custom fields.\n\nIn ACS 1.1.5 and later, you can paginate query results using `skip` and `limit` parameters, or by including\na `where` clause to limit the results to objects whose IDs fall within a specified range.\nFor details, see [Query Pagination](#!/guide/search_query-section-query-pagination).\n\nFor details about using the query parameters, see the [Search and Query guide](#!/guide/search_query).\n",
			"authRequired": false,
			"instance": true,
			"adminRequired": false,
			"parameters": [
				{
					"name": "count",
					"description": "Used for paginating queries. If set to `true`, the response's `meta` object contains a \n`count` field that indicates the number of objects that matched the query constraints.\n",
					"type": "Boolean"
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
					"name": "pretty_json",
					"description": "Determines if the JSON response is formatted for readability (`true`), or displayed on a\nsingle line (`false`). Default is `false`.\n",
					"type": "Boolean"
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
		"delete": {
			"summary": "Delete an ACL",
			"description": "Deletes an ACL object with the given `id` or `name`.\n\nAn application admin can delete any ACL object.\n",
			"authRequired": true,
			"instance": true,
			"adminRequired": false,
			"response": {
				"singleElement": true
			},
			"parameters": [
				{
					"name": "id",
					"description": "ID of the ACL oject to delete.\n\nEither `name` or `id` must be specified.\n",
					"type": "String"
				},
				{
					"name": "name",
					"description": "Name of the ACL object to delete.\n\nEither `name` or `id` must be specified.\n",
					"type": "String"
				},
				{
					"name": "pretty_json",
					"description": "Determines if the JSON response is formatted for readability (`true`), or displayed on a\nsingle line (`false`). Default is `false`.\n",
					"type": "Boolean"
				},
				{
					"name": "user_id",
					"description": "User to delete the ACL object on behalf of. The user must be the creator of the object.\n\nThe current user must be an application admin to remove an ACL on\nbehalf of another user.\n",
					"type": "String"
				}
			]
		},
		"update": {
			"summary": "Update an ACL",
			"description": "Updates an ACL object to change its access control list. When updating an ACL,\nyou can change the members of the `readers` list and the `writers` list, or change the value\nof the `public_read` and `public_write` flags.\n\nAn application admin can update any ACL object.\n",
			"authRequired": true,
			"instance": true,
			"adminRequired": false,
			"response": {
				"singleElement": true
			},
			"parameters": [
				{
					"name": "id",
					"description": "ID of the ACL oject.\n\nEither `name` or `id` must be specified.\n",
					"type": "String"
				},
				{
					"name": "name",
					"description": "Name of the ACL object.\n\nEither `name` or `id` must be specified.\n",
					"type": "String"
				},
				{
					"name": "pretty_json",
					"description": "Determines if the JSON response is formatted for readability (`true`), or displayed on a\nsingle line (`false`). Default is `false`.\n",
					"type": "Boolean"
				},
				{
					"name": "reader_ids",
					"description": "Comma separated list of IDs identifying users who can read objects\ncontrolled by this ACL.\n\nTo remove all users from the `readers` list, simply set `reader_ids=\"\"`.\nThis removes all users except for the owner from the list.\n",
					"type": "String",
					"required": true
				},
				{
					"name": "writer_ids",
					"description": "Comma separated list of IDs identifying users who can update an object.\ncontrolled by this ACL.\n\nTo remove all users from the `writers` list, simply set `writer_ids=\"\"`.\nThis removes all users except for the owner from the list.\n",
					"type": "String",
					"required": true
				},
				{
					"name": "public_read",
					"description": "Determines whether objects controlled by this ACS are publically readable.\n\nDefault is false.\n",
					"type": "String"
				},
				{
					"name": "public_write",
					"description": "Determines whether objects controlled by this ACS are publically writable.\n\nDefault is false.\n",
					"type": "String"
				},
				{
					"name": "user_id",
					"description": "User to update the ACL object on behalf of. The user must be the creator of the object.\n\nThe current user must be an application admin to update an ACL object on\nbehalf of another user.\n",
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
				defaultValue.acl_id = instance.getPrimaryKey();
				return defaultValue;
			case 'delete':
				return {
					acl_id: instance.getPrimaryKey()
				};
		}
		return defaultValue;
	},

	actions: ["delete","create","read","update"]
});
