'use strict'

/*
 The PushLogs model.
 */
module.exports = {
  name: 'pushLog',
  objectName: 'PushLogs',

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
    'app_id': {
            // "originalType": "String",
      'type': String,
      'description': 'Application ID.'
    },
    'created_at': {
            // "originalType": "Date",
      'type': Date,
      'description': ''
    },
    'updated_at': {
            // "originalType": "Date",
      'type': Date,
      'description': ''
    },
    'channel': {
            // "originalType": "String",
      'type': String,
      'description': 'Name of the channel to which the push notification was delivered.'
    },
    'payload': {
            // "originalType": "String",
      'type': String,
      'description': 'Notification payload.'
    },
    'push_schedule_id': {
            // "originalType": "String",
      'type': String,
      'description': 'ID of the PushSchedules used to create the push notification (only present if the push notification was created by a PushSchedule).'
    },
    'to_ids': {
            // "originalType": "Array",
      'type': Array,
      'description': 'Array of User IDs that push notification was delivered to.'
    },
    'scheduled_at': {
            // "originalType": "Date",
      'type': Date,
      'description': 'Date that push notification was scheduled (only present if the push notification was created by a schedule.)'
    }
  }
}
