'use strict';

var Arrow = require("arrow");

/*
 The Posts model.
 */
module.exports = Arrow.Model.extend("appc.arrowdb/post", {
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
		"created_at": {
			// "originalType": "Date",
			"type": Date,
			"description": "Creation date for this object."
		},
		"updated_at": {
			// "originalType": "Date",
			"type": Date,
			"description": "Last update time for this object."
		},
		"content": {
			// "originalType": "String",
			"type": String,
			"description": "Text content of the post."
		},
		"title": {
			// "originalType": "String",
			"type": String,
			"description": "Title of the post."
		},
		"event": {
			// "originalType": "String",
			"type": String,
			"description": "Event this post belongs to."
		},
		"photo": {
			// "originalType": "Photos",
			"type": Array,
			"description": "Primary photo for this post. "
		},
		"tags": {
			// "originalType": "Array",
			"type": Array,
			"description": "List of tags for this object."
		},
		"custom_fields": {
			// "originalType": "String,Hash",
			"type": Object,
			"description": "User defined fields. See [Custom Data Fields](#!/guide/customfields)."
		},
		"acls": {
			// "originalType": "Array",
			"type": Array,
			"description": "Single-element array containing the object's ACL, if any."
		},
		"user": {
			// "originalType": "String",
			"type": String,
			"description": "User who created this post."
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
			"summary": "Deletes multiple Posts objects.",
			"description": "Deletes Posts objects that match the query constraints provided in the `where` parameter. If no `where` parameter is provided, all Posts objects are deleted.  Note that an HTTP 200 code (success) is returned if the call completed successfully but the query matched no objects.  For performance reasons, the number of objects that can be deleted in a single batch delete  operation is limited to 100,000.  The matched objects are deleted asynchronously in a separate process.             Any primary photos associated with the matched objects are not deleted.  You must be an application admin to run this command.         ",
			"authRequired": true,
			"instance": true,
			"adminRequired": true,
			"response": {
				"singleElement": true
			},
			"parameters": [
				{
					"name": "where",
					"description": "Encoded JSON object that specifies constraint values for Posts objects to delete.\nIf not specified, all Posts objects are deleted.\n",
					"type": "Hash"
				}
			]
		},
		"show": {
			"summary": "Show a Post",
			"description": "Returns  the post with the given `id`.",
			"authRequired": false,
			"instance": true,
			"adminRequired": false,
			"response": {
				"singleElement": true
			},
			"parameters": [
				{
					"name": "post_id",
					"description": "Post ID to show.\n\nEither `post_id` **or** `post_ids` must be specified.\n",
					"type": "String"
				},
				{
					"name": "post_ids",
					"description": "Comma-separated list of post IDs.\n\nEither `post_id` **or** `post_ids` must be specified.\n",
					"type": "Array"
				},
				{
					"name": "response_json_depth",
					"description": "Nested object depth level counts in response JSON.\n\nIn order to reduce server API calls from an application, the response JSON may\ninclude not just the identified objects, but also\nsome important data related to the returned objects such as object's owner or\nreferenced objects.\n\nDefault is 1, valid range is 1 to 8.\n",
					"type": "Number"
				},
				{
					"name": "show_user_like",
					"description": "If set to **true** the Post object in the response will include `\"current_user_liked: true\"`\nif the current user has liked the object. If the user has not liked the object, the \n`current_user_liked` field is not included in the response.\n",
					"type": "Boolean"
				},
				{
					"name": "pretty_json",
					"description": "Determines if the JSON response is formatted for readability (`true`), or displayed on a\nsingle line (`false`). Default is `false`.\n",
					"type": "Boolean"
				}
			]
		},
		"delete": {
			"summary": "Delete a Post",
			"description": "Deletes the post with the given `id`. The original submitter can always delete a post.  The primary photo associated with the object is not deleted.          An application admin can delete any Post object. ",
			"authRequired": true,
			"instance": true,
			"adminRequired": false,
			"response": {
				"singleElement": true
			},
			"parameters": [
				{
					"name": "post_id",
					"description": "ID of the post to delete.",
					"type": "String"
				},
				{
					"name": "su_id",
					"description": "User ID to delete the Post object on behalf of. The user must be the creator of the object.\n\nThe current login user must be an application admin to delete a Post object on\nbehalf of another user.\n",
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
			"summary": "Create Post",
			"description": "Create a post, which can be a Facebook-style wall post or Digg-style submission with content. ",
			"authRequired": true,
			"instance": true,
			"adminRequired": false,
			"response": {
				"singleElement": true
			},
			"parameters": [
				{
					"name": "content",
					"description": "Text content of the post.",
					"type": "String",
					"required": true
				},
				{
					"name": "title",
					"description": "Title of the post.",
					"type": "String"
				},
				{
					"name": "event_id",
					"description": "ID of the Events this post belongs to.",
					"type": "String"
				},
				{
					"name": "photo",
					"description": "New photo to attach as the primary photo for this object.\n\nWhen you use the `photo` parameter to attach a new photo, you can use the\n[custom resize and sync options](#!/guide/photosizes).\n",
					"type": "Photos"
				},
				{
					"name": "photo_id",
					"description": "ID of an existing photo to attach as the primary photo for this object.\n",
					"type": "String"
				},
				{
					"name": "tags",
					"description": "Comma separated list of tags for this object.\n",
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
					"description": "Name of an ACLs to associate with this object.\n\nAn ACL can be specified using `acl_name` or `acl_id`. The two parameters are\nmutually exclusive.\n",
					"type": "String"
				},
				{
					"name": "acl_id",
					"description": "ID of an ACLs to associate with this object.\n\nAn ACL can be specified using `acl_name` or `acl_id`. The two parameters are\nmutually exclusive.\n",
					"type": "String"
				},
				{
					"name": "su_id",
					"description": "User ID to create the object on behalf of.\n\nThe current login user must be an application admin to create an object on\nbehalf of another user.\n",
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
			"summary": "Update a Post",
			"description": "Updates the identified post. The original submitter can always update a post.  An application admin can update any Post object. ",
			"authRequired": true,
			"instance": true,
			"adminRequired": false,
			"response": {
				"singleElement": true
			},
			"parameters": [
				{
					"name": "post_id",
					"description": "ID of the post to update.",
					"type": "String",
					"required": true
				},
				{
					"name": "content",
					"description": "Text content of the post.",
					"type": "String",
					"required": true
				},
				{
					"name": "title",
					"description": "Title of the post.",
					"type": "String"
				},
				{
					"name": "event_id",
					"description": "ID of the Events this post belongs to.",
					"type": "String"
				},
				{
					"name": "photo",
					"description": "New photo to attach as the primary photo for this object.\n\nWhen you use the `photo` parameter to attach a new photo, you can use the\n[custom resize and sync options](#!/guide/photosizes).\n",
					"type": "Photos"
				},
				{
					"name": "photo_id",
					"description": "ID of an existing photo to attach as the primary photo for this object.\n",
					"type": "String"
				},
				{
					"name": "tags",
					"description": "Comma separated list of tags for this object.\n",
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
					"description": "Name of an ACLs to associate with this object.\n\nAn ACL can be specified using `acl_name` or `acl_id`. The two parameters are\nmutually exclusive.\n\nTo remove an ACL, set `acl_name` or `acl_id` to an empty string.\n",
					"type": "String"
				},
				{
					"name": "acl_id",
					"description": "ID of an ACLs to associate with this object.\n\nAn ACL can be specified using `acl_name` or `acl_id`. The two parameters are\nmutually exclusive.\n\nTo remove an ACL, set `acl_name` or `acl_id` to an empty string.\n",
					"type": "String"
				},
				{
					"name": "su_id",
					"description": "User ID to update the Post object on behalf of. The user must be the creator of the object.\n\nThe current login user must be an application admin to update a Post object on\nbehalf of another user.\n",
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
			"summary": "Custom Query Posts",
			"description": "Performs custom query of posts with sorting and pagination. Currently you can not query or sort data stored inside array or hash in custom fields.  In addition to custom fields, the following pre-defined fields in posts that can be queried and sorted:  *   `user_id` : `String`. Post owner's user ID. *   `title` : `String`. Post title. *   `event_id` : `String`. ID of the event posts belong to. *   `tags_array` : `String`. Post tags. *   `ratings_average` : `Number`. Post's average rating. See {@Reviews}. *   `ratings_count` : `Number`. Post's total number of ratings. See {@Reviews}. *   `reviews_count` : `Number`. Post's total number of reviews. See {@Reviews}. *   `created_at` : `Date`. Timestamp when the post was created. *   `updated_at` : `Date`. Timestamp when the post was last updated.  In ACS 1.1.5 and later, you can paginate query results using `skip` and `limit` parameters, or by including a `where` clause to limit the results to objects whose IDs fall within a specified range. For details, see [Query Pagination](#!/guide/search_query-section-query-pagination).          For details about using the query parameters, see the [Search and Query guide](#!/guide/search_query). ",
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
					"description": "If set to **true**, each Post object in the response includes `\"current_user_liked: true\"`\n if the current user has liked the object. If the user has not liked the object, the \n`current_user_liked` field is not included in the response.\n",
					"type": "Boolean"
				},
				{
					"name": "unsel",
					"description": "Selects the object fields NOT to display. Do not use this parameter with `sel`.\n",
					"type": "Hash"
				},
				{
					"name": "response_json_depth",
					"description": "Nested object depth level counts in the response JSON.\n\nIn order to reduce server API calls from an application, the response JSON may\ninclude not just the objects that are being queried/searched, but also\nsome important data related to the returned objects, such as owners and\nreferenced objects.\n\nDefault is 1, valid range is 1 to 8.\n",
					"type": "Number"
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
				defaultValue.post_id = instance.getPrimaryKey();
				return defaultValue;
			case 'delete':
				return {
					post_id: instance.getPrimaryKey()
				};
		}
		return defaultValue;
	},

	actions: ["delete","create","update","read"]
});
