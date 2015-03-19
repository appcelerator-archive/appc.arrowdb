/* global init, assertFailure, dump */
'use strict';

require('./_base');

var assert = require('assert'),
	async = require('async'),
	should = require('should');

describe('Posts', function() {
	this.timeout(60000);
	this.slow(50000);

	// var lastPostTitle = 'PostTester' + Math.round(Math.random() * 1e5),
	// 	lastPostContent = '',
	// 	thePost = null;

	// init(function() {
	// 	// since init() sets up before() and after() which in turn creates a fresh
	// 	// server and connector, we need to get the post model each time
	// 	this.PostModel = this.connector.getModel('post');
	// 	should(this.PostModel).be.an.Object;
	// });

	// describe('Query and Count', function() {
	// 	it('should return default of 10 posts without a query', function(done) {
	// 		this.PostModel.query(function(err, posts) {
	// 			assert.ifError(err);
	// 			should(posts).be.an.Object;
	// 			should(posts.length).be.within(0, 10);
	// 			done();
	// 		}.bind(this));
	// 	});

	// 	it('should return no more than 1000 posts using a query', function(done) {
	// 		this.PostModel.query({ limit: 1000 }, function(err, posts) {
	// 			assert.ifError(err);
	// 			should(posts).be.an.Object;
	// 			should(posts.length).be.within(0, 1000);

	// 			done();
	// 		}.bind(this));
	// 	});

	// 	it('should be able to count', function(done) {
	// 		this.PostModel.count(function(err, count) {
	// 			assert.ifError(err);
	// 			should(count).be.a.Number;

	// 			done();
	// 		}.bind(this));
	// 	});

	// 	it('should fail when trying to query more than 1000 posts', function(done) {
	// 		this.PostModel.query({ limit: 1001 }, function(err) {
	// 			assertFailure(err);
	// 			should(err.statusCode).equal(400);
	// 			should(err.body.meta.code).equal(400);
	// 			should(err.body.meta.message).equal('Invalid limit parameter; value must be in a valid range of 1~1000');
	// 			done();
	// 		}.bind(this));
	// 	});
	// });

	// describe('Create', function() {
	// 	it('should create a post', function(done) {
	// 		var r = Math.round(Math.random() * 1e5),
	// 			params = {
	// 				content: 'Test' + r + '@test.com',
	// 				title: lastPostTitle
	// 			};

	// 		lastPostContent = params.content;

	// 		this.PostModel.create(params, function(err, post) {
	// 			assert.ifError(err);

	// 			assertPost(post);

	// 			for (var key in params) {
	// 				if (params.hasOwnProperty(key)) {
	// 					should(post[key]).equal(params[key]);

	// 				}
	// 			}

	// 			thePost = post;

	// 			done();
	// 		}.bind(this));
	// 	});

	// 	it('should query post correctly', function(done) {
	// 		this.PostModel.query({
	// 			where: {
	// 				title: lastPostTitle
	// 			}
	// 		}, function(err, posts) {
	// 			assert.ifError(err);
	// 			should(posts).be.an.Object;
	// 			should(posts.length).equal(1);
	// 			assertPost(posts[0]);
	// 			done();
	// 		});
	// 	});
	// });

	// describe('findAll and findOne', function() {
	// 	it('should find the post by id', function(done) {
	// 		assert(thePost);
	// 		this.PostModel.findOne(thePost.getPrimaryKey(), function(err, post) {
	// 			assert.ifError(err);
	// 			assertPost(post);
	// 			done();
	// 		});
	// 	});

	// 	it('should not find any posts with a invalid id', function(done) {
	// 		this.PostModel.findOne('this_id_is_invalid', function(err) {
	// 			assertFailure(err);
	// 			should(err.statusCode).equal(400);
	// 			should(err.body.meta.code).equal(400);
	// 			should(err.body.meta.message).match(/Invalid object id ?: 'this_id_is_invalid'/i);
	// 			done();
	// 		});
	// 	});

	// 	it('should find our post within all posts', function(done) {
	// 		this.PostModel.findAll(function(err, posts) {
	// 			assert.ifError(err);

	// 			if (posts.length < 1000) {
	// 				// if there are 1000 posts, then we can assume that there could be
	// 				// millions and it's not certain our post will be in the first 999

	// 				var id = thePost.getPrimaryKey(),
	// 					post = null;

	// 				for (var i = 0; i < posts.length; i++) {
	// 					if (posts[i].getPrimaryKey() === id) {
	// 						post = posts[i];
	// 						break;
	// 					}
	// 				}

	// 				assertPost(post);
	// 			}

	// 			done();
	// 		});
	// 	});
	// });

	// describe('Update', function() {

	// 	it('should update post\'s content and set custom fields', function(done) {
	// 		assert(thePost);

	// 		lastPostContent += '_updated';

	// 		thePost.set('content', lastPostContent);
	// 		thePost.set('custom_fields', { test: true });

	// 		thePost.update(function(err, post) {
	// 			assert.ifError(err);
	// 			assertPost(post);
	// 			done();
	// 		});
	// 	});

	// 	it('should query the updated post values', function(done) {
	// 		this.PostModel.query({
	// 			where: {
	// 				title: lastPostTitle
	// 			}
	// 		}, function(err, posts) {
	// 			assert.ifError(err);
	// 			should(posts).be.an.Object;
	// 			should(posts.length).equal(1);

	// 			var post = posts[0];

	// 			assertPost(post);
	// 			should(post.content).equal(lastPostContent);

	// 			should(post).have.property('custom_fields');
	// 			should(post.custom_fields).be.an.Object;
	// 			should(post.custom_fields).have.property('test');
	// 			should(post.custom_fields.test).be.a.Boolean;
	// 			should(post.custom_fields.test).equal(true);

	// 			done();
	// 		});
	// 	});
	// });

	// describe('Delete', function() {
	// 	it('should delete the current post', function(done) {
	// 		assert(thePost);
	// 		thePost.delete(function(err) {
	// 			assert.ifError(err);
	// 			done();
	// 		});
	// 	});

	// 	it('should fail to delete the current post again', function(done) {
	// 		assert(thePost);
	// 		thePost.delete(function(err) {
	// 			assert(err);
	// 			should(err).be.an.Error;
	// 			should(err.message).match(/instance has already been deleted/i);
	// 			done();
	// 		});
	// 	});

	// 	it('should fail to update deleted post', function(done) {
	// 		assert(thePost);
	// 		thePost.set('content', 'foo');
	// 		thePost.update(function(err) {
	// 			assert(err);
	// 			should(err).be.an.Error;
	// 			should(err.message).match(/instance has already been deleted/i);
	// 			done();
	// 		});
	// 	});

	// 	it('should fail to delete when an id is omitted', function(done) {
	// 		this.PostModel.delete(function(err) {
	// 			assert(err);
	// 			should(err).be.an.Error;
	// 			should(err.message).match(/Missing required "id"/);
	// 			done();
	// 		});
	// 	});

	// 	it('should fail to delete when an id does not exist', function(done) {
	// 		this.PostModel.delete('this_id_is_invalid', function(err) {
	// 			assertFailure(err);
	// 			should(err.statusCode).equal(400);
	// 			should(err.body.meta.code).equal(400);
	// 			should(err.body.meta.message).match(/Invalid object id ?: 'this_id_is_invalid'/i);
	// 			done();
	// 		});
	// 	});
	// });

});

function assertPost(post) {
	should(post).be.an.Object;

	should(post.getPrimaryKey()).be.a.String;
	should(post.getPrimaryKey().length).be.greaterThan(0);

	should(post).have.property('title');
	should(post.title).be.a.String;

	should(post).have.property('content');
	should(post.content).be.a.String;

	should(post).have.property('created_at');
	should(post.created_at).be.a.Date;

	should(post).have.property('updated_at');
	should(post.updated_at).be.a.Date;
}
