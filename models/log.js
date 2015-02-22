'use strict';

var Arrow = require("arrow");

/*
 The Logs model.
 */
module.exports = Arrow.Model.extend("appc.arrowdb/log", {
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
	visible: false,

	/*
	 Fields for this model.
	 */
	fields: {
	},
	/*
	 Methods for this model.
	 */
	methodMeta: {
		"querypushlogs": {
			"summary": "Query ACS push notification logs.",
			"description": "Performs a custom query of ACS push notification logs with sorting and pagination. Returns a list of PushLogs objects that matched the query parameters.  To get additional details about a specific PushLogs item, pass the value of PushLogs#_id to a Logs#querypushlogdetails query. ",
			"authRequired": true,
			"instance": true,
			"adminRequired": true,
			"response": {
				"singleElement": true
			},
			"parameters": []
		},
		"querypushlogdetails": {
			"summary": "Query details about a specific push notification log item.",
			"description": "Performs a custom query for details about a specific ACS push notification log item specified in the query's `where` clause. Returns a PushLogDetails object for the specified log item. ",
			"authRequired": true,
			"instance": true,
			"adminRequired": true,
			"response": {
				"singleElement": true
			},
			"parameters": [
				{
					"name": "where",
					"description": "Where clause whose value is JSON object consisting of the field name \"push_id\"\nand the ID of the push notification log item to query for, for example:\n\n    where={\"push_id\":\"\"}\n",
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
});
