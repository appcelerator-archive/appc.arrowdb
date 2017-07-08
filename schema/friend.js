'use strict'

/*
 The Friends model.
 */
module.exports = {
  name: 'friend',
  objectName: 'Friends',

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
  fields: {},
  /*
  Methods for this model.
  */
  methodMeta: {
    'add': {
      'summary': 'Add Friends to the current user',
      'description': 'Retrieves the total number of Chat objects. ',
      'authRequired': true,
      'instance': false,
      'adminRequired': false,
      'parameters': [
        {
          'name': 'user_ids',
          'description': 'Comma-separated list consisting of IDs of one or more users to add as friends to the current user. A user cannot add himself or herself as a friend.\n',
          'type': 'String',
          'required': true
        },
        {
          'name': 'approval_required',
          'description': 'Indicates whether the friend request requires approval by the other users.\n\nDefault: true\n',
          'type': 'Boolean'
        },
        {
          'name': 'pretty_json',
          'description': 'Determines if the JSON response is formatted for readability (`true`), or displayed on a\nsingle line (`false`). Default is `false`.\n',
          'type': 'Boolean'
        }
      ]
    },
    'approve': {
      'summary': 'Approve a Friend request',
      'description': "Approve an existing friend request. Each user will be added to the other's friend list. ",
      'authRequired': true,
      'instance': false,
      'adminRequired': false,
      'parameters': [
        {
          'name': 'user_ids',
          'description': 'Comma-separated list consisting of IDs of one or more users to approve as friends to the current user.',
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
    'query': {
      'summary': 'Performs a custom query of Friends',
      'description': "Performs custom query of Friends objects with sorting and paginating of the current logged-in user or the specified user. Only an application admin can perform a query against a specified user using the su_id field. If one-way friendship is enabled, the query returns the users being followed. To return the user's followers, set the followers field to true. You can query or sort based on the data in any of the standard Friend fields. You can also query and sort data based on the values of any custom fields, if the values are simple JSON values.Currently you cannot sort or query based on data stored inside array or hash objects in custom fields. For details about using the query parameters, see the [Search and Query guide](http://docs.appcelerator.com/arrowdb/latest/#!/guide/search_query). ",
      'authRequired': true,
      'instance': true,
      'adminRequired': false,
      'response': {
        'name': 'users',
        'model': 'user'
      },
      'parameters': [
        {
          'name': 'su_id',
          'description': "ID of the user to search for friends. If friendship is set to one way, by default it searches against users that the identified user is following. You can pass followers=true to search the user's followers. You must be an application admin to use this field.\n",
          'type': 'String'
        },
        {
          'name': 'followers',
          'description': "If set to true and one-way friendship is enabled, returns the user's followers instead of the users being followed.\n",
          'type': 'Boolean'
        },
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
          'name': 'where',
          'description': 'Constraint values for fields. where should be encoded JSON.\n\nIf where is not specified, query returns all objects.\n',
          'type': 'Hash'
        },
        {
          'name': 'order',
          'description': 'Sort results by one or more fields.\n',
          'type': 'String'
        },
        {
          'name': 'sel',
          'description': 'Selects the object fields to display. Do not use this parameter with unsel.\n',
          'type': 'Hash'
        },
        {
          'name': 'unsel',
          'description': 'Selects the object fields NOT to display. Do not use this parameter with sel.\n',
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
    'delete': {
      'summary': '',
      'description': "Removes one or more friends from the user's friends list. ",
      'authRequired': true,
      'instance': true,
      'adminRequired': false,
      'parameters': [
        {
          'name': 'user_ids',
          'description': 'Comma-separated list consisting of IDs of one or more users to remove from the current user.',
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
    'requests': {
      'summary': 'View friends requests',
      'description': 'View pending friend requests. ',
      'authRequired': true,
      'instance': true,
      'adminRequired': false,
      'response': {
        'name': 'friend_requests',
        'model': 'friendRequest'
      },
      'parameters': [
        {
          'name': 'requests_to',
          'description': 'If set to true, returns the users requesting the current user as a friend rather than the pending friend requests that the user needs to approve.\n',
          'type': 'Boolean'
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
    'remove': {
      'canonical': 'delete'
    }
  },

  actions: []
}
