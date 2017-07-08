/* global init, describe, it, before, after */
'use strict';

require('./_base');

var assert = require('assert'),
	should = require('should');

describe('Chat', function () {

	var modelName = 'appc.arrowdb/chat',
		userModelName = 'appc.arrowdb/user',
		Model,
		UserModel,
		store = {};

	init(this, function () {
		Model = this.connector.getModel(modelName);
		UserModel = this.connector.getModel(userModelName);
	});

	before(function (done) {
		// Create user models which should be used like chat participants.
		UserModel.create([
			getUserCreationDict('user1'),
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

	it('should allow create', function (next) {
		Model.create({
			to_ids: store.users[0].id + ',' + store.users[1].id,
			message: 'Hello!'
		}, function (error, instance) {
			assert.ifError(error);
			should(instance).have.property('id');
			should(instance).have.property('message');

			// Store message for later usage
			store.chatMsg = instance;

			next();
		});
	});

	it('should allow query', function (next) {
		Model.query({
			// The where filter is set explicitly, because otherwise the orm will use participate_ids instead of 
			// wwhere filter which is not not acceptable
			where: {},
			participate_ids: store.users[0].id + ',' + store.users[1].id
		}, function (error, instances) {
			assert.ifError(error);
			should(instances).be.an.Array;
			should(instances[0]).have.property('message', 'Hello!');
			next();
		});
	});

	it('should query chat groups', function (next) {
		Model.getChatGroups({}, function (error, instances) {
			should(instances).be.an.Array;
			should(instances[0]).have.property('message', 'Hello!');
			should(instances[0]).have.property('participate_ids');
			//should(instances[0].participate_ids).have.lengthOf(2);
			should(instances[0].participate_ids).be.an.Array;
			next();
		});
	});

	it('should allow delete', function (next) {
		store.chatMsg.delete(function (error) {
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
			first_name: 'Test',
			last_name: 'User'
		};
	}
});