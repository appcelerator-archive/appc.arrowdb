/* global init, assertFailure, dump */
'use strict';

require('./_base');

var assert = require('assert'),
	async = require('async'),
	should = require('should');

describe('Client', function () {

	init(this);

	it('should allow calling geolocate', function (next) {

		this.connector.getModel('client').geolocate({
			ip_address: "184.72.37.109"
		}, function (error, instance) {
			assert.ifError(error);
			should(instance).have.property('city');
			should(instance).have.property('country_code');
			should(instance).have.property('latitude');
			should(instance).have.property('longitude');
			should(instance).have.property('state');
			next();
		});

	});
});