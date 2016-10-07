/* global init, describe, it */
'use strict';

require('./_base');

var tests = require('./_base.tests'),
	assert = require('assert'),
	should = require('should');

describe('Event', function () {

	var modelName = 'appc.arrowdb/event',
		Model,
		store = {};

	init(this, function () {
		Model = this.connector.getModel(modelName);
	});

	describe('Create', function () {
		it('should create an object via the built-in model', function (done) {
			Model.create(getCreationDict(), function (err, instance) {
				assert.ifError(err);
				should(instance.getPrimaryKey()).be.a.String;
				should(instance.getPrimaryKey().length).be.greaterThan(0);
				
				// Store event for later usage
				store.event = instance;

				done();
			});
		});
	});

	describe('FindAll and FindOne', function () {
		tests.findAllAndFindByID(modelName);
	});

	describe('Query and Count', function () {
		tests.queryAndCount(modelName);

		it('should query event occurrences', function (next) {
			Model.queryOccurrences({}, function (error, instances) {
				should(instances).be.an.Array;
				should(instances[0]).have.property('start_time');
				should(instances[0]).have.property('end_time');
				next();
			});
		});

		it('should show event occurrences', function (next) {
			Model.showOccurrences({
				event_id: store.event.id 
			}, function (error, instances) {
				should(instances).be.an.Array;
				should(instances.length).equal(1);
				should(instances[0]).have.property('start_time');
				next();
			});
		});
	});

	describe('Update', function () {
		tests.update(modelName, getCreationDict());
	});

	describe('Delete All', function () {
		tests.deleteAll(modelName);
	});

	function getCreationDict() {
		return {
			name: 'my.event' + Date.now(),
			start_time: new Date()
		};
	}
});