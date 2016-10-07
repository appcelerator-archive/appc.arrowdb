/* global init, describe, it */
'use strict';

require('./_base');

var assert = require('assert'),
	should = require('should'),
	mockDBMethod = require('./_base.tests').mockDBMethod;

describe('Push Schedule', function () {

	var modelName = 'appc.arrowdb/pushSchedule',
		store = {},
		Model;

	init(this, function () {
		Model = this.connector.getModel(modelName);
	});

	it('should allow create', function (next) {
		mockDBMethod.call(this, 'pushSchedulesCreate', {
			"meta": {
				"code": 200,
				"status": "ok",
				"method_name": "createPushSchedule"
			},
			"response": {
				"push_schedules": [
					{
						"id": "535ac45b5714f50a99002e1e",
						"name": "test",
						"start_time": "2016-01-01T00:00:00+0000",
						"push_notification": {
							"channel": "test",
							"payload": "test schedule",
							"geo_condition": "{\"$geoWithin\":{\"$centerSphere\":[[-122.0507049560547,37.38685989379883],0.00252589]}}"
						},
						"recurrence": {
							"interval": "weekly",
							"end_time": "2016-01-08T00:00:00+0000"
						}
					}
				]
			}
		}, true);

		Model.create({
			schedule: {
				start_time: '2016-01-01T00:00',
				name: 'test',
				push_notification: {
					channel: 'test',
					payload: 'test schedule'
				},
				recurrence: {
					interval: 'weekly',
					end_time: '2016-01-08T00:00'
				}
			},
			where: {
				loc: {
					$nearSphere: {
						$geometry: {
							type: "Point",
							coordinates: [-122.2708, 37.8044]
						},
						$maxDistance: 2000
					}
				}
			}
		}, function (error, instances) {
			assert.ifError(error);
			should(instances).be.an.Array;
			should(instances[0]).have.property('name', 'test');
			should(instances[0]).have.property('start_time');
			should(instances[0]).have.property('push_notification');
			should(instances[0].push_notification).be.an.Object;
			should(instances[0].push_notification).have.property('channel', 'test');
			should(instances[0].push_notification).have.property('payload', 'test schedule');
			should(instances[0].push_notification).have.property('geo_condition');
			should(instances[0].recurrence).be.an.Object;
			should(instances[0].recurrence).have.property('interval', 'weekly');
			should(instances[0].recurrence).have.property('end_time');

			// Store pushSchedule for later usage
			store.pushSchedule = instances[0];
			next();
		});
	});

	it('should allow query', function (next) {
		mockDBMethod.call(this, 'pushSchedulesQuery', {
			"meta": {
				"code": 200,
				"status": "ok",
				"method_name": "queryPushSchedules"
			},
			"response": {
				"push_schedules": [
					{
						"id": "535ac45b5714f50a99002e1e",
						"name": "test",
						"start_time": "2016-01-01T00:00:00+0000",
						"push_notification": {
							"channel": "test",
							"payload": "test schedule",
							"geo_condition": "{\"$geoWithin\":{\"$centerSphere\":[[-122.0507049560547,37.38685989379883],0.00252589]}}"
						},
						"recurrence": {
							"interval": "weekly",
							"end_time": "2016-01-08T00:00:00+0000"
						}
					}
				]
			}
		}, true);

		Model.query({}, function (error, instances) {
			assert.ifError(error);
			should(instances).be.an.Array;
			should(instances[0]).have.property('name', 'test');
			should(instances[0]).have.property('start_time');
			should(instances[0]).have.property('push_notification');
			should(instances[0].push_notification).be.an.Object;
			should(instances[0].push_notification).have.property('channel', 'test');
			should(instances[0].push_notification).have.property('payload', 'test schedule');
			should(instances[0].push_notification).have.property('geo_condition');
			should(instances[0].recurrence).be.an.Object;
			should(instances[0].recurrence).have.property('interval', 'weekly');
			should(instances[0].recurrence).have.property('end_time');

			// Store pushSchedule for later usage
			store.pushSchedule = instances[0];
			next();
		});
	});

	it('should allow update', function (next) {
		mockDBMethod.call(this, 'pushSchedulesUpdate', {
			"meta": {
				"code": 200,
				"status": "ok",
				"method_name": "updatePushSchedule"
			},
			"response": {
				"push_schedules": [
					{
						"id": "535ac45b5714f50a99002e1e",
						"name": "test changed",
						"start_time": "2016-01-01T00:00:00+0000",
						"push_notification": {
							"channel": "test",
							"payload": "test schedule",
							"geo_condition": "{\"$geoWithin\":{\"$centerSphere\":[[-122.0507049560547,37.38685989379883],0.00252589]}}"
						},
						"recurrence": {
							"interval": "weekly",
							"end_time": "2016-01-08T00:00:00+0000"
						}
					}
				]
			}
		}, true);

		store.pushSchedule.name = 'test changed';
		store.pushSchedule.save(function (error, instance) {
			assert.ifError(error);

			should(instance).be.an.Object;
			should(instance).have.property('name', 'test changed');

			next();
		});
	});

	it('should allow delete', function (next) {
		mockDBMethod.call(this, 'pushSchedulesDelete', {
			"meta": {
				"code": 200,
				"status": "ok",
				"method_name": "deletePushSchedules"
			}
		}, true);

		store.pushSchedule.delete(function (error) {
			assert.ifError(error);

			next();
		});
	});
});