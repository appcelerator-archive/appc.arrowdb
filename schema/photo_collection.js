'use strict'

/*
 The PhotoCollections model.
 */
module.exports = {
  name: 'photoCollection',
  objectName: 'PhotoCollections',

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
    'counts': {
            // "originalType": "Hash",
      'type': Object,
      'description': 'Object with fields:\n\n `photos: Number`. Number of photos in this collection.\n `total_photos: Number`. Number of photos in this collection and subcollections.\n `subcollections: Number`. Number of subcollections in this collection.'
    },
    'cover_photo_id': {
            // "originalType": "String",
      'type': String,
      'description': 'ID of the photo to use as a cover photo for the collection.'
    },
    'created_at': {
            // "originalType": "Date",
      'type': Date,
      'description': 'Creation date for this user object.'
    },
    'name': {
            // "originalType": "String",
      'type': String,
      'description': 'Name of the collection.'
    },
    'parent_collection_id': {
            // "originalType": "String",
      'type': String,
      'description': 'ID of the collection object that contains this subcollection.'
    },
    'updated_at': {
            // "originalType": "Date",
      'type': Date,
      'description': 'Last update time for this user object.'
    },
    'user_id': {
            // "originalType": "String",
      'type': String,
      'description': 'ID of the owner of this collection.'
    }
  },
  /*
  Methods for this model.
  */
  methodMeta: {
    'delete': {
      'summary': 'Delete a PhotoCollection',
      'description': 'Delete an empty collection. An error will be returned if a collection contains any photos or subcollections. An application admin can delete any photo collection. The [cover_photo](http://docs.appcelerator.com/arrowdb/latest/#!/api/PhotoCollections-property-cover_photo) associated with the collection is not deleted. ',
      'authRequired': true,
      'instance': true,
      'adminRequired': false,
      'response': {
        'singleElement': true
      },
      'parameters': [
        {
          'name': 'collection_id',
          'description': 'ID of the collection to delete.\n',
          'type': 'String',
          'required': true
        },
        {
          'name': 'su_id',
          'description': 'User ID to delete the collection on behalf of. The user must be the creator of the collection.\n\nThe current login user must be an application admin to delete a collection on behalf of another user.\n',
          'type': 'String'
        },
        {
          'name': 'pretty_json',
          'description': 'Determines if the JSON response is formatted for readability (`true`), or displayed on a\nsingle line (`false`). Default is `false`.\n',
          'type': 'Boolean'
        }
      ]
    },
    'create': {
      'summary': 'Create a PhotoCollection',
      'description': 'Collections contain one or more photos and/or sub-collections. These can be used as photo albums for a user. To create a subcollection, specify a parent_collection_id when creating a collection. If the collection has been created or updated with a cover_photo_id, photo details will be returned with collection information. If a cover_photo_id has not been assigned, the first photo found in the collection or its sub-collections will be returned as the cover photo. ',
      'authRequired': true,
      'instance': true,
      'adminRequired': false,
      'response': {
        'name': 'collections',
        'model': 'photoCollection'
      },
      'parameters': [
        {
          'name': 'name',
          'description': 'Name of the collection. The name must be unique across other top-level collections. If this is a sub-collection, the name must be unique across other sub-collections of the same parent.\n',
          'type': 'String'
        },
        {
          'name': 'parent_collection_id',
          'description': 'Parent collection ID. Specify when creating a subcollection.\n',
          'type': 'String'
        },
        {
          'name': 'cover_photo_id',
          'description': 'ID of the photo to use as a cover photo. The photo does not need to be in the collection.\n',
          'type': 'String'
        },
        {
          'name': 'custom_fields',
          'description': 'User defined fields. See [Custom Data Fields](http://docs.appcelerator.com/arrowdb/latest/#!/guide/customfields).',
          'type': [
            'String',
            'Hash'
          ]
        },
        {
          'name': 'acl_name',
          'description': 'Name of an [ACLs](http://docs.appcelerator.com/arrowdb/latest/#!/api/ACLs) to associate with this collection.\n\nAn ACL can be specified using acl_name or acl_id. The two parameters are mutually exclusive.\n',
          'type': 'String'
        },
        {
          'name': 'acl_id',
          'description': 'ID of an [ACLs](http://docs.appcelerator.com/arrowdb/latest/#!/api/ACLs) to associate with this collection.\n\nAn ACL can be specified using acl_name or acl_id. The two parameters are mutually exclusive.\n',
          'type': 'String'
        },
        {
          'name': 'su_id',
          'description': 'User ID to create the photo on behalf of.\n\nThe current login user must be an application admin to create a photo on\nbehalf of another user.\n',
          'type': 'String'
        },
        {
          'name': 'pretty_json',
          'description': 'Determines if the JSON response is formatted for readability (`true`), or displayed on a\nsingle line (`false`). Default is `false`.\n',
          'type': 'Boolean'
        }
      ]
    },
    'show': {
      'summary': 'Show a PhotoCollection',
      'description': 'Shows information about a collection including the cover photo, owner, parent collection, and counts of its contents. See [Show Subcollections](http://docs.appcelerator.com/arrowdb/latest/#!/api/PhotoCollections-method-show_subcollections) and [Show Photos](http://docs.appcelerator.com/arrowdb/latest/#!/api/PhotoCollections-method-show_photos) to view the contents of a collection. ',
      'authRequired': false,
      'instance': true,
      'adminRequired': false,
      'parameters': [
        {
          'name': 'collection_id',
          'description': 'ID of the collection to retrieve photos from.\n',
          'type': 'String',
          'required': true
        },
        {
          'name': 'response_json_depth',
          'description': "Nested object depth level counts in response JSON.\n\nIn order to reduce server API calls from an application, the response JSON may\ninclude not just the objects that are being queried/searched, but also\nsome important data related to the returned objects such as object's owner or\nreferenced objects.\n\nDefault is 1, valid range is 1 to 8.\n",
          'type': 'Number'
        },
        {
          'name': 'pretty_json',
          'description': 'Determines if the JSON response is formatted for readability (`true`), or displayed on a\nsingle line (`false`). Default is `false`.\n',
          'type': 'Boolean'
        }
      ]
    },
    'showPhotos': {
      'summary': 'Show Photos',
      'description': 'Show photos in a collection. ',
      'authRequired': false,
      'instance': true,
      'adminRequired': false,
      'response': {
        'model': 'photo',
        'name': 'photos'
      },
      'parameters': [
        {
          'name': 'collection_id',
          'description': 'ID of the collection to retrieve photos from.\n',
          'type': 'String',
          'required': true
        },
        {
          'name': 'page',
          'description': 'Request page number, default is 1.\n',
          'type': 'Number'
        },
        {
          'name': 'per_page',
          'description': 'Number of results per page, default is 10.\n',
          'type': 'Number'
        },
        {
          'name': 'response_json_depth',
          'description': "Nested object depth level counts in response JSON.\n\nIn order to reduce server API calls from an application, the response JSON may\ninclude not just the objects that are being queried/searched, but also\nsome important data related to the returned objects such as object's owner or\nreferenced objects.\n\nDefault is 1, valid range is 1 to 8.\n",
          'type': 'Number'
        },
        {
          'name': 'pretty_json',
          'description': 'Determines if the JSON response is formatted for readability (`true`), or displayed on a\nsingle line (`false`). Default is `false`.\n',
          'type': 'Boolean'
        }
      ]
    },
    'showSubcollections': {
      'summary': 'Show subcollections',
      'description': 'Show photos in a collection. ',
      'authRequired': false,
      'instance': true,
      'adminRequired': false,
      'response': {
        'name': 'collections'
      },
      'parameters': [
        {
          'name': 'collection_id',
          'description': 'ID of the collection to retrieve photos from.\n',
          'type': 'String',
          'required': true
        },
        {
          'name': 'page',
          'description': 'Request page number, default is 1.\n',
          'type': 'Number'
        },
        {
          'name': 'per_page',
          'description': 'Number of results per page, default is 10.\n',
          'type': 'Number'
        },
        {
          'name': 'response_json_depth',
          'description': "Nested object depth level counts in response JSON.\n\nIn order to reduce server API calls from an application, the response JSON may\ninclude not just the objects that are being queried/searched, but also\nsome important data related to the returned objects such as object's owner or\nreferenced objects.\n\nDefault is 1, valid range is 1 to 8.\n",
          'type': 'Number'
        },
        {
          'name': 'pretty_json',
          'description': 'Determines if the JSON response is formatted for readability (`true`), or displayed on a\nsingle line (`false`). Default is `false`.\n',
          'type': 'Boolean'
        }
      ]
    },
    'update': {
      'summary': 'Update a PhotoCollection',
      'description': "Updates a photo collection. An existing collection's cover photo can be added or updated by specifying a new cover_photo_id. The cover photo can be removed by sending an empty string as the value for cover_photo_id. Application Admin can update any Photo Collection. ",
      'authRequired': true,
      'instance': true,
      'adminRequired': false,
      'response': {
        'singleElement': true
      },
      'parameters': [
        {
          'name': 'collection_id',
          'description': 'ID of the collection to update.\n',
          'type': 'String'
        },
        {
          'name': 'name',
          'description': 'New name of the collection. The name must be unique across other top-level collections. If this is a sub-collection, the name must be unique across other sub-collections of the same parent.\n',
          'type': 'String'
        },
        {
          'name': 'cover_photo_id',
          'description': 'ID of the photo to use as a cover photo. The photo does not need to be in the collection.\n',
          'type': 'String'
        },
        {
          'name': 'custom_fields',
          'description': 'User defined fields. See [Custom Data Fields](http://docs.appcelerator.com/arrowdb/latest/#!/guide/customfields).\n',
          'type': [
            'String',
            'Hash'
          ]
        },
        {
          'name': 'acl_name',
          'description': 'Name of an [ACLs](http://docs.appcelerator.com/arrowdb/latest/#!/api/ACLs) to associate with this collection.\n\nAn ACL can be specified using acl_name or acl_id. The two parameters are mutually exclusive.\n',
          'type': 'String'
        },
        {
          'name': 'acl_id',
          'description': 'ID of an [ACLs](http://docs.appcelerator.com/arrowdb/latest/#!/api/ACLs) to associate with this collection.An ACL can be specified using acl_name or acl_id. The two parameters are mutually exclusive.\n',
          'type': 'String'
        },
        {
          'name': 'su_id',
          'description': 'User ID to update the collection on behalf of. The user must be the creator of the collection.\n\nThe current login user must be an application admin to update a collection on behalf of another user.\n',
          'type': 'String'
        },
        {
          'name': 'pretty_json',
          'description': 'Determines if the JSON response is formatted for readability (`true`), or displayed on a\nsingle line (`false`). Default is `false`.\n',
          'type': 'Boolean'
        }
      ]
    },
    'batchDelete': {
      'summary': 'Deletes multiple PhotoCollections',
      'description': 'Deletes PhotoCollections objects that match the query constraints provided in the where parameter. If no where parameter is provided, all PhotoCollections objects are deleted. Note that an HTTP 200 code (success) is returned if the call completed successfully but the query matched no objects. For performance reasons, the number of objects that can be deleted in a single batch delete operation is limited to 100,000. The matched objects are deleted asynchronously in a separate process. The [cover photo](http://docs.appcelerator.com/arrowdb/latest/#!/api/PhotoCollections-property-cover_photo) associated with any of the matched objects are not not deleted. You must be an application admin to run this command. ',
      'authRequired': true,
      'instance': true,
      'adminRequired': true,
      'response': {
        'singleElement': true
      },
      'parameters': [
        {
          'name': 'where',
          'description': 'Encoded JSON object that specifies constraint values for Photos objects to delete.\nIf not specified, all Photos objects are deleted.\n',
          'type': 'Hash'
        }
      ]
    },
    'query': {
      'summary': 'Custom Query Photo collections',
      'description': '',
      'authRequired': false,
      'instance': true,
      'adminRequired': false,
      'parameters': [
        {
          'name': 'page',
          'description': '\nStarting in ACS 1.1.5, page and per_page are no longer supported in query operations. \nApplications should instead use skip and limit \nquery parameters.\n',
          'type': 'Number'
        },
        {
          'name': 'per_page',
          'description': '\nStarting in ACS 1.1.5, page and per_page are no longer supported in query operations. \nApplications should instead use skip and limit \nquery parameters.\n',
          'type': 'Number'
        },
        {
          'name': 'limit',
          'description': 'The number of records to fetch. The value must be greater than 0, and no greater than \n1000, or an HTTP 400 (Bad Request) error will be returned. Default value of `limit` is 10.\n',
          'type': 'Number'
        },
        {
          'name': 'skip',
          'description': 'The number of records to skip. The value must be greater than or equal to 0, and no greater \nthan 4999, or an HTTP 400 error will be returned. To skip 5000 records or more \nyou need to perform a range-based query. See \nQuery Pagination for more information.\n',
          'type': 'Number'
        },
        {
          'name': 'where',
          'description': 'Constraint values for fields. `where` should be encoded JSON.\n\nIf `where` is not specified, `query` returns all objects.\n',
          'type': 'Hash'
        },
        {
          'name': 'order',
          'description': 'Sort results by one or more fields.\n',
          'type': 'String'
        },
        {
          'name': 'sel',
          'description': 'Selects the object fields to display. Do not use this parameter with `unsel`.\n',
          'type': 'Hash'
        },
        {
          'name': 'show_user_like',
          'description': 'If set to **true**, each Photo object in the response includes `"current_user_liked: true"`\n if the current user has liked the object. If the user has not liked the object, the \n`current_user_liked` field is not included in the response.\n',
          'type': 'Boolean'
        },
        {
          'name': 'unsel',
          'description': 'Selects the object fields NOT to display. Do not use this parameter with `sel`.\n',
          'type': 'Hash'
        },
        {
          'name': 'response_json_depth',
          'description': "Nested object depth level counts in response json.\nIn order to reduce server API calls from an application, the response json may\ninclude not just the objects that are being queried/searched, but also with\nsome important data related to the returning objects such as object's owner or\nreferencing objects.\n\nDefault is 1, valid range is 1 to 8.\n",
          'type': 'Number'
        },
        {
          'name': 'pretty_json',
          'description': 'Determines if the JSON response is formatted for readability (`true`), or displayed on a\nsingle line (`false`). Default is `false`.\n',
          'type': 'Boolean'
        }
      ]
    },
    'remove': {
      'canonical': 'delete'
    }
  },

  _prepareParams: function prepareParams (method, instance, params, defaultValue) {
    params || (params = {})
    switch (method) {
      case 'update':
        defaultValue.collection_id = instance.getPrimaryKey()
        return defaultValue
      case 'delete':
        return {
          collection_id: instance.getPrimaryKey()
        }
    }
    return defaultValue
  },

  actions: ['delete', 'create', 'update']
}
