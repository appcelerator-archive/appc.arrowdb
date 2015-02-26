'use strict';

var Arrow = require("arrow");

/*
 The Clients model.
 */
module.exports = Arrow.Model.extend("appc.arrowdb/client", {
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
		"geolocate": {
			"summary": "Geolocate a Client",
			"description": "Provides location data about the mobile device or computer your app is running on based on its IP address. This feature uses [MaxMind GeoIP](https://www.maxmind.com/app/ip-location) to return the most accurate IP-based geolocation data possible. Note that the results are not not based on GPS signals nor WiFi triangulation commonly used on mobile devices. See [MaxMind GeoIP city accuracy](https://www.maxmind.com/app/city_accuracy) for more information. An example use of this data is to verify the country that the app user in, so that access can be given to application data.  An error will be returned of the location cannot be determined from the IP address. A successful lookup will return at minimum a [ISO 3166 country code](https://www.maxmind.com/app/iso3166). ",
			"authRequired": false,
			"instance": true,
			"adminRequired": false,
			"response": {
				"singleElement": true
			},
			"parameters": [
				{
					"name": "ip_address",
					"description": "Alternate IP address to lookup instead of using the device's own address.\n",
					"type": "String"
				},
				{
					"name": "pretty_json",
					"description": "Determines if the JSON response is formatted for readability (`true`), or displayed on a\nsingle line (`false`). Default is `false`.\n",
					"type": "Boolean"
				}
			]
		}
	},

	_prepareParams: function prepareParams(method, instance, params, defaultValue) {
		params || (params = {});
		switch (method) {
			case 'update':
				defaultValue.client_id = instance.getPrimaryKey();
				return defaultValue;
			case 'delete':
				return {
					client_id: instance.getPrimaryKey()
				};
		}
		return defaultValue;
	},

	actions: []
});
