'use strict';

var Arrow = require("arrow");

/*
 The Reviews model.
 */
module.exports = Arrow.Model.extend("appc.arrowdb/review", {
	/**
	 * Remove _generated property or set it to false if you want to prevent syncModels.js from changing this file.
	 */
	_generated: true,

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
		"content": {
			// "originalType": "String",
			"type": String,
			"description": "Review or comment text."
		},
		"rating": {
			// "originalType": "String",
			"type": String,
			"description": "Rating associated with review."
		},
		"tags": {
			// "originalType": "Array",
			"type": Array,
			"description": "List of tags for this review."
		},
		"custom_fields": {
			// "originalType": "String,Hash",
			"type": Object,
			"description": "User defined fields. See [Custom Data Fields](#!/guide/customfields)."
		},
		"event": {
			// "originalType": "Events",
			"type": Array,
			"description": "Event object associated with this review."
		},
		"checkin": {
			// "originalType": "Checkins",
			"type": Array,
			"description": "Checkin object associated with this review."
		},
		"photo": {
			// "originalType": "Photos",
			"type": Array,
			"description": "Photo object associated with this review."
		},
		"post": {
			// "originalType": "Posts",
			"type": Array,
			"description": "Post object associated with this review."
		},
		"place": {
			// "originalType": "Places",
			"type": Array,
			"description": "Place object associated with this review."
		},
		"custom_object": {
			// "originalType": "CustomObjects",
			"type": Array,
			"description": "Custom object associated with this review."
		},
		"status": {
			// "originalType": "Statuses",
			"type": Array,
			"description": "Status object associated with this review."
		},
		"reviewed_object": {
			// "originalType": "Hash",
			"type": Object,
			"description": "Object whose `type` and `id` fields identify, respectively, the type (Status or Photo, for example) and  the ID of the reviewed object. "
		},
		"review": {
			// "originalType": "Reviews",
			"type": Array,
			"description": "Review object associated with this review."
		},
		"created_at": {
			// "originalType": "Date",
			"type": Date,
			"description": "Creation date for this review object."
		},
		"updated_at": {
			// "originalType": "Date",
			"type": Date,
			"description": "Last update time for this review object."
		},
		"user": {
			// "originalType": "Users",
			"type": Array,
			"description": "User who created the review."
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
		"delete": {
			"summary": "",
			"description": "Delete the review (comment) with the given `id`. Only the original submitter can delete the review. If the review has a rating attached to it, deleting the review will update the average rating and rating summary.  To delete a review, you must specify **both** the ID of the review and the ID of the reviewed object (Post, Photo, User, Event,  Checkin, Place, CustomObject,  Status, or Review. The reviewed object is not deleted, however.  An application admin can delete any Review object. ",
			"authRequired": true,
			"instance": true,
			"adminRequired": false,
			"response": {
				"singleElement": true
			},
			"parameters": [
				{
					"name": "review_id",
					"description": "Review object to delete.",
					"type": "String",
					"required": true
				},
				{
					"name": "pretty_json",
					"description": "Determines if the JSON response is formatted for readability (`true`), or displayed on a\nsingle line (`false`). Default is `false`.\n",
					"type": "Boolean"
				}
			]
		},
		"batchDelete": {
			"summary": "Deletes multiple Reviews objects.",
			"description": "Deletes Reviews objects that match the query constraints provided in the `where` parameter. If no `where` parameter is provided, all Reviews objects are deleted.  Note that an HTTP 200 code (success) is returned if the call completed successfully but the query matched no objects.  For performance reasons, the number of objects that can be deleted in a single batch delete  operation is limited to 100,000.  The matched objects are deleted asynchronously in a separate process.                The reviewed object (Post, Photo, User, Event,  Checkin, Place, CustomObject,  Status, or Review) of each matched object is not deleted.  You must be an application admin to run this command.         ",
			"authRequired": true,
			"instance": true,
			"adminRequired": true,
			"response": {
				"singleElement": true
			},
			"parameters": [
				{
					"name": "where",
					"description": "Encoded JSON object that specifies constraint values for Reviews objects to delete.\nIf not specified, all Reviews objects are deleted.\n",
					"type": "Hash"
				}
			]
		},
		"show": {
			"summary": "Show a review",
			"description": "Shows the review with the given `id`.  ",
			"authRequired": false,
			"instance": true,
			"adminRequired": false,
			"response": {
				"singleElement": true
			},
			"parameters": [
				{
					"name": "review_id",
					"description": "Review object to show.",
					"type": "String",
					"required": true
				},
				{
					"name": "show_user_like",
					"description": "If set to **true** the Review object in the response will include `\"current_user_liked: true\"`\nif the current user has liked the object. If the user has not liked the object, the \n`current_user_liked` field is not included in the response.\n",
					"type": "Boolean"
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
			"summary": "Update a Review/Comment/Rating/Like",
			"description": "Updates the review with the given `id`.  Ordinary users can update reviews they own or have update access to.  An application admin can update a Review on behalf of another user by  specifying that user's ID in the `user_id` method parameter. ",
			"authRequired": true,
			"instance": true,
			"adminRequired": false,
			"response": {
				"singleElement": true
			},
			"parameters": [
				{
					"name": "post_id",
					"description": "ID of the Posts object to review.\n",
					"type": "String"
				},
				{
					"name": "photo_id",
					"description": "ID of the Photos object to review.\n",
					"type": "String"
				},
				{
					"name": "user_object_id",
					"description": "ID of the Users object to review.\n",
					"type": "String"
				},
				{
					"name": "event_id",
					"description": "ID of the Events object to review.\n",
					"type": "String"
				},
				{
					"name": "place_id",
					"description": "ID of the Places object to review.\n",
					"type": "String"
				},
				{
					"name": "checkin_id",
					"description": "ID of the Checkins object to review.\n",
					"type": "String"
				},
				{
					"name": "review_object_id",
					"description": "ID of the Reviews object to review.\n",
					"type": "String"
				},
				{
					"name": "custom_object_id",
					"description": "ID of the CustomObjects object to review.\n",
					"type": "String"
				},
				{
					"name": "status_id",
					"description": "ID of the Statuses object to review.\n",
					"type": "String"
				},
				{
					"name": "review_id",
					"description": "ID of the Review object to update.",
					"type": "String",
					"required": true
				},
				{
					"name": "content",
					"description": "Review or comment text.",
					"type": "String"
				},
				{
					"name": "rating",
					"description": "Rating to be associated with review. You can use \"1\" to represent one Like.",
					"type": "String"
				},
				{
					"name": "su_id",
					"description": "ID of the Users object to update the review on behalf of. The currently \nlogged-in user must be an application admin to create a review on\nbehalf of another user.        \n",
					"type": "String"
				},
				{
					"name": "allow_duplicate",
					"description": "By default, the same user can only submit one review/comment per object.\nSet this flag to `true` to allow the user to add multiple  reviews or comments to\nthe same object.\n",
					"type": "Boolean"
				},
				{
					"name": "tags",
					"description": "Comma separated list of tags for this review.\n",
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
					"name": "pretty_json",
					"description": "Determines if the JSON response is formatted for readability (`true`), or displayed on a\nsingle line (`false`). Default is `false`.\n",
					"type": "Boolean"
				}
			]
		},
		"query": {
			"summary": "Custom Query Reviews/Comments/Ratings/Likes",
			"description": "Perform custom query of reviews with sorting and paginating. Currently you can not query or sort data stored inside array or hash in custom fields.  The query must be limited to reviews of a given object (by specifying one of `post_id`, `photo_id`, etc.) or limited to reviews generated by a given user (by specifying `owner_id`.  In addition to custom fields, the following pre-defined fields can be used to query and sort reviews:  *   `user_id` : `String`. Review owner's user ID. *   `rating` : `Integer`. Rating assigned to this review. *   `tags_array` : `String`. Tags associated with the review. *   `created_at` : `Date`. Timestamp when the review was created. *   `updated_at` : `Date`. Timestamp when the review was last updated.  In ACS 1.1.5 and later, you can paginate query results using `skip` and `limit` parameters, or by including a `where` clause to limit the results to objects whose IDs fall within a specified range. For details, see [Query Pagination](#!/guide/search_query-section-query-pagination).          For details about using the query parameters, see the [Search and Query guide](#!/guide/search_query). ",
			"authRequired": false,
			"instance": true,
			"adminRequired": false,
			"parameters": [
				{
					"name": "post_id",
					"description": "Limit query to reviews on the identified Post object.",
					"type": "String"
				},
				{
					"name": "photo_id",
					"description": "Limit query to reviews on the identified Photo object.",
					"type": "String"
				},
				{
					"name": "user_id",
					"description": "Limit query to reviews on the identified User object.",
					"type": "String"
				},
				{
					"name": "event_id",
					"description": "Limit query to reviews on the identified Event object.",
					"type": "String"
				},
				{
					"name": "place_id",
					"description": "Limit query to reviews on the identified Place object.",
					"type": "String"
				},
				{
					"name": "checkin_id",
					"description": "Limit query to reviews on the identified Checkin object.",
					"type": "String"
				},
				{
					"name": "review_id",
					"description": "Limit query to reviews on the identified Review object.",
					"type": "String"
				},
				{
					"name": "custom_object_id",
					"description": "Limit query to reviews on the identified Custom object.",
					"type": "String"
				},
				{
					"name": "status_id",
					"description": "Limit query to reviews on the identified Status object.",
					"type": "String"
				},
				{
					"name": "owner_id",
					"description": "Limit query results to reviews submitted by the identified  user.",
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
					"description": "If set to **true**, each Review object in the response includes `\"current_user_liked: true\"`\n if the current user has liked the object. If the user has not liked the object, the \n`current_user_liked` field is not included in the response.\n",
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
		"create": {
			"summary": "Create Review/Comment/Rating/Like",
			"description": "Adds a review with an optional integer rating. You can also use this API to add comments or likes.  Once an object has one or more reviews (comments) attached to it, it will return a total review count, rating_count, average rating and a breakdown of each rating value:      \"reviews_count\": 2,     \"ratings_count\": 2,     \"ratings_average\": 150.0,     \"ratings_summary\": {       \"100\": 1,       \"200\": 1     },  To create a review, you must specify a target object using one of the `_id` parameters,  such as `photo_id` or `post_id`. Only one `_id` parameter may be specified in a request. To specify a User to review, use the the `user_object_id` parameter.  An application admin can create a review on behalf of another user by  specifying that user's ID in the `user_id` method parameter.   A review must include either `content` or `rating`. It can also include both.  ",
			"authRequired": true,
			"instance": true,
			"adminRequired": false,
			"response": {
				"singleElement": true
			},
			"parameters": [
				{
					"name": "post_id",
					"description": "ID of the Posts object to review.\n",
					"type": "String"
				},
				{
					"name": "photo_id",
					"description": "ID of the Photos object to review.\n",
					"type": "String"
				},
				{
					"name": "user_object_id",
					"description": "ID of the Users object to review.\n",
					"type": "String"
				},
				{
					"name": "event_id",
					"description": "ID of the Events object to review.\n",
					"type": "String"
				},
				{
					"name": "place_id",
					"description": "ID of the Places object to review.\n",
					"type": "String"
				},
				{
					"name": "checkin_id",
					"description": "ID of the Checkins object to review.\n",
					"type": "String"
				},
				{
					"name": "review_id",
					"description": "ID of the Reviews object to review.\n",
					"type": "String"
				},
				{
					"name": "custom_object_id",
					"description": "ID of the CustomObjects object to review.\n",
					"type": "String"
				},
				{
					"name": "status_id",
					"description": "ID of the Statuses object to review.\n",
					"type": "String"
				},
				{
					"name": "content",
					"description": "Review or comment text.\n",
					"type": "String"
				},
				{
					"name": "rating",
					"description": "Rating to be associated with review. You can use \"1\" to represent one Like.",
					"type": "String"
				},
				{
					"name": "allow_duplicate",
					"description": "By default, the same user can only submit one review/comment per object.\nSet this flag to `true` to allow the user to add multiple  reviews or comments to\nthe same object.\n",
					"type": "Boolean"
				},
				{
					"name": "tags",
					"description": "Comma separated list of tags for this review.\n",
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
					"description": "ID of the Users object to create the review on behalf of.\n\nThe currently logged-in user must be an application admin to create a review on\nbehalf of another user.\n",
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
				defaultValue.review_id = instance.getPrimaryKey();
				return defaultValue;
			case 'delete':
				return {
					review_id: instance.getPrimaryKey()
				};
		}
		return defaultValue;
	},

	actions: ["delete","update","read","create"]
});
