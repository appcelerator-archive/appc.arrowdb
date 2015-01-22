'use strict';

var APIBuilder = require("apibuilder");

/*
 The Places model.
 */
module.exports = APIBuilder.Model.extend("place", {
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
			"description": "Place name."
		},
		"address": {
			// "originalType": "String",
			"type": String,
			"description": "Address."
		},
		"city": {
			// "originalType": "String",
			"type": String,
			"description": "City."
		},
		"state": {
			// "originalType": "String",
			"type": String,
			"description": "State."
		},
		"postal_code": {
			// "originalType": "String",
			"type": String,
			"description": "Postal or ZIP code."
		},
		"country": {
			// "originalType": "String",
			"type": String,
			"description": "Country."
		},
		"latitude": {
			// "originalType": "Number",
			"type": Number,
			"description": "Latitude."
		},
		"longitude": {
			// "originalType": "Number",
			"type": Number,
			"description": "Longitude."
		},
		"website": {
			// "originalType": "String",
			"type": String,
			"description": "Website."
		},
		"twitter": {
			// "originalType": "String",
			"type": String,
			"description": "Twitter ID."
		},
		"phone_number": {
			// "originalType": "String",
			"type": String,
			"description": "Phone number."
		},
		"photo": {
			// "originalType": "Photos",
			"type": Array,
			"description": "Primary photo for this place."
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
			"description": "Single-element array containing the ACL associated with this object, if any."
		},
		"user": {
			// "originalType": "Users",
			"type": Array,
			"description": "Owner of this place object."
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
		}
	},
	/*
	 Methods for this model.
	 */
	methodMeta: {
		"batchDelete": {
			"summary": "Deletes multiple Places objects.",
			"description": "Deletes Places objects that match the query constraints provided in the `where` parameter.\nIf no `where` parameter is provided, all Places objects are deleted. \nNote that an HTTP 200 code (success)\nis returned if the call completed successfully but the query matched no objects.\n\nFor performance reasons, the number of objects that can be deleted in a single batch delete \noperation is limited to 100,000.\n\nThe matched objects are deleted asynchronously in a separate process.     \n\nAny primary photos associated with the matched objects are not deleted.\n\nYou must be an application admin to run this command.        \n",
			"authRequired": true,
			"instance": true,
			"adminRequired": true,
			"response": {
				"singleElement": true
			},
			"parameters": [
				{
					"name": "where",
					"description": "Encoded JSON object that specifies constraint values for Places objects to delete.\nIf not specified, all Places objects are deleted.\n",
					"type": "Hash"
				}
			]
		},
		"create": {
			"summary": "Create a Place",
			"description": "Creates a new place object.\n\nTo create a place, you must specify at least one of the following:\naddress, city, state, postal_code, country, or geographical coordinates (longitude and latitude).\n",
			"authRequired": true,
			"instance": true,
			"adminRequired": false,
			"response": {
				"singleElement": true
			},
			"parameters": [
				{
					"name": "name",
					"description": "Place name.",
					"type": "String",
					"required": true
				},
				{
					"name": "address",
					"description": "Address.",
					"type": "String"
				},
				{
					"name": "city",
					"description": "City.",
					"type": "String"
				},
				{
					"name": "state",
					"description": "State.",
					"type": "String"
				},
				{
					"name": "postal_code",
					"description": "Postal or ZIP code.",
					"type": "String"
				},
				{
					"name": "country",
					"description": "Country.",
					"type": "String"
				},
				{
					"name": "latitude",
					"description": "Latitude.",
					"type": "Number"
				},
				{
					"name": "longitude",
					"description": "Longitude.",
					"type": "Number"
				},
				{
					"name": "website",
					"description": "Website URL.",
					"type": "String"
				},
				{
					"name": "twitter",
					"description": "Twitter ID.",
					"type": "String"
				},
				{
					"name": "phone_number",
					"description": "Phone number.",
					"type": "String"
				},
				{
					"name": "photo",
					"description": "New photo to attach as the primary photo for this place.\n\nWhen you use the `photo` parameter to attach a new photo, you can use the\n[custom resize and sync options](#!/guide/photosizes).\n",
					"type": "Photos"
				},
				{
					"name": "photo_id",
					"description": "ID of an existing photo to attach as the primary photo for this place.\n",
					"type": "String"
				},
				{
					"name": "tags",
					"description": "Comma separated list of tags for this place.\n",
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
					"description": "Name of an ACLs to associate with this place object.\n\nAn ACL can be specified using `acl_name` or `acl_id`. The two parameters are\nmutually exclusive.\n",
					"type": "String"
				},
				{
					"name": "acl_id",
					"description": "ID of an ACLs to associate with this place object.\n\nAn ACL can be specified using `acl_name` or `acl_id`. The two parameters are\nmutually exclusive.\n",
					"type": "String"
				},
				{
					"name": "user_id",
					"description": "User ID to create this place on behalf of.\n\nThe current login user must be an application admin to create a place on\nbehalf of another user.\n",
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
			"summary": "Delete a Place",
			"description": "Deletes a place.\n\nOnly the user who created the place can delete it.\n\nThe primary photo associated with the object is not deleted.\n\nAn application admin can delete any Place object.\n",
			"authRequired": true,
			"instance": true,
			"adminRequired": false,
			"response": {
				"singleElement": true
			},
			"parameters": [
				{
					"name": "place_id",
					"description": "ID of the place to delete.",
					"type": "String",
					"required": true
				},
				{
					"name": "user_id",
					"description": "User ID to delete the Place object on behalf of. The user must be the creator of the object.\n\nThe current login user must be an application admin to delete a Place object on\nbehalf of another user.\n",
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
			"summary": "Custom Query Places",
			"description": "Performs custom query of places with sorting and paginating. Currently you can\nnot query or sort data stored inside array or hash in custom fields.\n\nThe following fields can be used for querying and sorting places:\n\n*   `address` : String.  Place address.\n*   `city` : String.  Place city.\n*   `state` : String. Place state.\n*   `country` : String.  Country.\n*   `user_id` : String. ID of the user who created this place.\n*   `google_cid` : Google Customer ID (CID) associated with this place.\n*   `tags_array` : String. Search tags.\n*   `lnglat` : `[longitude, latitude]`. The Place's default coordinates. You can also store\n     custom coordinates in a custom field and query for those coordinates separately \n     (see [Geographic Coordinates in Custom Fields](#!/guide/customfields-section-geographic-coordinates-in-custom-fields)).\n*   `ratings_average:  Number`.  Place's average rating (see Reviews).\n*   `ratings_count: Number`. Place's total number of ratings (see Reviews).\n*   `reviews_count: Number`. Place's total number of reviews (see Reviews).\n*   `created_at: Date`. Timestamp when the photo was created.\n*   `updated_at: Date`. Timestamp when the photo was updated.\n\nIn ACS 1.1.5 and later, you can paginate query results using `skip` and `limit` parameters, or by including\na `where` clause to limit the results to objects whose IDs fall within a specified range.\nFor details, see [Query Pagination](#!/guide/search_query-section-query-pagination).\n\nFor details about using the query parameters,\nsee the [Search and Query guide](#!/guide/search_query).\n",
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
					"description": "If set to **true**, each Place object in the response includes `\"current_user_liked: true\"`\n if the current user has liked the object. If the user has not liked the object, the \n`current_user_liked` field is not included in the response.\n",
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
		"search": {
			"summary": "Search Places",
			"description": "Returns the list of places that have been added to the app, sorted by search\nrelevancy.\n\nOptionally, `latitude` and `longitude` can be given to return the list of\nplaces starting from a particular location. To bound the results within a\ncertain radius (in km) from the starting coordinates, add the `distance`\nparameter. `q` can be given to search by place name.\n\nIf you have provided a starting latitude and longitude for place search, each\nresult will return a distance to the starting point in km.\n",
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
					"description": "Nested object depth level counts in the response JSON.\n\nIn order to reduce server API calls from an application, the response JSON may\ninclude not just the objects that are being queried/searched, but also\nsome important data related to the returned objects, such as owners and\nreferenced objects.\n\nDefault is 1, valid range is 1 to 8.\n",
					"type": "Number"
				},
				{
					"name": "latitude",
					"description": "Latitude to center search on.",
					"type": "Number"
				},
				{
					"name": "longitude",
					"description": "Longitude to center search on.",
					"type": "Number"
				},
				{
					"name": "distance",
					"description": "Distance in km to search from the identified center point.",
					"type": "Number"
				},
				{
					"name": "q",
					"description": "Space-separated list of keywords used to perform full text search on place name and tags.",
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
			"summary": "Show a Place",
			"description": "Returns information for the identified place.",
			"authRequired": false,
			"instance": true,
			"adminRequired": false,
			"response": {
				"singleElement": true
			},
			"parameters": [
				{
					"name": "place_id",
					"description": "ID of the place to show.",
					"type": "String",
					"required": true
				},
				{
					"name": "response_json_depth",
					"description": "Nested object depth level counts in the response JSON.\n\nIn order to reduce server API calls from an application, the response JSON may\ninclude not just the identified object, but also\nsome important data related to the returned objects, such as owners and\nreferenced objects.\n\nDefault is 1, valid range is 1 to 8.\n",
					"type": "Number"
				},
				{
					"name": "show_user_like",
					"description": "If set to **true** the Place object in the response will include `\"current_user_liked: true\"`\nif the current user has liked the object. If the user has not liked the object, the \n`current_user_liked` field is not included in the response.\n",
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
			"summary": "Update a Place",
			"description": "Any of the parameters used to Create a Place can\nbe used to update it as well. Only the user that created the place can update\nit.\n\nAn application admin can update any place object.\n",
			"authRequired": true,
			"instance": true,
			"adminRequired": false,
			"response": {
				"singleElement": true
			},
			"parameters": [
				{
					"name": "place_id",
					"description": "ID of the place to delete.",
					"type": "String",
					"required": true
				},
				{
					"name": "name",
					"description": "Place name.",
					"type": "String"
				},
				{
					"name": "address",
					"description": "Address.",
					"type": "String"
				},
				{
					"name": "city",
					"description": "City.",
					"type": "String"
				},
				{
					"name": "state",
					"description": "State.",
					"type": "String"
				},
				{
					"name": "postal_code",
					"description": "Postal or ZIP code.",
					"type": "String"
				},
				{
					"name": "country",
					"description": "Country.",
					"type": "String"
				},
				{
					"name": "latitude",
					"description": "Latitude.",
					"type": "Number"
				},
				{
					"name": "longitude",
					"description": "Longitude.",
					"type": "Number"
				},
				{
					"name": "website",
					"description": "Website URL.",
					"type": "String"
				},
				{
					"name": "twitter",
					"description": "Twitter ID.",
					"type": "String"
				},
				{
					"name": "phone_number",
					"description": "Phone number.",
					"type": "String"
				},
				{
					"name": "photo",
					"description": "New photo to attach as the primary photo for this place.\n\nWhen you use the `photo` parameter to attach a new photo, you can use the\n[custom resize and sync options](#!/guide/photosizes).\n",
					"type": "Photos"
				},
				{
					"name": "photo_id",
					"description": "ID of an existing photo to attach as the primary photo for this place.\n",
					"type": "String"
				},
				{
					"name": "tags",
					"description": "Comma separated list of tags for this place.\n",
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
					"description": "Name of an ACLs to associate with this place object.\n\nAn ACL can be specified using `acl_name` or `acl_id`. The two parameters are\nmutually exclusive.\n",
					"type": "String"
				},
				{
					"name": "acl_id",
					"description": "ID of an ACLs to associate with this place object.\n\nAn ACL can be specified using `acl_name` or `acl_id`. The two parameters are\nmutually exclusive.\n",
					"type": "String"
				},
				{
					"name": "user_id",
					"description": "User ID to update the Place object on behalf of. The user must be the creator of the object.\n\nThe current login user must be an application admin to update a Place object on\nbehalf of another user.\n",
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
				defaultValue.place_id = instance.getPrimaryKey();
				return defaultValue;
			case 'delete':
				return {
					place_id: instance.getPrimaryKey()
				};
		}
		return defaultValue;
	}
});
