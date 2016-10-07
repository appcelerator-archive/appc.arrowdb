/* global init, describe, it */
'use strict';

require('./_base');

var assert = require('assert'),
	should = require('should'),
	mockDBMethod = require('./_base.tests').mockDBMethod;

describe('Push Notification', function () {

	var modelName = 'appc.arrowdb/pushNotification',
		Model;

	init(this, function () {
		Model = this.connector.getModel(modelName);
	});

	it('should allow subscribe', function (next) {
		mockDBMethod.call(this, 'pushNotificationsSubscribe', {
			meta: {
				"status": "ok",
				"code": 200,
				"method_name": "SubscribeNotification"
			}
		}, true);

		Model.subscribe({
			channel: 'friend_request',
			device_token: 'f7702d77b34ed94869k66oe',
			type: 'android'
		}, function (error) {
			assert.ifError(error);

			next();
		});
	});

	it('should allow subscribe token', function (next) {
		mockDBMethod.call(this, 'pushNotificationsSubscribeToken', {
			meta: {
				"status": "ok",
				"code": 200,
				"method_name": "SubscribeNotificationByToken"
			}
		}, true);

		Model.subscribeToken({
			channel: 'friend_request',
			device_token: 'f7702d77b34ed94869k66oe',
			type: 'android'
		}, function (error) {
			assert.ifError(error);

			next();
		});
	});

	it('should allow subscription update', function (next) {
		mockDBMethod.call(this, 'pushNotificationsUpdateSubscription', {
			meta: {
				"status": "ok",
				"code": 200,
				"method_name": "UpdateSubscription"
			}
		}, true);

		Model.updateSubscription({
			device_token: 'f7702d77b34ed94869k66oe',
			loc: [-122.0507049560547, 37.38685989379883]
		}, function (error) {
			assert.ifError(error);

			next();
		});
	});

	it('should allow unsubscribe', function (next) {
		mockDBMethod.call(this, 'pushNotificationsUnsubscribe', {
			meta: {
				"status": "ok",
				"code": 200,
				"method_name": "UnsubscribeNotification"
			}
		}, true);

		Model.unsubscribe({
			channel: 'friend_request',
			device_token: 'f7702d77b34ed94869k66oe'
		}, function (error) {
			assert.ifError(error);

			next();
		});
	});

	it('should allow subscribe token', function (next) {
		mockDBMethod.call(this, 'pushNotificationsUnsubscribeToken', {
			meta: {
				"status": "ok",
				"code": 200,
				"method_name": "UnsubscribeNotificationByToken"
			}
		}, true);

		Model.unsubscribeToken({
			channel: 'friend_request',
			device_token: 'f7702d77b34ed94869k66oe'
		}, function (error) {
			assert.ifError(error);

			next();
		});
	});

	it('should allow notify', function (next) {
		mockDBMethod.call(this, 'pushNotificationsNotify', {
			"meta": {
				"code": 200,
				"status": "ok",
				"method_name": "Notify"
			},
			"response": {
				"push_notification": {
					"id": "53690d3fe10fa4582a00e887",
					"payload": 'test',
					"channel": "friend_request"
				}
			}
		}, true);

		Model.notify({
			channel: 'friend_request',
			payload: 'test'
		}, function (error, instance) {
			assert.ifError(error);
			should(instance).have.property('payload', 'test');
			should(instance).have.property('channel');
			should(instance.channel).be.an.Array;
			should(instance.channel[0]).equal('friend_request');
			next();
		});
	});

	it('should allow notify tokens', function (next) {
		mockDBMethod.call(this, 'pushNotificationsNotifyTokens', {
			"meta": {
				"status": "ok",
				"code": 200,
				"method_name": "NotifyTokens"
			}
		}, true);

		Model.notifyTokens({
			"channel": 'friend_request',
			"to_tokens": '123',
			"payload": 'test'
		}, function (error) {
			assert.ifError(error);

			next();
		});
	});

	it('should allow query', function (next) {
		mockDBMethod.call(this, 'pushNotificationsQuery', {
			"meta": {
				"status": "ok",
				"code": 200,
				"method_name": "querySubscriptions",
				"page": 1,
				"per_page": 10,
				"total_pages": 1,
				"total_results": 2
			},
			"response": {
				"subscriptions": [
					{
						"id": "4f6171dcd29513027200000c",
						"channel": ["friend_request", "alert"],
						"device_token": "f7702d77b34ed94869f664e7a297ccc173bec93a2b815css6asd28461a0358dd",
						"type": "ios"
					},
					{
						"id": "4f6171e7d29513027200000e",
						"channel": ["friend_request", "vip"],
						"device_token": "f7702d77b34ed94869k66oe",
						"type": "android"
					}
				]
			}
		}, true);

		Model.query({}, function (error, instances) {
			assert.ifError(error);
			should(instances).be.an.Array;
			should(instances[0]).have.property('device_token', 'f7702d77b34ed94869f664e7a297ccc173bec93a2b815css6asd28461a0358dd');
			should(instances[0]).have.property('type', 'ios');
			should(instances[0]).have.property('channel');
			should(instances[0].channel).be.an.Array;
			should(instances[0].channel[0]).equal('friend_request');
			should(instances[0].channel[1]).equal('alert');

			next();
		});
	});

	it('should allow set badge', function (next) {
		mockDBMethod.call(this, 'pushNotificationsSetBadge', {
			"meta": {
				"status": "ok",
				"code": 200,
				"method_name": "setBadge"
			}
		}, true);

		Model.setBadge({
			"badge_number": '12'
		}, function (error) {
			assert.ifError(error);

			next();
		});
	});

	it('should allow reset badge', function (next) {
		mockDBMethod.call(this, 'pushNotificationsResetBadge', {
			"meta": {
				"status": "ok",
				"code": 200,
				"method_name": "resetBadge"
			}
		}, true);

		Model.resetBadge({
			"device_token": 'f7702d77b34ed94869k66oe'
		}, function (error) {
			assert.ifError(error);

			next();
		});
	});
	
});