'use strict';

/*
 The Photos model.
 */
module.exports = {
	name: 'photo',
	objectName: 'Photos',

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
		"filename": {
			// "originalType": "String",
			"type": String,
			"description": "Filename of the original photo."
		},
		"photo": {
			"type": Object,
			"description": "The attached binary file for creation."
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
			"description": "A hash containing image URLs for the photo at different sizes. The keys in the hash correspond to  the photo sizes described in [Photo Uploading & Resizing](http://docs.appcelerator.com/arrowdb/latest/#!/guide/photosizes):  * square_75 * thumb_100 * small_240 * medium_500 * medium_640 * large_1024 * original  The URLs are only available after the photo has been processed (`processed` is `true`). "
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
			"description": "User defined fields. See [Custom Data Fields](http://docs.appcelerator.com/arrowdb/latest/#!/guide/customfields)."
		},
		"acls": {
			// "originalType": "String",
			"type": String,
			"description": "Single-element array containing the ACLs associated with this photo object, if any. "
		},
		"user": {
			// "originalType": "Users",
			"type": Array,
			"description": "User object for the photo's owner. "
		},
		"user_id": {
			// "originalType": "",
			"type": String,
			"description": "Specifies the owner of object."
		},
		"reviews": {
			// "originalType": "Array",
			"type": Array,
			"description": "List of reviews for this object.  Only present if the object has been reviewed. "
		},
		"reviews_count": {
			// "originalType": "Number",
			"type": Number,
			"description": "Total number of reviews for this object.  Only present if the object has been reviewed. "
		},
		"ratings_count": {
			// "originalType": "Number",
			"type": Number,
			"description": "Total number of reviews for this object that include a rating.  Only present if the object has been reviewed. "
		},
		"ratings_average": {
			// "originalType": "Number",
			"type": Number,
			"description": "Average rating for this object. Only present if the object has been reviewed."
		},
		"ratings_summary": {
			// "originalType": "Hash",
			"type": Object,
			"description": "Breakdown of the number of reviews that specified a given rating value. For example, if your ratings range from 1-5, the ratings summary might look like this:      ratings_summary: {         \"1\" : 1,         \"2\" : 0,         \"3\" : 5,         \"4\" : 50,         \"5\" : 12     }  Only present if the object has been reviewed. "
		},
		"photo_sizes": {
			"type": Object,
			"description": "User-defined photo sizes. See [Photo Uploading &\nSizes](http://docs.appcelerator.com/arrowdb/latest/#!/guide/photosizes).  Sizes be specified as a JSON object, or using a separate parameter for each\nsize. To specify a photo size called \"preview\" using JSON:\n\n    photo_size : { \"preview\" : \"120x120#\" }\n\nTo pass each size as a separate parameter, do *not* use the literal parameter name `photo_sizes`,\nbut add a parameter named `photo_sizes[`_sizeName_`]` for each custom photo\nsize. The previous example in this format looks like this:\n\n    \"photo_size[preview]\" : \"120x120#\"\n"
		},
		"photo_sync_sizes[]": {
			"type": String,
			"description": "Synchronous photo sizes to upload. See [Photo Uploading & Resizing](http://docs.appcelerator.com/arrowdb/latest/#!/guide/photosizes).\n\nThe literal name for this parameter is `photo_sync_sizes[]`. This parameter can be specified\nmultiple times, once for each photo size that must be created before the request returns.\n\nFor example:\n\n    \"photo_sync_sizes[]=preview\"\n"
		}
	},
	/*
	 Methods for this model.
	 */
	methodMeta: {
		"delete": {
			"summary": "Delete a Photo",
			"description": "Deletes a photo to which you have update access.  An application admin can delete any photo object. ",
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
					"name": "su_id",
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
		"create": {
			"summary": "Create (Upload) a Photo",
			"description": "Create a photo using the given `photo` binary attachment. A `collection_name` or `collection_id` is optional. The response includes a `processed` flag which indicates if the photo has been resized and stored reliably in the Appcelerator Cloud Services storage engine. This will initially be `false`. The `md5` field gives the md5 sum of the file which can be used to verify file integrity. ",
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
					"description": "User-defined fields to add to this photo. See [Custom Data Fields](http://docs.appcelerator.com/arrowdb/latest/#!/guide/customfields).",
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
					"name": "su_id",
					"description": "User ID to create the photo on behalf of.\n\nThe current login user must be an application admin to create a photo on\nbehalf of another user.\n",
					"type": "String"
				},
				{
					"name": "photo_sizes",
					"description": "User-defined photo sizes. See [Photo Uploading &\nSizes](http://docs.appcelerator.com/arrowdb/latest/#!/guide/photosizes).  Sizes be specified as a JSON object, or using a separate parameter for each\nsize. To specify a photo size called \"preview\" using JSON:\n\n    photo_size : { \"preview\" : \"120x120#\" }\n\nTo pass each size as a separate parameter, do *not* use the literal parameter name `photo_sizes`,\nbut add a parameter named `photo_sizes[`_sizeName_`]` for each custom photo\nsize. The previous example in this format looks like this:\n\n    \"photo_size[preview]\" : \"120x120#\"\n",
					"type": [
						"String",
						"Hash"
					]
				},
				{
					"name": "photo_sync_sizes[]",
					"description": "Synchronous photo sizes to upload. See [Photo Uploading & Resizing](http://docs.appcelerator.com/arrowdb/latest/#!/guide/photosizes).\n\nThe literal name for this parameter is `photo_sync_sizes[]`. This parameter can be specified\nmultiple times, once for each photo size that must be created before the request returns.\n\nFor example:\n\n    \"photo_sync_sizes[]=preview\"\n",
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
			"summary": "Show Photo Info",
			"description": "Returns the information for the identified photo. ",
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
		"query": {
			"summary": "Custom Query Photos",
			"description": "Perform custom query of photos with sorting and paginating. Currently you can not query or sort data stored inside array or hash in custom fields.  In addition to custom fields, here is a list of pre-defined fields that can be queried and sorted:  *   `user_id: String`. Photo owner's user ID. *   `title:  String`.  Photo title. *   `tags_array: String`. Photo tags. *   `ratings_average:  Number`.  Photo's average rating (see Reviews). *   `ratings_count: Number`. Photo's total number of ratings (see Reviews). *   `reviews_count: Number`. Photo's total number of reviews (see Reviews). *   `created_at: Date`. Timestamp when the photo was created. *   `updated_at: Date`. Timestamp when the photo was updated.  In ACS 1.1.5 and later, you can paginate query results using `skip` and `limit` parameters, or by including a `where` clause to limit the results to objects whose IDs fall within a specified range. For details, see [Query Pagination](http://docs.appcelerator.com/arrowdb/latest/#!/guide/search_query-section-query-pagination).  For details about using the query parameters, see the [Search and Query guide](http://docs.appcelerator.com/arrowdb/latest/#!/guide/search_query). ",
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
			"description": "Searches for photos with sorting and paginating. ",
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
		"update": {
			"summary": "Update a Photo",
			"description": "Updates the photo attachment, the collection that the photo belongs to, or other photo properties. When replacing the existing photo attachment with a new one, `processing` will be set to `false`. However the existig URLs will remain valid until the new photo has been processed and uploaded to the Appcelerator Cloud Services storage cloud. At this time, the old URLs will be replaced with the URLs of the newly processed photo.  An application admin can update any Photo object. ",
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
					"description": "User-defined fields to add to this photo. See [Custom Data Fields](http://docs.appcelerator.com/arrowdb/latest/#!/guide/customfields).",
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
					"description": "User-defined photo sizes. See [Photo Uploading & Resizings](http://docs.appcelerator.com/arrowdb/latest/#!/guide/photosizes).\nSizes be specified as a JSON object, or using a separate parameter for each\nsize. To specify a photo size called \"preview\" using JSON:\n\n    photo_size : { \"preview\" : \"120x120#\" }\n\nTo pass each size as a separate parameter, do *not* use the literal parameter name `photo_sizes`,\nbut add a parameter named `photo_sizes[`_sizeName_`]` for each custom photo\nsize. The previous example in this format looks like this:\n\n    \"photo_size[preview]\" : \"120x120#\"\n",
					"type": [
						"String",
						"Hash"
					]
				},
				{
					"name": "photo_sync_sizes",
					"description": "Synchronous photo sizes to upload. See [Photo Uploading & Resizings](http://docs.appcelerator.com/arrowdb/latest/#!/guide/photosizes).\n\nThe literal name for this parameter is `photo_sync_sizes[]`. This parameter can be specified\nmultiple times, once for each photo size that must be created before the request returns.\n\nFor example:\n\n    \"photo_sync_sizes[]=preview\"\n",
					"type": "String"
				},
				{
					"name": "su_id",
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
		"batchDelete": {
			"summary": "Deletes multiple Photos objects.",
			"description": "Deletes Photos objects that match the query constraints provided in the `where` parameter. If no `where` parameter is provided, all Photos objects are deleted.  Note that an HTTP 200 code (success) is returned if the call completed successfully but the query matched no objects.  For performance reasons, the number of objects that can be deleted in a single batch delete  operation is limited to 100,000.  The matched objects are deleted asynchronously in a separate process.                  You must be an application admin to run this command.         ",
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
	},

	actions: ["delete", "create", "read", "update"]
};
