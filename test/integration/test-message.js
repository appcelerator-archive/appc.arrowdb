/* global init, describe, it, before, after */
'use strict';

require('./_base');

var assert = require('assert'),
	should = require('should');

var store = {};

describe('Message', function () {

	var modelName = 'appc.arrowdb/message',
		userModelName = 'appc.arrowdb/user',
		Model,
		UserModel;

	init(this, function () {
		Model = this.connector.getModel(modelName);
		UserModel = this.connector.getModel(userModelName);
	});

	before(function (done) {
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
			subject: 'Greetings',
			body: 'Hello there!'
		}, function (error, instance) {
			assert.ifError(error);
			should(instance).have.property('id');
			should(instance).have.property('subject');
			should(instance).have.property('body');

			// Store msg for later usage
			store.message = instance;

			next();
		});
	});

	it('should allow query', function (next) {
		Model.query({}, function (error, instances) {
			assert.ifError(error);
			should(instances).be.an.Array;
			next();
		});
	});

	it.skip('should allow showInbox', function (next) {
		Model.showInbox({}, function (error, instances) {
			assert.ifError(error);
			should(instances).be.an.Array;
			should(instances[0]).have.property('status', 'unread');
			should(instances[0]).have.property('body', 'Hello there!');
			should(instances[0]).have.property('subject', 'Greetings');
			next();
		});
	});

	it('should allow showSent', function (next) {
		Model.showSent({}, function (error, instances) {
			assert.ifError(error);
			should(instances).be.an.Array;
			should(instances[0]).have.property('from_id');
			should(instances[0]).have.property('status', 'sent');
			should(instances[0]).have.property('subject', 'Greetings');
			next();
		});
	});

	it.skip('should allow showThread', function (next) {
		Model.showThread({
			thread_id: store.message.thread_id
		}, function (error, instances) {
			assert.ifError(error);
			should(instances).be.an.Array;
			should(instances).have.lengthOf(2);
			next();
		});
	});

	it.skip('should allow showThreads', function (next) {
		Model.showThreads({}, function (error, instances) {
			assert.ifError(error);
			should(instances).be.an.Array;
			should(instances).have.lengthOf(1);
			next();
		});
	});

	it('should delete all objects in the given thread', function (done) {
		Model.deleteThread({
			thread_id: store.message.thread_id
		}, function (err) {
			assert.ifError(err);
			done();
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