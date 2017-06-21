/* global init, describe, it, before, after */
'use strict';

require('./_base');

var assert = require('assert'),
	should = require('should');

describe('Like', function () {

	var modelName = 'appc.arrowdb/like',
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
			// Store place for later usage
			store.place = instance;

			done();
		});
	});

	after(function (done) {
		store.place.delete(done);
	});

	it('should create like based on place', function (next) {
		Model.create({
			place_id: store.place.id
		}, function (err, instances) {
			assert.ifError(err);
			should(instances[0].getPrimaryKey()).be.a.String;
			should(instances[0].getPrimaryKey().length).be.greaterThan(0);
			should(instances[0]).have.property('likeable_id', store.place.id);
			should(instances[0]).have.property('likeable_type', 'Place');

			// Store like for later usage
			store.like = instances[0];

			next();
		});
	});

	it('should return all likes', function (done) {
		Model.query({ where: {} }, function (err, items) {
			assert.ifError(err);
			should(items).be.an.Object;
			should(items.length).be.within(0, 10);
			done();
		});
	});

	it('should delete all likes', function (next) {
		Model.deleteAll(function (err) {
			assert.ifError(err);
			next();
		});
	});
});