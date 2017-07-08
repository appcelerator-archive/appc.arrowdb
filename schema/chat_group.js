'use strict'

/*
 The Chats model.
 */
module.exports = {
  name: 'chatGroup',
  objectName: 'ChatGroups',

  /**
  * Remove _syncModelsCanUpdateThis property or set it to false if you want to prevent syncModels.js from changing this file.
  */
  _syncModelsCanUpdateThis: true,

  /**
  * indicate that the model was generated
  */
  generated: false,

  /**
  * if this model is visible
  */
  visible: false,

  /*
  Fields for this model.
  */
  fields: {
    'message': {
            // "originalType": "String",
      'type': String,
      'description': 'The sent message.'
    },
    'participate_ids': {
            // "originalType": "Array",
      'type': Array,
      'description': 'List of Users ids for the users in the chat group.'
    },
    'created_at': {
            // "originalType": "Date",
      'type': Date,
      'description': 'Chat group creation date.'
    },
    'updated_at': {
            // "originalType": "Date",
      'type': Date,
      'description': 'Chat group update date.'
    }
  }
}
