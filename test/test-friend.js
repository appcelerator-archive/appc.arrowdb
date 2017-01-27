/* global init, describe, it, before, after */
'use strict';

require('./_base');

var assert = require('assert'),
	should = require('should'),
	mockDBMethod = require('./_base.tests').mockDBMethod;

var store = {};

describe('Friend', function () {

	var modelName = 'appc.arrowdb/friend',
		userModelName = 'appc.arrowdb/user',
		auth,
		server,
		Model,
		UserModel,
		user1;

	init(this, function () {
		auth = {
			user: this.server.config.apikey,
			password: ''
		};
		Model = this.connector.getModel(modelName);
		UserModel = this.connector.getModel(userModelName);
		server = this.server;
	});

	before(function (done) {
		user1 = getUserCreationDict('user1');
		UserModel.create([
			user1,
			getUserCreationDict('user2')
		], function (err, instances) {
			store.users = instances;
			done();
		});
	});

	after(function (done) {
		var pending = store.users.length;
		store.users.map(function (user) {
			user.delete(function () {
				--pending || done();
			});
		});
	});

	it('should allow add', function (next) {
		mockDBMethod.call(this, 'friendsAdd', {
			"meta": {
				"code": 200,
				"method_name": "addFriends",
				"status": "ok"
			}
		}, true);

		Model.add({
			user_ids: store.users[0].id,
			approval_required: true
		}, function (error) {
			assert.ifError(error);

			next();
		});
	});

	it('should allow request', function (next) {
		mockDBMethod.call(this, 'friendsRequests', {
			"meta": {
				"code": 200,
				"method_name": "friendRequests",
				"status": "ok"
			},
			"response": {
				"friend_requests": [
					{
						"id": "4e02e02bd0afbe41ef000005",
						"user": {
							"id": store.users[0].id,
							"first_name": store.users[0].first_name
						}
					}
				]
			}
		}, true);

		Model.requests({}, function (error, instances) {
			assert.ifError(error);

			should(instances).be.an.Array;
			should(instances[0]).have.property('user').be.an.Object;
			should(instances[0].user).have.property('id', store.users[0].id);
			should(instances[0].user).have.property('first_name', store.users[0].first_name);

			next();
		});
	});


	it('should allow approve', function (next) {
		mockDBMethod.call(this, 'friendsApprove', {
			"meta": {
				"code": 200,
				"method_name": "approveFriends",
				"status": "ok"
			}
		}, true);

		Model.approve({
			user_ids: store.users[0].id
		}, function (error) {
			assert.ifError(error);

			next();
		});
	});

	it('should allow query', function (next) {
		mockDBMethod.call(this, 'friendsQuery', {
			"meta": {
				"code": 200,
				"status": "ok",
				"method_name": "queryFriends",
				"page": 1,
				"per_page": 10,
				"total_pages": 1,
				"total_results": 1
			},
			"response": {
				"users": [
					{
						"id": store.users[0].id,
						"first_name": store.users[0].first_name
					}
				]
			}
		}, true);

		Model.query({}, function (error, instances) {
			assert.ifError(error);

			should(instances).be.an.Array;
			should(instances[0]).have.property('id', store.users[0].id);
			should(instances[0]).have.property('first_name', store.users[0].first_name);

			next();
		});
	});

	it('should allow remove', function (next) {
		mockDBMethod.call(this, 'friendsRemove', {
			"meta": {
				"code": 200,
				"method_name": "removeFriends",
				"status": "ok"
			}
		}, true);

		Model.remove({
			user_ids: store.users[0].id
		}, function (error) {
			assert.ifError(error);

			next();
		});
	});

	function getUserCreationDict(suffix) {
		return {
			email: 'test.' + Date.now() + '.' + suffix + '@appc.com',
			username: 'test.' + Date.now() + '.' + suffix,
			password: 'test.password',
			password_confirmation: 'test.password',
			first_name: 'Test' + Date.now(),
		};
	}
});