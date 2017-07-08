'use strict'

/*
 The GeoFences model.
 */
module.exports = {
  name: 'geoFence',
  objectName: 'GeoFences',

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
    'created_at': {
            // "originalType": "Date",
      'type': Date,
      'description': 'Date when the geo-fence was created.'
    },
    'end_time': {
            // "originalType": "Date",
      'type': Date,
      'description': 'Datetime when the geo-fence expires.'
    },
    'geo_fence': {
            // "originalType": "Hash",
      'type': Object,
      'description': 'JSON-encoded object describing the geographic perimeter of the geo-fence, specified as a circle with a center point of either place_id or coordinates property and the radius property:\nplace_id (String): Use an ArrowDB Places object as the center of the circle. Specify the ID of the Place.\ncoordinates (Array): Center coordinate of the circle. Specify a point as [longitude,latitude].\nradius (Number/String): Radius of the bounding circle in radians. To calculate the distance in radians, divide the distance you want by the approximate radius of the Earth in the same units. For example, 10 miles is 10 / 3959 or 2 kilometers is 2 / 6371. Specify the fraction as a string, for example, "10/3959" or "2/6371".'
    },
    'payload': {
            // "originalType": "Hash",
      'type': Object,
      'description': "JSON-encoded data to retrieve if the geo-fence area intersects the device's location."
    },
    'start_time': {
            // "originalType": "Date",
      'type': Date,
      'description': 'Datetime when to start the geo-fence.'
    },
    'updated_at': {
            // "originalType": "Date",
      'type': Date,
      'description': 'Date when the geo-fence was updated.'
    }
  },
  /*
  Methods for this model.
  */
  methodMeta: {
    'create': {
      'summary': 'Create a GeoFence',
      'description': 'Creates a geo-fence object with an optional start and end time. ',
      'authRequired': true,
      'instance': true,
      'adminRequired': true,
      'response': {
        'singleElement': true
      },
      'parameters': [
        {
          'name': 'geo_fence',
          'description': 'JSON object describing the geographic perimeter, data payload, and start and end time for the geo-fence object. Specify the following propertes:\nloc (Hash): Required. Geographic perimeter. See [loc](http://docs.appcelerator.com/arrowdb/latest/#!/api/GeoFences-property-loc).\n\npayload (Hash): Required. JSON-encoded data to retrieve if a device intersects the geographic perimeter.\nstart_time (Date): Datetime to start the geo-fence.\nend_time (Date): Datetime to end the geo-fence.\n',
          'type': 'Hash',
          'required': true
        },
        {
          'name': 'pretty_json',
          'description': 'Determines if the JSON response is formatted for readability (`true`), or displayed on a\nsingle line (`false`). Default is `false`.\n',
          'type': 'Boolean'
        }
      ]
    },
    'query': {
      'summary': 'Performs a custom query of GeoFences',
      'description': 'Perform custom query of geofences with sorting and paginating. In ArrowDB 1.1.5 and later, you can paginate query results using skip and limit parameters, or by including a where clause to limit the results to objects whose IDs fall within a specified range. For details, see [Query Pagination](http://docs.appcelerator.com/arrowdb/latest/#!/guide/search_query-section-query-pagination). For details about using the query parameters, see the [Search and Query guide](http://docs.appcelerator.com/arrowdb/latest/#!/guide/search_query). ',
      'authRequired': false,
      'instance': true,
      'adminRequired': false,
      'parameters': [
        {
          'name': 'page',
          'description': 'Note: Starting in ArrowDB 1.1.5, page and per_page are no longer supported in query operations. Applications should instead use skip and limit query parameters.\n',
          'type': 'Number'
        },
        {
          'name': 'per_page',
          'description': 'Note: Starting in ArrowDB 1.1.5, page and per_page are no longer supported in query operations. Applications should instead use skip and limit query parameters.\n',
          'type': 'Number'
        },
        {
          'name': 'limit',
          'description': 'The number of records to fetch. The value must be greater than 0, and no greater than 1000, or an HTTP 400 (Bad Request) error will be returned. Default value of limit is 10.\n',
          'type': 'Number'
        },
        {
          'name': 'skip',
          'description': 'The number of records to skip. The value must be greater than or equal to 0, and no greater than 4999, or an HTTP 400 error will be returned. To skip 5000 records or more you need to perform a range-based query. See [Query Pagination](http://docs.appcelerator.com/arrowdb/latest/#!/guide/search_query-section-query-pagination) for more information.\n',
          'type': 'Number'
        },
        {
          'name': 'limit',
          'description': 'The number of records to fetch. The value must be greater than 0, and no greater than 1000, or an HTTP 400 (Bad Request) error will be returned. Default value of limit is 10.\n',
          'type': 'Number'
        },
        {
          'name': 'where',
          'description': 'A JSON-encoded object that defines the query used.\n\nThe following fields can be used for the query:\n\n * [start_time](http://docs.appcelerator.com/arrowdb/latest/#!/api/GeoFences-property-start_time)\n * [end_time](http://docs.appcelerator.com/arrowdb/latest/#!/api/GeoFences-property-end_time)\n * loc : For this property, specify a [MongoDB Geospatial Query](http://docs.mongodb.org/manual/reference/operator/query-geospatial/).\n\nIf where is not specified, query returns all objects.\n',
          'type': 'Hash'
        },
        {
          'name': 'response_json_depth',
          'description': "Nested object depth level counts in response json. In order to reduce server API calls from an application, the response json may include not just the objects that are being queried/searched, but also with some important data related to the returning objects such as object's owner or referencing objects.\n\nDefault is 1, valid range is 1 to 8.\n",
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
      'summary': 'Update a GeoFence',
      'description': 'Updates an existing geo-fence object. ',
      'authRequired': true,
      'instance': true,
      'adminRequired': false,
      'response': {
        'singleElement': true
      },
      'parameters': [
        {
          'name': 'id',
          'description': 'ID of the geo-fence object to update.\n',
          'type': 'String',
          'required': true
        },
        {
          'name': 'geo_fence',
          'description': 'JSON object describing the geographic perimeter, data payload, and start and end time for the geo-fence object. Specify the following propertes:\n\n * loc (Hash): Required. Geographic perimeter. See loc.\n * payload (Hash): JSON-encoded data to retrieve if a device intersects the geographic perimeter.\n * start_time (Date): Datetime to start the geo-fence.\n * end_time (Date): Datetime to end the geo-fence.\n',
          'type': 'Hash',
          'required': true
        },
        {
          'name': 'pretty_json',
          'description': 'Determines if the JSON response is formatted for readability (`true`), or displayed on a\nsingle line (`false`). Default is `false`.\n',
          'type': 'Boolean'
        }
      ]
    },
    'delete': {
      'summary': 'Delete a geo-fence',
      'description': 'Deletes an existing geo-fence object. ',
      'authRequired': true,
      'instance': true,
      'adminRequired': false,
      'parameters': [
        {
          'name': 'id',
          'description': 'ID of the geo-fence object to delete.\n',
          'type': 'String',
          'required': true
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
        defaultValue.geo_fence_id = instance.getPrimaryKey()
        return defaultValue
      case 'delete':
        return {
          geo_fence_id: instance.getPrimaryKey()
        }
    }
    return defaultValue
  },

  actions: ['update', 'delete', 'create', 'read']
}
