/* global init, describe, it, before, after */
'use strict';

require('./_base');

var assert = require('assert'),
	should = require('should'),
	mockDBMethod = require('./_base.tests').mockDBMethod;

describe('Log', function () {

	var modelName = 'appc.arrowdb/log',
		Model;

	init(this, function () {
		Model = this.connector.getModel(modelName);
	});

	it('should allow querypushlog', function (next) {
		mockDBMethod.call(this, 'logsQueryPushLogs', {
			"meta": {
				"code": 200,
				"status": "ok",
				"method_name": "queryPushLogs",
				"more": false
			},
			"response": {
				"push_logs": [
					{
						"_id": "53581c34d8d8f2b28a000098",
						"channel": "test",
						"payload": "test schedule",
						"app_id": "527032812a30cf5d96000003",
						"push_schedule_id": "53581c34d8d8f2b28a000097",
						"scheduled_at": "2014-10-24T00:00:00.000Z",
						"created_at": "2014-04-23T20:01:56.409Z",
						"updated_at": "2014-04-23T20:01:56.409Z"
					},
					{
						"_id": "53581a8ed8d8f2b28a000096",
						"channel": "test",
						"payload": "test schedule",
						"app_id": "527032812a30cf5d96000003",
						"push_schedule_id": "53581a8ed8d8f2b28a000095",
						"scheduled_at": "2014-10-24T00:00:00.000Z",
						"created_at": "2014-04-23T19:54:54.163Z",
						"updated_at": "2014-04-23T19:54:54.163Z"
					}
				]
			}
		}, true);

		Model.queryPushLogs({}, function (error, instances) {
			assert.ifError(error);

			should(instances).be.an.Array;
			should(instances).have.length(2);
			should(instances[0]).have.property('app_id', '527032812a30cf5d96000003');
			should(instances[0]).have.property('created_at').should.be.Date;
			should(instances[0]).have.property('payload', 'test schedule');
			should(instances[0]).have.property('channel', 'test');
			should(instances[0]).have.property('push_schedule_id', '53581c34d8d8f2b28a000097');
			should(instances[0]).have.property('updated_at').should.be.Date;
			should(instances[0]).have.property('scheduled_at').should.be.Date;

			next();
		});
	});

	it('should allow querypushlogdetails', function (next) {
		mockDBMethod.call(this, 'logsQueryPushLogDetails', {
			"meta": {
				"code": 200,
				"status": "ok",
				"method_name": "queryPushLogDetails",
				"more": false
			},
			"response": {
				"push_log_details": [
					{
						"_id": "53c98055e4b03fa5a90c2942",
						"android_types": [
							{
								"GCM": 2
							}
						],
						"app_id": "52b392a7f00ed00b1b000194",
						"channel": "#broadcast",
						"created_at": "2014-07-18T20:15:17.562Z",
						"device_count": 2,
						"locked_at": "2014-07-18T20:15:43.555Z",
						"pem_sent_at": "2014-07-18T20:15:43.863Z",
						"push_id": "53c980549d8b700fc70008e6",
						"send_status": 1,
						"types": [
							{
								"android": 2
							}
						],
						"updated_at": "2014-07-18T20:15:16.579Z"
					}
				]
			}
		}, true);

		Model.queryPushLogDetails({
			where: {
				push_id: '53c98055e4b03fa5a90c2942'
			}
		}, function (error, instances) {
			assert.ifError(error);

			should(instances).be.an.Array;
			should(instances).have.length(1);
			should(instances[0]).have.property('android_types').should.be.Object;
			should(instances[0]).have.property('app_id', '52b392a7f00ed00b1b000194');
			should(instances[0]).have.property('channel', '#broadcast');
			should(instances[0]).have.property('created_at').should.be.Date;
			should(instances[0]).have.property('device_count', 2);
			should(instances[0]).have.property('locked_at').should.be.Date;
			should(instances[0]).have.property('pem_sent_at').should.be.Date;
			should(instances[0]).have.property('push_id', '53c980549d8b700fc70008e6');
			should(instances[0]).have.property('send_status', 1);
			should(instances[0]).have.property('types').should.be.Object;
			should(instances[0]).have.property('updated_at').should.be.Date;

			next();
		});
	});
});