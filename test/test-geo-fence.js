/* global init, assertFailure, dump */
'use strict';

require('./_base');

var assert = require('assert'),
	should = require('should');

describe('GeoFence', function () {

	var clientModelName = 'appc.arrowdb/client',
		store = {},
		Model,
		ClientModel;

	init(this, function () {
		Model = this.connector.getModel('geoFence');
		ClientModel = this.connector.getModel(clientModelName);
	});

	before(function (done) {
		ClientModel.geolocate({
			ip_address: "184.72.37.109"
		}, function (err, instance) {
			store.client = instance;
			done();
		});
	});

	it('should create geofence based on client location', function (next) {
		Model.create({
			geo_fence: {
				loc: {
					coordinates: [store.client.latitude, store.client.longitude],
					radius: "10/3959"
				},
				payload: {
					alert: "24-hour sale at our SF flagship store on 12/26!"
				}
			}
		}, function (err, instance) {
			// Store geoFence for later usage
			store.geoFence = instance;

			next();
		});
	});
});
