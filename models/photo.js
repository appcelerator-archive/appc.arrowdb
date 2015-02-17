'use strict';

var Arrow = require("arrow");

/*
 The Photos model.
 */
module.exports = Arrow.Model.extend("appc.arrowdb/photo", {
	/**
	 * Remove generated: true or set it to false if you want to prevent syncModels.js from changing this file.
	 */
	generated: true,
	/*
	 Fields for this model.
	 */
	fields: {
		"filename": {
			// "originalType": "String",
			"type": String,
			"description": "Filename of the original photo."
		},
		"title": {
			// "originalType": "String",
			"type": String,
			"description": "Photo title, if specified."
		},
		"size": {
			// "originalType": "Number",
			"type": Number,
			"description": "Original image size in bytes."
		},
		"collections": {
			// "originalType": "Array",
			"type": Array,
			"description": "Single-element array containing the collection this photo is a part of, if any."
		},
		"md5": {
			// "originalType": "String",
			"type": String,
			"description": "MD5 hash of the original image data."
		},
		"processed": {
			// "originalType": "Boolean",
			"type": Boolean,
			"description": "True if this photo has been processed and is available for download."
		},
		"content_type": {
			// "originalType": "String",
			"type": String,
			"description": "MIME content-type for this photo."
		},
		"urls": {
			// "originalType": "Hash",
			"type": Object,
			"description": "A hash containing image URLs for the photo at different sizes. The keys in the hash correspond to \nthe photo sizes described in [Photo Uploading & Resizing](#!/guide/photosizes):\n\n* square_75\n* thumb_100\n* small_240\n* medium_500\n* medium_640\n* large_1024\n* original\n\nThe URLs are only available after the photo has been processed (`processed` is\n`true`).\n"
		},
		"created_at": {
			// "originalType": "Date",
			"type": Date,
			"description": "Creation date for this photo object."
		},
		"updated_at": {
			// "originalType": "Date",
			"type": Date,
			"description": "Last update time for this photo object."
		},
		"tags": {
			// "originalType": "Array",
			"type": Array,
			"description": "List of tags for this photo."
		},
		"custom_fields": {
			// "originalType": "Hash",
			"type": Object,
			"description": "User defined fields. See [Custom Data Fields](#!/guide/customfields)."
		},
		"acls": {
			// "originalType": "String",
			"type": String,
			"description": "Single-element array containing the ACLs associated with this photo object, if any.\n"
		},
		"user": {
			// "originalType": "Users",
			"type": Array,
			"description": "User object for the photo's owner.\n"
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
		},
		"reviews": {
			// "originalType": "Array",
			"type": Array,
			"description": "List of reviews for this object.\n\nOnly present if the object has been reviewed.\n"
		},
		"reviews_count": {
			// "originalType": "Number",
			"type": Number,
			"description": "Total number of reviews for this object.\n\nOnly present if the object has been reviewed.\n"
		},
		"ratings_count": {
			// "originalType": "Number",
			"type": Number,
			"description": "Total number of reviews for this object that include a rating.\n\nOnly present if the object has been reviewed.\n"
		},
		"ratings_average": {
			// "originalType": "Number",
			"type": Number,
			"description": "Average rating for this object.\nOnly present if the object has been reviewed."
		},
		"ratings_summary": {
			// "originalType": "Hash",
			"type": Object,
			"description": "Breakdown of the number of reviews that specified a given rating value. For\nexample, if your ratings range from 1-5, the ratings summary might look like this:\n\n    ratings_summary: {\n        \"1\" : 1,\n        \"2\" : 0,\n        \"3\" : 5,\n        \"4\" : 50,\n        \"5\" : 12\n    }\n\nOnly present if the object has been reviewed.\n"
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
			"summary": "Deletes multiple Photos objects.",
			"description": "Deletes Photos objects that match the query constraints provided in the `where` parameter.\nIf no `where` parameter is provided, all Photos objects are deleted. \nNote that an HTTP 200 code (success)\nis returned if the call completed successfully but the query matched no objects.\n\nFor performance reasons, the number of objects that can be deleted in a single batch delete \noperation is limited to 100,000.\n\nThe matched objects are deleted asynchronously in a separate process.                \n\nYou must be an application admin to run this command.        \n",
			"authRequired": true,
			"instance": true,
			"adminRequired": true,
			"response": {
				"singleElement": true
			},
			"parameters": [
				{
					"name": "where",
					"description": "Encoded JSON object that specifies constraint values for Photos objects to delete.\nIf not specified, all Photos objects are deleted.\n",
					"type": "Hash"
				}
			]
		},
		"create": {
			"summary": "Create (Upload) a Photo",
			"description": "Create a photo using the given `photo` binary attachment. A `collection_name`\nor `collection_id` is optional. The response includes a `processed` flag which\nindicates if the photo has been resized and stored reliably in the\nAppcelerator Cloud Services storage engine. This will initially be `false`.\nThe `md5` field gives the md5 sum of the file which can be used to verify file\nintegrity.\n",
			"authRequired": true,
			"instance": true,
			"adminRequired": false,
			"response": {
				"singleElement": true
			},
			"parameters": [
				{
					"name": "photo",
					"description": "The attached binary file.\n",
					"type": "FileUpload",
					"required": true
				},
				{
					"name": "title",
					"description": "Photo title.",
					"type": "String"
				},
				{
					"name": "collection_name",
					"description": "Name of the PhotoCollections to add this photo to.",
					"type": "String"
				},
				{
					"name": "collection_id",
					"description": "ID of the PhotoCollections to add this photo to.",
					"type": "String"
				},
				{
					"name": "tags",
					"description": "Comma separated list of tags to associate with this photo.\n",
					"type": "String"
				},
				{
					"name": "custom_fields",
					"description": "User-defined fields to add to this photo. See [Custom Data Fields](#!/guide/customfields).",
					"type": [
						"String",
						"Hash"
					]
				},
				{
					"name": "acl_name",
					"description": "Name of an ACLs to associate with this photo object.\n\nAn ACL can be specified using `acl_name` or `acl_id`. The two parameters are\nmutually exclusive.\n",
					"type": "String"
				},
				{
					"name": "acl_id",
					"description": "ID of an ACLs to associate with this photo object.\n\nAn ACL can be specified using `acl_name` or `acl_id`. The two parameters are\nmutually exclusive.\n",
					"type": "String"
				},
				{
					"name": "user_id",
					"description": "User ID to create the photo on behalf of.\n\nThe current login user must be an application admin to create a photo on\nbehalf of another user.\n",
					"type": "String"
				},
				{
					"name": "photo_sizes",
					"description": "User-defined photo sizes. See [Photo Uploading &\nSizes](#!/guide/photosizes#custom).  Sizes be specified as a JSON object, or using a separate parameter for each\nsize. To specify a photo size called \"preview\" using JSON:\n\n    photo_size : { \"preview\" : \"120x120#\" }\n\nTo pass each size as a separate parameter, do *not* use the literal parameter name `photo_sizes`,\nbut add a parameter named `photo_sizes[`_sizeName_`]` for each custom photo\nsize. The previous example in this format looks like this:\n\n    \"photo_size[preview]\" : \"120x120#\"\n",
					"type": [
						"String",
						"Hash"
					]
				},
				{
					"name": "photo_sync_sizes[]",
					"description": "Synchronous photo sizes to upload. See [Photo Uploading & Resizing](#!/guide/photosizes).\n\nThe literal name for this parameter is `photo_sync_sizes[]`. This parameter can be specified\nmultiple times, once for each photo size that must be created before the request returns.\n\nFor example:\n\n    \"photo_sync_sizes[]=preview\"\n",
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
			"summary": "Delete a Photo",
			"description": "Deletes a photo to which you have update access.\n\nAn application admin can delete any photo object.\n",
			"authRequired": true,
			"instance": true,
			"adminRequired": false,
			"response": {
				"singleElement": true
			},
			"parameters": [
				{
					"name": "photo_id",
					"description": "ID of the photo to delete.",
					"type": "String",
					"required": true
				},
				{
					"name": "user_id",
					"description": "User ID to delete the Photo object on behalf of. The user must be the creator of the object.\n\nThe current login user must be an application admin to delete a Photo object on\nbehalf of another user.\n",
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
			"summary": "Custom Query Photos",
			"description": "Perform custom query of photos with sorting and paginating. Currently you can\nnot query or sort data stored inside array or hash in custom fields.\n\nIn addition to custom fields, here is a list of pre-defined fields\nthat can be queried and sorted:\n\n*   `user_id: String`. Photo owner's user ID.\n*   `title:  String`.  Photo title.\n*   `tags_array: String`. Photo tags.\n*   `ratings_average:  Number`.  Photo's average rating (see Reviews).\n*   `ratings_count: Number`. Photo's total number of ratings (see Reviews).\n*   `reviews_count: Number`. Photo's total number of reviews (see Reviews).\n*   `created_at: Date`. Timestamp when the photo was created.\n*   `updated_at: Date`. Timestamp when the photo was updated.\n\nIn ACS 1.1.5 and later, you can paginate query results using `skip` and `limit` parameters, or by including\na `where` clause to limit the results to objects whose IDs fall within a specified range.\nFor details, see [Query Pagination](#!/guide/search_query-section-query-pagination).\n\nFor details about using the query parameters,\nsee the [Search and Query guide](#!/guide/search_query).\n",
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
					"name": "show_user_like",
					"description": "If set to **true**, each Photo object in the response includes `\"current_user_liked: true\"`\n if the current user has liked the object. If the user has not liked the object, the \n`current_user_liked` field is not included in the response.\n",
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
		"search": {
			"summary": "Seach for Photos",
			"description": "Searches for photos with sorting and paginating.\n",
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
					"name": "response_json_depth",
					"description": "Nested object depth level counts in response JSON.\n\nIn order to reduce server API calls from an application, the response JSON may\ninclude not just the objects that are being queried/searched, but also\nsome important data related to the returned objects such as object's owner or\nreferenced objects.\n\nDefault is 1, valid range is 1 to 8.\n",
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
			"summary": "Show Photo Info",
			"description": "Returns the information for the identified photo.\n",
			"authRequired": false,
			"instance": true,
			"adminRequired": false,
			"response": {
				"singleElement": true
			},
			"parameters": [
				{
					"name": "photo_id",
					"description": "ID of the photo to show.",
					"type": "String",
					"required": true
				},
				{
					"name": "response_json_depth",
					"description": "Nested object depth level counts in response JSON.\n\nIn order to reduce server API calls from an application, the response JSON may\ninclude not just the objects that are being queried/searched, but also\nsome important data related to the returned objects such as object's owner or\nreferenced objects.\n\nDefault is 1, valid range is 1 to 8.\n",
					"type": "Number"
				},
				{
					"name": "show_user_like",
					"description": "If set to **true** the Photo object in the response will include `\"current_user_liked: true\"`\nif the current user has liked the object. If the user has not liked the object, the \n`current_user_liked` field is not included in the response.\n",
					"type": "Boolean"
				},
				{
					"name": "pretty_json",
					"description": "Determines if the JSON response is formatted for readability (`true`), or displayed on a\nsingle line (`false`). Default is `false`.\n",
					"type": "Boolean"
				}
			]
		},
		"update": {
			"summary": "Update a Photo",
			"description": "Updates the photo attachment, the collection that the photo belongs to, or\nother photo properties. When replacing the existing photo attachment with a\nnew one, `processing` will be set to `false`. However the existig URLs will\nremain valid until the new photo has been processed and uploaded to the\nAppcelerator Cloud Services storage cloud. At this time, the old URLs will be\nreplaced with the URLs of the newly processed photo.\n\nAn application admin can update any Photo object.\n",
			"authRequired": true,
			"instance": true,
			"adminRequired": false,
			"response": {
				"singleElement": true
			},
			"parameters": [
				{
					"name": "photo_id",
					"description": "ID of the photo to update.",
					"type": "String",
					"required": true
				},
				{
					"name": "photo",
					"description": "New photo to associate with this object, attached as a binary file.\n",
					"type": "FileUpload",
					"required": true
				},
				{
					"name": "title",
					"description": "Photo title.",
					"type": "String"
				},
				{
					"name": "collection_name",
					"description": "Name of the PhotoCollections to add this photo to. Replaces the\nexisting collection, if any.\n",
					"type": "String"
				},
				{
					"name": "collection_id",
					"description": "ID of the PhotoCollections to add this photo to. Replaces the existing\ncollection, if any.\n",
					"type": "String"
				},
				{
					"name": "tags",
					"description": "Comma separated list of tags to associate with this photo. Overwrites any\nexisting tags.\n",
					"type": "String"
				},
				{
					"name": "custom_fields",
					"description": "User-defined fields to add to this photo. See [Custom Data Fields](#!/guide/customfields).",
					"type": [
						"String",
						"Hash"
					]
				},
				{
					"name": "acl_name",
					"description": "Name of an ACLs to associate with this photo object.\n\nAn ACL can be specified using `acl_name` or `acl_id`. The two parameters are\nmutually exclusive.\n\nTo delete an ACL, set `acl_name` or `acl_id` to the empty string.\n",
					"type": "String"
				},
				{
					"name": "acl_id",
					"description": "ID of an ACLs to associate with this photo object.\n\nAn ACL can be specified using `acl_name` or `acl_id`. The two parameters are\nmutually exclusive.\n",
					"type": "String"
				},
				{
					"name": "photo_sizes",
					"description": "User-defined photo sizes. See [Photo Uploading & Resizings](#!/guide/photosizes).\nSizes be specified as a JSON object, or using a separate parameter for each\nsize. To specify a photo size called \"preview\" using JSON:\n\n    photo_size : { \"preview\" : \"120x120#\" }\n\nTo pass each size as a separate parameter, do *not* use the literal parameter name `photo_sizes`,\nbut add a parameter named `photo_sizes[`_sizeName_`]` for each custom photo\nsize. The previous example in this format looks like this:\n\n    \"photo_size[preview]\" : \"120x120#\"\n",
					"type": [
						"String",
						"Hash"
					]
				},
				{
					"name": "photo_sync_sizes",
					"description": "Synchronous photo sizes to upload. See [Photo Uploading & Resizings](#!/guide/photosizes).\n\nThe literal name for this parameter is `photo_sync_sizes[]`. This parameter can be specified\nmultiple times, once for each photo size that must be created before the request returns.\n\nFor example:\n\n    \"photo_sync_sizes[]=preview\"\n",
					"type": "String"
				},
				{
					"name": "user_id",
					"description": "User ID to update the Photo object on behalf of. The user must be the creator of the object.\n\nThe current login user must be an application admin to update a Photo object on\nbehalf of another user.\n",
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
				defaultValue.photo_id = instance.getPrimaryKey();
				return defaultValue;
			case 'delete':
				return {
					photo_id: instance.getPrimaryKey()
				};
		}
		return defaultValue;
	}
});
