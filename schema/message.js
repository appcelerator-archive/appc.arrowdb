'use strict'

/*
 The Messages model.
 */
module.exports = {
  name: 'message',
  objectName: 'Messages',

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
    'body': {
            // "originalType": "String",
      'type': String,
      'description': 'Message body.'
    },
    'created_at': {
            // "originalType": "Date",
      'type': Date,
      'description': 'Message creation date.'
    },
    'from_id': {
            // "originalType": "String",
      'type': String,
      'description': 'Message sender.'
    },
    'status': {
            // "originalType": "String",
      'type': String,
      'description': 'Status of the message: in-box messages have status of read, unread, or replied.'
    },
    'subject': {
            // "originalType": "String",
      'type': String,
      'description': 'Message subject.'
    },
    'thread_id': {
            // "originalType": "String",
      'type': String,
      'description': 'Thread ID of the sent message.'
    },
    'to_ids': {
            // "originalType": "String",
      'type': String,
      'description': "The ID's of the Message recipients."
    },
    'updated_at': {
            // "originalType": "Date",
      'type': Date,
      'description': 'Message update date.'
    }
  },
  /*
  Methods for this model.
  */
  methodMeta: {
    'delete': {
      'summary': 'Delete a Message',
      'description': "Delete the message with the given id. The message must be in the current user's inbox or sent mail. There is currently no trash folder and deletion is permanent. Application Admin can delete any Message object. ",
      'authRequired': true,
      'instance': true,
      'adminRequired': false,
      'response': {
        'singleElement': true
      },
      'parameters': [
        {
          'name': 'message_id',
          'description': 'ID of the message to delete.\n',
          'type': 'String',
          'required': true
        },
        {
          'name': 'su_id',
          'description': 'User to delete the Message object on behalf of. The user needs to be either the sender or recipient of the message.\n\nThe current user must be an application admin to delete a Message object on behalf of another user.\n',
          'type': 'String'
        }
      ]
    },
    'create': {
      'summary': 'Send a Message',
      'description': "Sends a message with an optional subject to one or more specified users. The thread_id of the first outgoing message is its own id. Replies to the first or subsequent messages in the thread will all use the id of the first message as their thread_id. The output of this API method is the copy of the message saved to the sender's sent mail. ",
      'authRequired': true,
      'instance': true,
      'adminRequired': false,
      'response': {
        'singleElement': true
      },
      'parameters': [
        {
          'name': 'to_ids',
          'description': 'Comma-separated list of one or more IDs of Users to send the message to.\n',
          'type': 'String',
          'required': true
        },
        {
          'name': 'body',
          'description': 'The body of the message.\n',
          'type': 'String',
          'required': true
        },
        {
          'name': 'subject',
          'description': 'Message subject.\n',
          'type': 'String'
        },
        {
          'name': 'custom_fields',
          'description': 'User-defined data. See [Custom Objects and Custom Fields](http://docs.appcelerator.com/#!/guide/customfields).\n',
          'type': 'String'
        },
        {
          'name': 'su_id',
          'description': 'ID of the Users to send message on behalf of.\n\nThe current login user must be the application admin, in order to send a message on behalf of another user.\n',
          'type': 'String'
        },
        {
          'name': 'pretty_json',
          'description': 'Determines if the JSON response is formatted for readability (`true`), or displayed on a\nsingle line (`false`). Default is `false`.\n',
          'type': 'Boolean'
        }
      ]
    },
    'deleteThread': {
      'summary': 'Delete all Messages in a thread',
      'description': "Delete all messages in a thread with the given thread_id. The thread must be in the current user's inbox or sent mail. There is currently no trash folder and deletion is permanent. ",
      'authRequired': true,
      'instance': true,
      'adminRequired': false,
      'response': {
        'singleElement': true
      },
      'parameters': [
        {
          'name': 'thread_id',
          'description': 'Thread ID of the message thread to delete.\n',
          'type': 'String',
          'required': true
        }
      ]
    },
    'query': {
      'summary': 'Performs a custom query of Messages',
      'description': 'Performs a custom query of Messages. Currently you can not query or sort data stored inside an array or hash in custom fields. In ArrowDB 1.1.5 and later, you can paginate query results using skip and limit parameters, or by including a where clause to limit the results to objects whose IDs fall within a specified range. For details, see [Query Pagination](http://docs.appcelerator.com/arrowdb/latest/#!/guide/search_query-section-query-pagination). For details about using the query parameters, see the [Search and Query guide](http://docs.appcelerator.com/arrowdb/latest/#!/guide/search_query). ',
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
          'description': 'Note: SStarting in ArrowDB 1.1.5, page and per_page are no longer supported in query operations. Applications should instead use skip and limit query parameters.\n',
          'type': 'Number'
        },
        {
          'name': 'limit',
          'description': 'The number of records to fetch. The value must be greater than 0, and no greater than 1000, or an HTTP 400 (Bad Request) error will be returned. Default value of limit is 10.\n',
          'type': 'Number'
        },
        {
          'name': 'skip',
          'description': 'The number of records to skip. The value must be greater than or equal to 0, and no greater than 4999, or an HTTP 400 error will be returned. To skip 5000 records or more you need to perform a range-based query. See Query Pagination for more information.\n',
          'type': 'Number'
        },
        {
          'name': 'where',
          'description': 'Constraint values for fields. where should be encoded JSON. You can query any of the standard values for an ACL object, as well as any custom fields that contain simple values, such as String, Number or Boolean values. If where is not specified, query returns all objects.\n',
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
    'reply': {
      'summary': 'Reply on a message',
      'description': 'Replies to all recipients of the given message id. The status of the message will be changed to replied. ',
      'authRequired': true,
      'instance': true,
      'adminRequired': false,
      'response': {
        'singleElement': true
      },
      'parameters': [
        {
          'name': 'message_id',
          'description': 'ID of the message to reply to.\n',
          'type': 'String',
          'required': true
        },
        {
          'name': 'body',
          'description': 'Reply message body text.\n',
          'type': 'String',
          'required': true
        }
      ]
    },
    'show': {
      'summary': 'Show a Message',
      'description': "Shows a message in the user's mailbox. ",
      'authRequired': true,
      'instance': true,
      'adminRequired': false,
      'response': {
        'singleElement': true
      },
      'parameters': [
        {
          'name': 'message_id',
          'description': 'ID of the message.\n',
          'type': 'String',
          'required': true
        }
      ]
    },
    'showInbox': {
      'summary': 'Show Messages',
      'description': "Shows messages in the current user's inbox. Messages in the inbox have the status of unread, read, or replied. ",
      'authRequired': true,
      'instance': true,
      'adminRequired': true,
      'response': {
        'model': 'message',
        'name': 'messages'
      },
      'parameters': [
        {
          'name': 'page',
          'description': 'Request page number, default is 1.\n',
          'type': 'Number'
        },
        {
          'name': 'per_page',
          'description': 'Number of results per page, default is 10.\n',
          'type': 'Number'
        }
      ]
    },
    'showSent': {
      'summary': 'Show sent Messages',
      'description': "Shows messages in the current user's sent messages. ",
      'authRequired': true,
      'instance': true,
      'adminRequired': false,
      'response': {
        'model': 'message',
        'name': 'messages'
      },
      'parameters': [
        {
          'name': 'page',
          'description': 'Request page number, default is 1.\n',
          'type': 'Number'
        },
        {
          'name': 'per_page',
          'description': 'Number of results per page, default is 10.\n',
          'type': 'Number'
        }
      ]
    },
    'showThread': {
      'summary': 'Show thread Messages',
      'description': "Show messages with the given thread_id from the user's inbox. If the status of any of the returned messages is unread, it will be changed to read. ",
      'authRequired': true,
      'instance': true,
      'adminRequired': false,
      'parameters': [
        {
          'name': 'thread_id',
          'description': 'D of the thread to show messages from.\n',
          'type': 'String'
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
        }
      ]
    },
    'showThreads': {
      'summary': 'Show threads first Message',
      'description': "Shows the first message in each of the most recent threads in the user's inbox. ",
      'authRequired': true,
      'instance': true,
      'adminRequired': false,
      'parameters': [
        {
          'name': 'page',
          'description': 'Request page number, default is 1.\n',
          'type': 'Number'
        },
        {
          'name': 'per_page',
          'description': 'Number of results per page, default is 10.\n',
          'type': 'Number'
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
        defaultValue.message_id = instance.getPrimaryKey()
        return defaultValue
      case 'delete':
        return {
          message_id: instance.getPrimaryKey()
        }
    }
    return defaultValue
  },

  actions: ['delete', 'create', 'read']
}
