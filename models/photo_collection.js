'use strict';

var Arrow = require("arrow");

/*
 The PhotoCollections model.
 */
module.exports = Arrow.Model.extend("appc.arrowdb/photo_collection", {
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
		"counts": {
			// "originalType": "Hash",
			"type": Object,
			"description": "Object with fields:   *   `photos: Number`. Number of photos in this collection. *   `total_photos: Number`.  Number of photos in this collection and subcollections. *   `subcollections: Number`. Number of subcollections in this collection. "
		},
		"cover_photo": {
			// "originalType": "Photos",
			"type": Array,
			"description": "Photo to use as a cover photo for the collection."
		},
		"created_at": {
			// "originalType": "Date",
			"type": Date,
			"description": "Creation date for this user object."
		},
		"name": {
			// "originalType": "String",
			"type": String,
			"description": "Name of the collection."
		},
		"parent_collection": {
			// "originalType": "PhotoCollections",
			"type": Array,
			"description": "Collection object that contains this subcollection."
		},
		"updated_at": {
			// "originalType": "Date",
			"type": Date,
			"description": "Last update time for this user object."
		},
		"user": {
			// "originalType": "Users",
			"type": Array,
			"description": "Owner of this collection."
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
			"summary": "Delete a Photo Collection",
			"description": "Delete an empty collection. An error will be returned if a collection contains any photos or subcollections.  An application admin can delete any photo collection. The #cover_photo associated  with the collection is not deleted. ",
			"authRequired": true,
			"instance": true,
			"adminRequired": false,
			"response": {
				"singleElement": true
			},
			"parameters": [
				{
					"name": "collection_id",
					"description": "ID of the collection to delete.",
					"type": "String",
					"required": true
				},
				{
					"name": "su_id",
					"description": "User ID to delete the collection on behalf of. The user must be the creator of the collection.\n\nThe current login user must be an application admin to delete a collection on\nbehalf of another user.\n",
					"type": "String"
				},
				{
					"name": "pretty_json",
					"description": "Determines if the JSON response is formatted for readability (`true`), or displayed on a\nsingle line (`false`). Default is `false`.\n",
					"type": "Boolean"
				}
			]
		},
		"showPhotos": {
			"summary": "Show Photos in a Collection",
			"description": "Show photos in a collection. ",
			"authRequired": false,
			"instance": true,
			"adminRequired": false,
			"response": {
				"singleElement": true
			},
			"parameters": [
				{
					"name": "collection_id",
					"description": "ID of the collection to retrieve photos from.",
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
					"description": "Nested object depth level counts in the response JSON.\n\nIn order to reduce server API calls from an application, the response JSON may\ninclude not just the objects that are being queried/searched, but also\nsome important data related to the returned objects such as the object's owner or\nreferenced objects.\n\nDefault is 1, valid range is 1 to 8.\n",
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
			"summary": "Search Photo Collections",
			"description": "Search for top-level collections owned by the given user. Subcollections cannot be found this way. See Show Subcollections to view the subcollections of a collection. ",
			"authRequired": false,
			"instance": true,
			"adminRequired": false,
			"parameters": [
				{
					"name": "user_id",
					"description": "ID of the user to find collections for.",
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
					"description": "Nested object depth level counts in response JSON.\n\nIn order to reduce server API calls from an application, the response JSON may\ninclude not just the objects that are being queried/searched, but also\nsome important data related to the returned objects such as object's owner and\nreferenced objects.\n\nDefault is 1, valid range is 1 to 8.\n",
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
			"summary": "Show a Photo Collection",
			"description": "Shows information about a collection including the cover photo, owner, parent collection, and counts of its contents. See Show Subcollections and Show Photos to view the contents of a collection. ",
			"authRequired": false,
			"instance": true,
			"adminRequired": false,
			"response": {
				"singleElement": true
			},
			"parameters": [
				{
					"name": "collection_id",
					"description": "ID of the collection to retrieve photos from.",
					"type": "String",
					"required": true
				},
				{
					"name": "response_json_depth",
					"description": "Nested object depth level counts in the response JSON.\n\nIn order to reduce server API calls from an application, the response JSON may\ninclude not just the objects that are being queried/searched, but also\nsome important data related to the returned objects such as the object's owner or\nreferenced objects.\n\nDefault is 1, valid range is 1 to 8.\n",
					"type": "Number"
				},
				{
					"name": "pretty_json",
					"description": "Determines if the JSON response is formatted for readability (`true`), or displayed on a\nsingle line (`false`). Default is `false`.\n",
					"type": "Boolean"
				}
			]
		},
		"batchDelete": {
			"summary": "Deletes multiple PhotoCollections objects.",
			"description": "Deletes PhotoCollections objects that match the query constraints provided in the `where` parameter. If no `where` parameter is provided, all PhotoCollections objects are deleted.  Note that an HTTP 200 code (success) is returned if the call completed successfully but the query matched no objects.  For performance reasons, the number of objects that can be deleted in a single batch delete  operation is limited to 100,000.  The matched objects are deleted asynchronously in a separate process.          The cover photo associated with any of the matched objects are not not deleted.  You must be an application admin to run this command.         ",
			"authRequired": true,
			"instance": true,
			"adminRequired": true,
			"response": {
				"singleElement": true
			},
			"parameters": [
				{
					"name": "where",
					"description": "Encoded JSON object that specifies constraint values for PhotoCollections objects to delete.\nIf not specified, all PhotoCollections objects are deleted.\n",
					"type": "Hash"
				}
			]
		},
		"update": {
			"summary": "Update a Photo Collection",
			"description": "Updates a photo collection.  An existing collection's cover photo can be added or updated by specifying a new `cover_photo_id`. The cover photo can be removed by sending an empty string as the value for `cover_photo_id`. Application Admin can update any Photo Collection. ",
			"authRequired": true,
			"instance": true,
			"adminRequired": false,
			"response": {
				"singleElement": true
			},
			"parameters": [
				{
					"name": "collection_id",
					"description": "ID of the collection to update.",
					"type": "String"
				},
				{
					"name": "name",
					"description": "New name of the collection. The name must be unique across other top-level\ncollections. If this is a sub-collection, the name must be unique across other\nsub-collections of the same parent.\n",
					"type": "String"
				},
				{
					"name": "cover_photo_id",
					"description": "ID of the photo to use as a cover photo. The photo does not need to be\nin the collection.\n",
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
					"description": "Name of an ACLs to associate with this collection.\n\nAn ACL can be specified using `acl_name` or `acl_id`. The two parameters are\nmutually exclusive.\n",
					"type": "String"
				},
				{
					"name": "acl_id",
					"description": "ID of an ACLs to associate with this collection.\n\nAn ACL can be specified using `acl_name` or `acl_id`. The two parameters are\nmutually exclusive.\n",
					"type": "String"
				},
				{
					"name": "su_id",
					"description": "User ID to update the collection on behalf of. The user must be the creator of the collection.\n\nThe current login user must be an application admin to update a collection on\nbehalf of another user.\n",
					"type": "String"
				},
				{
					"name": "pretty_json",
					"description": "Determines if the JSON response is formatted for readability (`true`), or displayed on a\nsingle line (`false`). Default is `false`.\n",
					"type": "Boolean"
				}
			]
		},
		"showSubcollections": {
			"summary": "Show Subcollections",
			"description": "Show subcollections of a collection. ",
			"authRequired": false,
			"instance": true,
			"adminRequired": false,
			"response": {
				"singleElement": true
			},
			"parameters": [
				{
					"name": "collection_id",
					"description": "ID of the collection to retrieve photos from.",
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
					"description": "Nested object depth level counts in the response JSON.\n\nIn order to reduce server API calls from an application, the response JSON may\ninclude not just the objects that are being queried/searched, but also\nsome important data related to the returned objects such as the object's owner or\nreferenced objects.\n\nDefault is 1, valid range is 1 to 8.\n",
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
			"summary": "Create a Photo Collection",
			"description": "Collections contain one or more photos and/or sub-collections. These can be used as photo albums for a user. To create a subcollection, specify a `parent_collection_id` when creating a collection. If the collection has been created or updated with a `cover_photo_id`, photo details will be returned with collection information. If a `cover_photo_id` has not been assigned, the first photo found in the collection or its sub-collections will be returned as the cover photo. ",
			"authRequired": true,
			"instance": true,
			"adminRequired": false,
			"response": {
				"singleElement": true
			},
			"parameters": [
				{
					"name": "name",
					"description": "Name of the collection. The name must be unique across other top-level\ncollections. If this is a sub-collection, the name must be unique across other\nsub-collections of the same parent.\n",
					"type": "String"
				},
				{
					"name": "parent_collection_id",
					"description": "Parent collection ID. Specify when creating a subcollection.\n",
					"type": "String"
				},
				{
					"name": "cover_photo_id",
					"description": "ID of the photo to use as a cover photo. The photo does not need to be\nin the collection.\n",
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
					"description": "Name of an ACLs to associate with this collection.\n\nAn ACL can be specified using `acl_name` or `acl_id`. The two parameters are\nmutually exclusive.\n",
					"type": "String"
				},
				{
					"name": "acl_id",
					"description": "ID of an ACLs to associate with this collection.\n\nAn ACL can be specified using `acl_name` or `acl_id`. The two parameters are\nmutually exclusive.\n",
					"type": "String"
				},
				{
					"name": "su_id",
					"description": "User ID to create the collection on behalf of.\n\nThe current login user must be an application admin to create a collection on\nbehalf of another user.\n",
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
				defaultValue.photo_collection_id = instance.getPrimaryKey();
				return defaultValue;
			case 'delete':
				return {
					photo_collection_id: instance.getPrimaryKey()
				};
		}
		return defaultValue;
	},

	actions: ["delete","update","create"]
});
