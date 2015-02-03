'use strict';

var Arrow = require("arrow");

/*
 The GeoFences model.
 */
module.exports = Arrow.Model.extend("appc.acs/geo_fence", {
	/**
	 * Remove generated: true or set it to false if you want to prevent syncModels.js from changing this file.
	 */
	generated: true,
	/*
	 Fields for this model.
	 */
	fields: {
		"start_time": {
			// "originalType": "Date",
			"type": Date,
			"description": "Datetime when to start the geo-fence."
		},
		"end_time": {
			// "originalType": "Date",
			"type": Date,
			"description": "Datetime when the geo-fence expires."
		},
		"loc": {
			// "originalType": "Hash",
			"type": Object,
			"description": "JSON-encoded object describing the geographic perimeter of the geo-fence, specified as a circle with\na center point of either `place_id` or `coordinates` property and the `radius` property:\n\n  * `place_id` (String): Use an ACS Places object as the center of the circle. Specify the\n    ID of the Place.\n  * `coordinates` (Array): Center coordinate of the circle.  Specify a point as `[longitude,latitude]`.\n  * `radius` (Number/String): Radius of the bounding circle in radians. To calculate the distance in radians,\n    divide the distance you want by the approximate circumference of the Earth in the same\n    units. For example, 10 miles is 10 / 3959 or 2 kilometers is 2 / 6371.  Specify the\n    fraction as a string, for example, `\"10/3959\"` or `\"2/6371\"`.\n"
		},
		"payload": {
			// "originalType": "Hash",
			"type": Object,
			"description": "JSON-encoded data to retrieve if the geo-fence area intersects the device's location.\n"
		},
		"created_at": {
			// "originalType": "Date",
			"type": Date,
			"description": "Date when the geo-fence was created."
		},
		"updated_at": {
			// "originalType": "Date",
			"type": Date,
			"description": "Date when the geo-fence was updated."
		}
	},
	/*
	 Methods for this model.
	 */
	methodMeta: {
		"delete": {
			"summary": "Deletes a Geofence",
			"description": "Deletes an existing geo-fence object.\n\nAvailable only for Enterprise administrators. \n",
			"authRequired": true,
			"instance": true,
			"adminRequired": true,
			"response": {
				"singleElement": true
			},
			"parameters": [
				{
					"name": "id",
					"description": "ID of the geo-fence object to delete.",
					"type": "String",
					"required": true
				},
				{
					"name": "pretty_json",
					"description": "Determines if the JSON response is formatted for readability (`true`), or displayed on a\nsingle line (`false`). Default is `false`.\n",
					"type": "Boolean"
				}
			]
		},
		"create": {
			"summary": "Creates a Geofence.",
			"description": "Creates a geo-fence object with an optional start and end time.\n\nAvailable only for Enterprise administrators.\n",
			"authRequired": true,
			"instance": true,
			"adminRequired": true,
			"response": {
				"singleElement": true
			},
			"parameters": [
				{
					"name": "geo_fence",
					"description": "JSON object describing the geographic perimeter, data payload, and start and end time\nfor the geo-fence object.  Specify the following propertes:\n\n  * `loc` (Hash): **Required.** Geographic perimeter.  See GeoFences#loc.\n  * `payload` (Hash): **Required.** JSON-encoded data to retrieve if a device intersects\n    the geographic perimeter.\n  * `start_time` (Date): Datetime to start the geo-fence.\n  * `end_time` (Date): Datetime to end the geo-fence.\n",
					"type": "Hash",
					"required": true
				},
				{
					"name": "pretty_json",
					"description": "Determines if the JSON response is formatted for readability (`true`), or displayed on a\nsingle line (`false`). Default is `false`.\n",
					"type": "Boolean"
				}
			]
		},
		"query": {
			"summary": "Custom Query of Geofences",
			"description": "Perform custom query of geofences with sorting and paginating.\n\nAvailable only for Enterprise users.\n\nIn ACS 1.1.5 and later, you can paginate query results using `skip` and `limit` parameters, or by including\na `where` clause to limit the results to objects whose IDs fall within a specified range.\nFor details, see [Query Pagination](#!/guide/search_query-section-query-pagination).        \n\nFor details about using the query parameters,\nsee the [Search and Query guide](#!/guide/search_query).\n",
			"authRequired": false,
			"instance": true,
			"adminRequired": false,
			"parameters": [
				{
					"name": "page",
					"description": "\nStarting in ACS 1.1.5, page and per_page are no longer supported in query operations. \nApplications should instead use skip and limit \nquery parameters.\n",
					"type": "Number"
				},
				{
					"name": "per_page",
					"description": "\nStarting in ACS 1.1.5, page and per_page are no longer supported in query operations. \nApplications should instead use skip and limit \nquery parameters.\n",
					"type": "Number"
				},
				{
					"name": "limit",
					"description": "The number of records to fetch. The value must be greater than 0, and no greater than \n1000, or an HTTP 400 (Bad Request) error will be returned. Default value of `limit` is 10.\n",
					"type": "Number"
				},
				{
					"name": "skip",
					"description": "The number of records to skip. The value must be greater than or equal to 0, and no greater \nthan 4999, or an HTTP 400 error will be returned. To skip 5000 records or more \nyou need to perform a range-based query. See \nQuery Pagination for more information.\n",
					"type": "Number"
				},
				{
					"name": "response_json_depth",
					"description": "Nested object depth level for response data.\n\nDefault is 1, valid range is 1 to 8.\n\nResponse data may include references to other objects, which the server performs\nadditional queries on to include in the response. To reduce server response time,\nset this parameter to a lower value to reduce server API calls.\n",
					"type": "Number"
				},
				{
					"name": "where",
					"description": "A JSON-encoded object that defines the query used.\n\nThe following fields can be used for the query:\n\n  * GeoFences#start_time\n  * GeoFences#end_time\n  * `loc` : For this property, specify a\n    [MongoDB Geospatial Query](http://docs.mongodb.org/manual/reference/operator/query-geospatial/).\n\nIf `where` is not specified, `query` returns all objects.\n",
					"type": "Hash"
				},
				{
					"name": "pretty_json",
					"description": "Determines if the JSON response is formatted for readability (`true`), or displayed on a\nsingle line (`false`). Default is `false`.\n",
					"type": "Boolean"
				}
			]
		},
		"update": {
			"summary": "Updates a Geofence",
			"description": "Updates an existing geo-fence object.\n\nAvailable only for Enterprise administrators. \n",
			"authRequired": true,
			"instance": true,
			"adminRequired": true,
			"response": {
				"singleElement": true
			},
			"parameters": [
				{
					"name": "id",
					"description": "ID of the geo-fence object to update.",
					"type": "String",
					"required": true
				},
				{
					"name": "geo_fence",
					"description": "JSON object describing the geographic perimeter, data payload, and start and end time\nfor the geo-fence object.  Specify the following propertes:\n\n  * `loc` (Hash): **Required.** Geographic perimeter.  See GeoFences#loc.\n  * `payload` (Hash): JSON-encoded data to retrieve if a device intersects the geographic\n    perimeter.\n  * `start_time` (Date): Datetime to start the geo-fence.\n  * `end_time` (Date): Datetime to end the geo-fence.\n \n",
					"type": "Hash"
				},
				{
					"name": "pretty_json",
					"description": "Determines if the JSON response is formatted for readability (`true`), or displayed on a\nsingle line (`false`). Default is `false`.\n",
					"type": "Boolean"
				}
			]
		},
		"remove": {
			"canonical": "delete"
		}
		
	},

	_prepareParams: function prepareParams(method, instance, params, defaultValue) {
		params || (params = {});
		switch (method) {
			case 'update':
				defaultValue.geo_fence_id = instance.getPrimaryKey();
				return defaultValue;
			case 'delete':
				return {
					geo_fence_id: instance.getPrimaryKey()
				};
		}
		return defaultValue;
	}
});
