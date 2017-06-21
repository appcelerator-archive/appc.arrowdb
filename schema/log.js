'use strict';

/*
 The Logs model.
 */
module.exports = {
    name: 'log',
    objectName: 'Logs',

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
        "queryPushLogs": {
            "summary": "Perform a custom query of PushNotifications",
            "description": "Performs a custom query for details about a specific Arrow push notification log item specified in the query's where clause. Returns a [PushLogDetails](http://docs.appcelerator.com/arrowdb/latest/#!/api/PushLogDetails) object for the specified log item. ",
            "authRequired": true,
            "instance": true,
            "adminRequired": true,
            "response": {
                "name": "push_logs",
                "model": "pushLog"
            },
            "parameters": [
                {
                    "name": "where",
                    "description": "Where clause whose value is JSON object consisting of the field name \"push_id\" and the ID of the push notification log item to query for, for example:\nwhere={\"push_id\":\"<PUSHLOG_ID>\"}\n",
                    "type": "String",
                    "required": true
                }
            ]
        },
        "queryPushLogDetails": {
            "summary": "Perform a custom query of PushNotifications details",
            "description": "Performs a custom query of Arrow push notification logs with sorting and pagination. Returns a list of [PushLogs](http://docs.appcelerator.com/arrowdb/latest/#!/api/PushLogs) objects that matched the query parameters. To get additional details about a specific PushLogs item, pass the value of [PushLogs._id](http://docs.appcelerator.com/arrowdb/latest/#!/api/PushLogs-property-_id) to a [querypushlogdetails](http://docs.appcelerator.com/arrowdb/latest/#!/api/Logs-method-querypushlogdetails) query. ",
            "authRequired": true,
            "instance": true,
            "adminRequired": true,
            "response": {
                "name": "push_log_details",
                "model": "pushLogDetails"
            },
            "parameters": [
                {
                    "name": "where",
                    "description": "Constraint values for fields. where should be JSON encoded.\n\nIf where is not specified, query returns all objects.\n",
                    "type": "String",
                    "required": true
                }
            ]
        }
    },

    _prepareParams: function prepareParams(method, instance, params, defaultValue) {
        params || (params = {});
        switch (method) {
            case 'update':
                defaultValue.log_id = instance.getPrimaryKey();
                return defaultValue;
            case 'delete':
                return {
                    log_id: instance.getPrimaryKey()
                };
        }
        return defaultValue;
    },

    actions: []
};