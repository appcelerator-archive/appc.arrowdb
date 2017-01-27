/* global init, describe, it, before, after */
'use strict';

require('./_base');

var assert = require('assert'),
	should = require('should');

describe('Checkin', function () {

	var modelName = 'appc.arrowdb/checkin',
		placeModelName = 'appc.arrowdb/place',
		store = {},
		Model,
		PlaceModel;

	init(this, function () {
		Model = this.connector.getModel(modelName);
		PlaceModel = this.connector.getModel(placeModelName);
	});

	before(function (done) {
		PlaceModel.create({
			name: 'my.place' + Date.now(),
			city: 'NY'
		}, function (err, instance) {
			store.place = instance;
			done();
		});
	});

	after(function (done) {
		store.place.delete(done);
	});

	it('should create checkin based on place', function (next) {
		Model.create({
			place_id: store.place.id,
			message: 'my.checkin' + Date.now()
		}, function (err, instance) {
			assert.ifError(err);
			should(instance.getPrimaryKey()).be.a.String;
			should(instance.getPrimaryKey().length).be.greaterThan(0);
			
			// Store checkin for later usage
			store.checkin = instance;

			next();
		});
	});

	it('should update the checkin', function (next) {
		Model.update({
			id: store.checkin.id,
			message: 'my.checkin' + Date.now()
		}, function (err, items) {
			assert.ifError(err);
			should(items).be.an.Object;
			next();
		});
	});

	it('should return all checkins', function (done) {
		Model.query(function (err, items) {
			assert.ifError(err);
			should(items).be.an.Object;
			should(items.length).be.within(0, 10);
			done();
		});
	});

	it('should delete all checkins', function (next) {
		Model.deleteAll(function (err) {
			assert.ifError(err);
			next();
		});
	});
});
