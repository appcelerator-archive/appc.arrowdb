'use strict';

var Arrow = require("arrow");

/*
 The KeyValues model.
 */
module.exports = Arrow.Model.extend("appc.arrowdb/key_value", {
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
			"description": "Name (or key) for this key-value pair."
		},
		"type": {
			// "originalType": "String",
			"type": String,
			"description": "Value type: \"string\" or \"binary\".\n\nIf type is omitted, defaults to \"string\".\n"
		},
		"value": {
			// "originalType": "String,BinaryData",
			"type": Object,
			"description": "String or binary data.\n"
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
		"append": {
			"summary": "Append to a Key-Value",
			"description": "Add the given `value` to end of the existing one. Not allowed on key-values\nwith binary data.\n",
			"authRequired": true,
			"instance": true,
			"adminRequired": false,
			"response": {
				"singleElement": true
			},
			"parameters": [
				{
					"name": "name",
					"description": "Name (or key) for the key-value pair.",
					"type": "String",
					"required": true
				},
				{
					"name": "value",
					"description": "Value to append to the current value.",
					"type": "String",
					"required": true
				},
				{
					"name": "access_private",
					"description": "Determines whether to update this key-value in the publically readable store\nor in the user's private store.\n\nDefault is false (publically readable).\n",
					"type": "Boolean"
				},
				{
					"name": "user_id",
					"description": "Update the key-value pair on behalf of the identified user.\n\nLogin user must be an admin to update a key-value on behalf of another user.\n",
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
			"summary": "Delete a Key-Value",
			"description": "Deletes a key-value pair\n",
			"authRequired": true,
			"instance": true,
			"adminRequired": false,
			"response": {
				"singleElement": true
			},
			"parameters": [
				{
					"name": "name",
					"description": "Name (or key) of the key-value pair to delete.",
					"type": "String",
					"required": true
				},
				{
					"name": "access_private",
					"description": "Determines whether to delete this key-value in the publically readable store\nor in the user's private store.\n\nDefault is false (publically readable store).\n",
					"type": "Boolean"
				},
				{
					"name": "user_id",
					"description": "Delete the key-value pair on behalf of the identified user.\n\nLogin user must be an admin to delete a key-value on behalf of another user.\n",
					"type": "String"
				},
				{
					"name": "pretty_json",
					"description": "Determines if the JSON response is formatted for readability (`true`), or displayed on a\nsingle line (`false`). Default is `false`.\n",
					"type": "Boolean"
				}
			]
		},
		"get": {
			"summary": "Get a Value",
			"description": "Gets the value of a key-value pair.\n\nIf the value is string, the KeyValue object is returned in JSON format. If the value is\nbinary, the value is returned directly **without** a JSON wrapper and the content type\nis set to \"application/octct-stream\".\n",
			"authRequired": false,
			"instance": true,
			"adminRequired": false,
			"response": {
				"singleElement": true
			},
			"parameters": [
				{
					"name": "name",
					"description": "Name (or key) for the key-value pair to retrieve.",
					"type": "String",
					"required": true
				},
				{
					"name": "access_private",
					"description": "Determines whether to retrieve this key-value from the publically readable store\nor from the user's private store.\n\nDefault is false (publically readable).\n",
					"type": "Boolean"
				},
				{
					"name": "user_id",
					"description": "Retrieve a private key-value pair from the identified user's store.\n\nLogin user must be an application admin to retrieve a key-value from another\nuser's store.\n",
					"type": "String"
				},
				{
					"name": "pretty_json",
					"description": "Determines if the JSON response is formatted for readability (`true`), or displayed on a\nsingle line (`false`). Default is `false`.\n",
					"type": "Boolean"
				}
			]
		},
		"incrby": {
			"summary": "Increment a Key-Value",
			"description": "Increment the `value` by the given integer value. Not allowed on key-value pairs with binary\ndata.\n\nIf the current value in the key-value is not convertable to an integer, the new\nvalue replaces the existing value.\n",
			"authRequired": true,
			"instance": true,
			"adminRequired": false,
			"response": {
				"singleElement": true
			},
			"parameters": [
				{
					"name": "name",
					"description": "Name (or key) for the key-value pair.",
					"type": "String",
					"required": true
				},
				{
					"name": "value",
					"description": "Integer value to add to the current value. If a floating point number is\nspecified, any fractional portion is dropped.\n\nIf this value cannot be converted to an integer, the existing value is not\nchanged.\n",
					"type": [
						"String",
						"Number"
					],
					"required": true
				},
				{
					"name": "access_private",
					"description": "Determines whether to update this key-value in the publically readable store\nor in the user's private store.\n\nDefault is false (publically readable).\n",
					"type": "Boolean"
				},
				{
					"name": "user_id",
					"description": "Update the key-value pair on behalf of the identified user.\n\nLogin user must be an admin to update a key-value on behalf of another user.\n",
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
			"summary": "Performs a custom query of KeyValues.",
			"description": "Performs a custom query of KeyValues. Currently you can not query or sort data stored inside \nan array or hash in custom fields.\n\nIn ACS 1.1.5 and later, you can paginate query results using `skip` and `limit` parameters, or by including\na `where` clause to limit the results to objects whose IDs fall within a specified range.\nFor details, see [Query Pagination](#!/guide/search_query-section-query-pagination).        \n\nFor details about using the query parameters,\nsee the [Search and Query guide](#!/guide/search_query).\n",
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
					"name": "pretty_json",
					"description": "Determines if the JSON response is formatted for readability (`true`), or displayed on a\nsingle line (`false`). Default is `false`.\n",
					"type": "Boolean"
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
		"set": {
			"summary": "Set a string or binary value",
			"description": "Sets a string or binary value referenced by the key name. The size of the\nvalue can be up to 2M, and the key name length can be up to 256 characters.\nThe default value type is String.\n",
			"authRequired": true,
			"instance": true,
			"adminRequired": false,
			"response": {
				"singleElement": true
			},
			"parameters": [
				{
					"name": "name",
					"description": "The name, or key, for this key-value pair.",
					"type": "String",
					"required": true
				},
				{
					"name": "type",
					"description": "Value type: \"string\" or \"binary\".\n\nDefaults to \"string\".\n",
					"type": "String"
				},
				{
					"name": "value",
					"description": "Value to assoicate with the key.\n\nBinary data can be passed as a binary form part. The REST example shows how to\nsend binary data using curl.\n",
					"type": [
						"String",
						"BinaryData"
					],
					"required": true
				},
				{
					"name": "access_private",
					"description": "Determines whether this key-value is publically readable, or stored in a\nprivate store.\n\nDefault is false (publically readable). If set to true, it sets the key/value stored\nin the current user's private key-value store. Otherwise, it sets the public\nkey-value pair which is readable to everyone.\n",
					"type": "Boolean"
				},
				{
					"name": "user_id",
					"description": "User to create the key-value pair on behalf of.\n\nThe current user must be an application admin to set a key-value pair on\nbehalf of another user.\n",
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
				defaultValue.key_value_id = instance.getPrimaryKey();
				return defaultValue;
			case 'delete':
				return {
					key_value_id: instance.getPrimaryKey()
				};
		}
		return defaultValue;
	}
});
