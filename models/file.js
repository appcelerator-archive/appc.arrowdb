'use strict';

var Arrow = require("arrow");

/*
 The Files model.
 */
module.exports = Arrow.Model.extend("appc.arrowdb/file", {
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
			"description": "File name."
		},
		"processed": {
			// "originalType": "Boolean",
			"type": Boolean,
			"description": "Flag indicating whether the file has finished uploading and is  available for access."
		},
		"url": {
			// "originalType": "String",
			"type": String,
			"description": "URL for accessing the file. Only available when `processed` is `true`.\n"
		},
		"created_at": {
			// "originalType": "Date",
			"type": Date,
			"description": "Creation date for this user object."
		},
		"updated_at": {
			// "originalType": "Date",
			"type": Date,
			"description": "Last update time for this user object."
		},
		"user": {
			// "originalType": "Users",
			"type": Array,
			"description": "Owner of this object."
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
		"batchDelete": {
			"summary": "Deletes multiple Files objects.",
			"description": "Deletes Files objects that match the query constraints provided in the `where` parameter.\nIf no `where` parameter is provided, all Files objects are deleted. \nNote that an HTTP 200 code (success)\nis returned if the call completed successfully but the query matched no objects.\n\nFor performance reasons, the number of objects that can be deleted in a single batch delete \noperation is limited to 100,000. \n\nThe matched objects are deleted asynchronously in a separate process.      \n\nYou must be an application admin to run this command.        \n",
			"authRequired": true,
			"instance": true,
			"adminRequired": true,
			"response": {
				"singleElement": true
			},
			"parameters": [
				{
					"name": "where",
					"description": "Encoded JSON object that specifies constraint values for Files objects to delete.\nIf not specified, all Files objects are deleted.\n",
					"type": "Hash"
				}
			]
		},
		"create": {
			"summary": "",
			"description": "Creates a new file object with a binary attachment or contents of a URL.\nThe size of the file can be up to 25 MB. The response includes a `processed` flag which indicates\nif the file has been stored reliably in the Appcelerator Cloud Services\nstorage engine. This will initially be `false`. Once the file is available in\nthe storage engine, the `processed` flag will be `true`, and file `url` will\nbe available.\n",
			"authRequired": true,
			"instance": true,
			"adminRequired": false,
			"response": {
				"singleElement": true
			},
			"parameters": [
				{
					"name": "name",
					"description": "File name.",
					"type": "String"
				},
				{
					"name": "file",
					"description": "The attached binary file to upload to ACS. You can specify either `file` or `url`, but not both.",
					"type": "FileUpload"
				},
				{
					"name": "url",
					"description": "URL of file to upload to ACS. You can specify either `file` or `url`, but not both.",
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
					"description": "Name of an ACLs to associate with this file object.\n\nAn ACL can be specified using `acl_name` or `acl_id`. The two parameters are\nmutually exclusive.\n",
					"type": "String"
				},
				{
					"name": "acl_id",
					"description": "ID of an ACLs to associate with this file object.\n\nAn ACL can be specified using `acl_name` or `acl_id`. The two parameters are\nmutually exclusive.\n",
					"type": "String"
				},
				{
					"name": "user_id",
					"description": "User ID to create the file on behalf of.\n\nThe current login user must be an application admin to create a file on\nbehalf of another user.\n",
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
			"summary": "Custom Query Files",
			"description": "Perform custom query of files with sorting and paginating. Currently you can\nnot query or sort data stored inside custom fields that have Array or Hash values.\n\nIn addition to custom fields, here is a list of pre-defined fields in the File\nobject that can be queried and sorted:\n\n*   `user_id: String`.  User ID of the File's owner.\n\n*   `created_at: Date`. Timestamp when the file was created.\n\n*   `updated_at: Date`. Timestamp when the file was last updated.\n\nIn ACS 1.1.5 and later, you can paginate query results using `skip` and `limit` parameters, or by including\na `where` clause to limit the results to objects whose IDs fall within a specified range.\nFor details, see [Query Pagination](#!/guide/search_query-section-query-pagination).        \n\nFor details about using the query parameters,\nsee the [Search and Query guide](#!/guide/search_query).\n",
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
		"delete": {
			"summary": "Delete a File",
			"description": "Deletes the file. To delete a file, the current user must be one of the following:\n\n*   The file's owner\n*   A user with write priviledges granted by the file's ACL\n*   An application admin\n",
			"authRequired": true,
			"instance": true,
			"adminRequired": false,
			"response": {
				"singleElement": true
			},
			"parameters": [
				{
					"name": "file_id",
					"description": "ID of the file to delete.",
					"type": "String",
					"required": true
				},
				{
					"name": "user_id",
					"description": "User to delete the File object on behalf of. The user must be the creator of the object.\n\nThe current user must be an application admin to delete the File object on\nbehalf of another user.\n",
					"type": "String"
				},
				{
					"name": "pretty_json",
					"description": "Determines if the JSON response is formatted for readability (`true`), or displayed on a\nsingle line (`false`). Default is `false`.\n",
					"type": "Boolean"
				}
			]
		},
		"show": {
			"summary": "Show File Info",
			"description": "Returns information associated with the file.\n",
			"authRequired": false,
			"instance": true,
			"adminRequired": false,
			"response": {
				"singleElement": true
			},
			"parameters": [
				{
					"name": "file_id",
					"description": "ID of the file to retrieve information for.",
					"type": "String",
					"required": true
				},
				{
					"name": "response_json_depth",
					"description": "Nested object depth level counts in response json.\nIn order to reduce server API calls from an application, the response json may\ninclude not just the objects that are being queried/searched, but also with\nsome important data related to the returning objects such as object's owner or\nreferencing objects.\n\nDefault is 1, valid range is 1 to 8.\n",
					"type": "Number"
				}
			]
		},
		"update": {
			"summary": "Update a File",
			"description": "Updates an existing file object with a binary attachment, or contents of a URL. When replacing the existing file with a\nnew one, the object's `processing` flag is set to `false`, and its `url` property will not be valid\nuntil the new file has been processed and uploaded to the Appcelerator Cloud\nServices storage cloud.\n\nApplication administrators can update any File object.\n",
			"authRequired": true,
			"instance": true,
			"adminRequired": false,
			"response": {
				"singleElement": true
			},
			"parameters": [
				{
					"name": "file_id",
					"description": "ID of the file to update.",
					"type": "String",
					"required": true
				},
				{
					"name": "name",
					"description": "File name.",
					"type": "String"
				},
				{
					"name": "file",
					"description": "The attached binary file to upload to ACS. You can specify either `file` or `url`, but not both.",
					"type": "FileUpload"
				},
				{
					"name": "url",
					"description": "URL of file to upload to ACS. You can specify either `file` or `url`, but not both.",
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
					"description": "Name of an ACLs to associate with this file object.\n\nAn ACL can be specified using `acl_name` or `acl_id`. The two parameters are\nmutually exclusive.\n",
					"type": "String"
				},
				{
					"name": "acl_id",
					"description": "ID of an ACLs to associate with this file object.\n\nAn ACL can be specified using `acl_name` or `acl_id`. The two parameters are\nmutually exclusive.\n",
					"type": "String"
				},
				{
					"name": "user_id",
					"description": "User to update the File object on behalf of. The user must be the creator of the object.\n\nThe current user must be an application admin to update a File object on\nbehalf of another user.\n",
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
				defaultValue.file_id = instance.getPrimaryKey();
				return defaultValue;
			case 'delete':
				return {
					file_id: instance.getPrimaryKey()
				};
		}
		return defaultValue;
	}
});
