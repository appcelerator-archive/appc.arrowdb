'use strict';

var APIBuilder = require("apibuilder");

/*
 The Logs model.
 */
module.exports = APIBuilder.Model.extend("log", {
	/**
	 * Remove generated: true or set it to false if you want to prevent syncModels.js from changing this file.
	 */
	generated: true,
	/*
	 Fields for this model.
	 */
	fields: {
	},
	/*
	 Methods for this model.
	 */
	methodMeta: {
		"querypushlogdetails": {
			"summary": "Query details about a specific push notification log item.",
			"description": "Performs a custom query for details about a specific ACS push notification log item specified\nin the query's `where` clause. Returns a PushLogDetails object for the specified log item.\n",
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
		},
		"querypushlogs": {
			"summary": "Query ACS push notification logs.",
			"description": "Performs a custom query of ACS push notification logs with sorting and pagination. Returns\na list of PushLogs objects that matched the query parameters.\n\nTo get additional details about a specific PushLogs item, pass the value of PushLogs#_id to\na Logs#querypushlogdetails query.\n",
			"authRequired": true,
			"instance": true,
			"adminRequired": true,
			"response": {
				"singleElement": true
			},
			"parameters": []
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
	}
});
