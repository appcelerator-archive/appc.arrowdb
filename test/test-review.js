/* global init, describe, it */
'use strict';

require('./_base');

var tests = require('./_base.tests'),
	assert = require('assert'),
	should = require('should');

describe('Review', function () {

	var modelName = 'appc.arrowdb/review',
		postModelName = 'appc.arrowdb/post',
		Model,
		PostModel,
		store = {};

	init(this, function () {
		Model = this.connector.getModel(modelName);
		PostModel = this.connector.getModel(postModelName);
	});

	describe('Create', function () {
		it('should create a post', function (next) {
			PostModel.create({
				content: 'my.post' + Date.now()
			}, function (err, instance) {
				// Store post for later usage
				store.post = instance;
				next();
			});
		});

		it('should create an object via the built-in model', function (next) {
			Model.create({
				post_id: store.post.id,
				content: 'my.review' + Date.now()
			}, function (err, instance) {
				assert.ifError(err);
				should(instance.getPrimaryKey()).be.a.String;
				should(instance.getPrimaryKey().length).be.greaterThan(0);

				// Store review for later usage
				store.review = instance;

				next();
			});
		});

		it('should update review', function (next) {
			Model.update({
				id: store.review.id,
				content: 'my.review' + Date.now()
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

		it('should delete a post', function (next) {
			store.post.delete(next);
		});
	});

});