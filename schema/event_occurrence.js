'use strict'

/*
 The Chats model.
 */
module.exports = {
  name: 'eventOccurrence',
  objectName: 'EventOccurrences',

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
    'event': {
            // "originalType": "Event",
      'type': Object,
      'description': 'The event.'
    },
    'start_time': {
            // "originalType": "Date",
      'type': Date,
      'description': 'Start time of an event occurrence.'
    },
    'end_time': {
            // "originalType": "Date",
      'type': Date,
      'description': 'End time of an event occurrence.'
    }
  }
}
