/* global init, describe, it */
'use strict';

require('./_base');

var tests = require('./_base.tests'),
	assert = require('assert'),
	should = require('should');

describe('Status', function () {

	var modelName = 'appc.arrowdb/status',
		placeModelName = 'appc.arrowdb/place',
		Model,
		PlaceModel,
		store = {};

	init(this, function () {
		Model = this.connector.getModel(modelName);
		PlaceModel = this.connector.getModel(placeModelName);
	});

	describe('Create', function () {
		it('should create a place', function(next) {
			PlaceModel.create({
				name: 'my.place' + Date.now(),
				city: 'NY'
			}, function (err, instance) {
				// Store place for later usage
				store.place = instance;
				next();
			});
		});

		it('should create an object via the built-in model', function (next) {
			Model.create({
				place_id: store.place.id,
				message: 'my.status' + Date.now()
			}, function (err, instance) {
				assert.ifError(err);
				should(instance.getPrimaryKey()).be.a.String;
				should(instance.getPrimaryKey().length).be.greaterThan(0);

				// Store sttus for later usage
				store.status = instance;

				next();
			});
		});

		it('should update status', function (next) {
			Model.update({
				id: store.status.id,
				message: 'my.status' + Date.now()
			}, function (err) {
				assert.ifError(err);
				next();
			});
		});
	});

	describe('FindAll and FindOne', function () {
		tests.findAllAndFindByID(modelName);
	});

	describe('Query and Count', function () {
		tests.queryAndCount(modelName);
	});

	describe('Delete All', function () {
		tests.deleteAll(modelName);

		it('should delete a place', function (next) {
			store.place.delete(next);
		});
	});

});