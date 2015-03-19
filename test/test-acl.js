/* global init, assertFailure, dump */
'use strict';

require('./_base');

var assert = require('assert'),
	async = require('async'),
	should = require('should');

describe('ACLs', function () {
	this.timeout(60000);
	this.slow(50000);

	// var users = [],
	// 	userCount = 0,
	// 	aclCount = 0,
	// 	initialCount = 0,
	// 	r = Math.round(Math.random()*1e5),
	// 	aclNoReadersNoWritersName = 'aclTestNoReadersNoWriters' + r,
	// 	aclNoReadersNoWriters = null,
	// 	aclReaderOnlyName = 'aclReaderOnly' + r,
	// 	aclReaderOnly = null,
	// 	aclReaderAndWriterName = 'aclReaderWriter' + r,
	// 	aclReaderAndWriter = null;

	// init(function () {
	// 	this.ACLModel = this.connector.getModel('acl');
	// 	should(this.ACLModel).be.an.Object;
	// 	this.UserModel = this.connector.getModel('user');
	// 	should(this.UserModel).be.an.Object;
	// });

	// describe('Setup', function () {
	// 	it('should create reader and writer test users', function (done) {
	// 		this.UserModel.count(function (err, count) {
	// 			assert.ifError(err);
	// 			should(count).be.a.Number;
	// 			userCount = count;

	// 			async.eachSeries(['ACLReader', 'ACLWriter', 'ACLGuest'], function (username, next) {
	// 				var r = Math.round(Math.random()*1e5),
	// 					params = {
	// 						email:                 'test' + r + '@test.com',
	// 						username:              username + r,
	// 						password:              'password',
	// 						password_confirmation: 'password',
	// 						first_name:            'John' + r,
	// 						last_name:             'Smith' + r,
	// 						role:                  'user'
	// 					};

	// 				this.UserModel.create(params, function (err, user) {
	// 					if (err) {
	// 						next(err);
	// 					} else {
	// 						users.push(user);
	// 						next();
	// 					}
	// 				}.bind(this));
	// 			}.bind(this), function (err) {
	// 				assert.ifError(err);
	// 				done();
	// 			});
	// 		}.bind(this));
	// 	});
	// });

	// describe('Query and Count', function () {
	// 	it('should return default of 10 acls without a query', function (done) {
	// 		this.ACLModel.query(function (err, acls) {
	// 			assert.ifError(err);
	// 			should(acls).be.an.Object;
	// 			should(acls.length).be.within(0, 10);
	// 			done();
	// 		}.bind(this));
	// 	});

	// 	it('should return no more than 1000 acls using a query', function (done) {
	// 		this.ACLModel.query({ limit: 1000 }, function (err, acls) {
	// 			assert.ifError(err);
	// 			should(acls).be.an.Object;
	// 			should(acls.length).be.within(0, 1000);

	// 			aclCount = acls.length;

	// 			done();
	// 		}.bind(this));
	// 	});

	// 	it('should return the correct acls count as queried before', function (done) {
	// 		this.ACLModel.count(function (err, count) {
	// 			assert.ifError(err);
	// 			should(count).be.a.Number;

	// 			if (aclCount < 1000) {
	// 				should(count).equal(aclCount);
	// 			} else {
	// 				should(count).greaterThan(999);
	// 			}

	// 			aclCount = count;
	// 			initialCount = count;

	// 			done();
	// 		}.bind(this));
	// 	});

	// 	it('should fail when trying to query more than 1000 acls', function (done) {
	// 		this.UserModel.query({ limit: 1001 }, function (err) {
	// 			assertFailure(err);
	// 			should(err.statusCode).equal(400);
	// 			should(err.body.meta.code).equal(400);
	// 			should(err.body.meta.message).equal('Invalid limit parameter; value must be in a valid range of 1~1000');
	// 			done();
	// 		}.bind(this));
	// 	});
	// });

	// describe('Create', function () {
	// 	it('should create a new acl without any readers or writers', function (done) {
	// 		this.ACLModel.create({
	// 			name: aclNoReadersNoWritersName
	// 		}, function (err, acl) {
	// 			assert.ifError(err);

	// 			assertACL(acl);

	// 			should(acl.name).equal(aclNoReadersNoWritersName);
	// 			should(acl.public_read).equal(false);
	// 			should(acl.public_write).equal(false);
	// 			should(acl.readers).eql([ this.connector.user.id ]);
	// 			should(acl.writers).eql([ this.connector.user.id ]);

	// 			aclNoReadersNoWriters = acl;

	// 			done();
	// 		}.bind(this));
	// 	});

	// 	it('should create a new acl with a reader, but no writer', function (done) {
	// 		this.ACLModel.create({
	// 			name: aclReaderOnlyName,
	// 			reader_ids: users[0].getPrimaryKey()
	// 		}, function (err, acl) {
	// 			assert.ifError(err);

	// 			assertACL(acl);

	// 			should(acl.name).equal(aclReaderOnlyName);
	// 			should(acl.public_read).equal(false);
	// 			should(acl.public_write).equal(false);
	// 			should(acl.readers).eql([ users[0].getPrimaryKey(), this.connector.user.id ]);
	// 			should(acl.writers).eql([ this.connector.user.id ]);

	// 			aclReaderOnly = acl;

	// 			done();
	// 		}.bind(this));
	// 	});

	// 	it('should create a new acl with a reader and a writer', function (done) {
	// 		this.ACLModel.create({
	// 			name: aclReaderAndWriterName,
	// 			reader_ids: users[0].getPrimaryKey() + ',' + users[1].getPrimaryKey(),
	// 			writer_ids: users[1].getPrimaryKey()
	// 		}, function (err, acl) {
	// 			assert.ifError(err);

	// 			assertACL(acl);

	// 			should(acl.name).equal(aclReaderAndWriterName);
	// 			should(acl.public_read).equal(false);
	// 			should(acl.public_write).equal(false);
	// 			should(acl.readers).eql([ users[0].getPrimaryKey(), users[1].getPrimaryKey(), this.connector.user.id ]);
	// 			should(acl.writers).eql([ users[1].getPrimaryKey(), this.connector.user.id ]);

	// 			aclReaderAndWriter = acl;

	// 			done();
	// 		}.bind(this));
	// 	});

	// 	it('should return the correct acls count after creating 3 new ones', function (done) {
	// 		this.ACLModel.count(function (err, count) {
	// 			assert.ifError(err);
	// 			should(count).be.a.Number;
	// 			should(count).equal(aclCount + 3);
	// 			aclCount = count + 3;
	// 			done();
	// 		}.bind(this));
	// 	});
	// });

	// describe('findAll and findOne', function () {
	// 	it('should find the acl by id', function (done) {
	// 		assert(aclNoReadersNoWriters);
	// 		this.ACLModel.findOne(aclNoReadersNoWriters.getPrimaryKey(), function (err, acl) {
	// 			assert.ifError(err);
	// 			assertACL(acl);
	// 			done();
	// 		});
	// 	});

	// 	it('should not find any acls with a invalid id', function (done) {
	// 		this.ACLModel.findOne('this_id_is_invalid', function (err) {
	// 			assertFailure(err);
	// 			should(err.statusCode).equal(400);
	// 			should(err.body.meta.code).equal(400);
	// 			should(err.body.meta.message).match(/Invalid object id ?: 'this_id_is_invalid'/i);
	// 			done();
	// 		});
	// 	});

	// 	it('should find our acl within all acls', function (done) {
	// 		assert(aclNoReadersNoWriters);
	// 		this.ACLModel.findAll(function (err, acls) {
	// 			assert.ifError(err);

	// 			if (acls.length < 1000) {
	// 				// if there are 1000 acls, then we can assume that there could be
	// 				// millions and it's not certain our user will be in the first 999

	// 				var id = aclNoReadersNoWriters.getPrimaryKey(),
	// 					acl = null;

	// 				for (var i = 0; i < acls.length; i++) {
	// 					if (acls[i].getPrimaryKey() === id) {
	// 						acl = acls[i];
	// 						break;
	// 					}
	// 				}

	// 				assertACL(acl);
	// 			}

	// 			done();
	// 		});
	// 	});
	// });

	// describe('Check - No Reader, No Writer', function () {
	// 	it('should fail for an invalid user', function (done) {
	// 		this.ACLModel.check({
	// 			id: aclNoReadersNoWriters.getPrimaryKey(),
	// 			user_id: 'some_user_id'
	// 		}, function (err, result) {
	// 			assert(err);
	// 			should(err).be.an.Error;
	// 			should(err.statusCode).equal(400);
	// 			should(err.reason).match(/Invalid user id/i);
	// 			done();
	// 		});
	// 	});

	// 	it('should fail for an invalid user (instance, object)', function (done) {
	// 		aclNoReadersNoWriters.check({
	// 			user_id: 'some_user_id'
	// 		}, function (err, result) {
	// 			assert(err);
	// 			should(err).be.an.Error;
	// 			should(err.statusCode).equal(400);
	// 			should(err.reason).match(/Invalid user id/i);
	// 			done();
	// 		});
	// 	});

	// 	it('should fail for an invalid user (instance, id)', function (done) {
	// 		aclNoReadersNoWriters.check('some_user_id', function (err, result) {
	// 			assert(err);
	// 			should(err).be.an.Error;
	// 			should(err.statusCode).equal(400);
	// 			should(err.reason).match(/Invalid user id/i);
	// 			done();
	// 		});
	// 	});

	// 	it('should fail for missing user id (instance, missing id)', function (done) {
	// 		aclNoReadersNoWriters.check(function (err, result) {
	// 			assert(err);
	// 			should(err).be.an.Error;
	// 			should(err.statusCode).equal(400);
	// 			should(err.reason).match(/Invalid user id/i);
	// 			done();
	// 		});
	// 	});

	// 	it('should fail for reader user', function (done) {
	// 		this.ACLModel.check({
	// 			id: aclNoReadersNoWriters.getPrimaryKey(),
	// 			user_id: users[0].getPrimaryKey()
	// 		}, function (err, result) {
	// 			assert.ifError(err);
	// 			should(result).have.property('read_permission');
	// 			should(result.read_permission).equal(false);
	// 			should(result).have.property('write_permission');
	// 			should(result.write_permission).equal(false);
	// 			done();
	// 		});
	// 	});

	// 	it('should fail for reader user (instance)', function (done) {
	// 		aclNoReadersNoWriters.check(users[0].getPrimaryKey(), function (err, result) {
	// 			assert.ifError(err);
	// 			should(result).have.property('read_permission');
	// 			should(result.read_permission).equal(false);
	// 			should(result).have.property('write_permission');
	// 			should(result.write_permission).equal(false);
	// 			done();
	// 		});
	// 	});

	// 	it('should fail for writer user', function (done) {
	// 		this.ACLModel.check({
	// 			id: aclNoReadersNoWriters.getPrimaryKey(),
	// 			user_id: users[1].getPrimaryKey()
	// 		}, function (err, result) {
	// 			assert.ifError(err);
	// 			should(result).have.property('read_permission');
	// 			should(result.read_permission).equal(false);
	// 			should(result).have.property('write_permission');
	// 			should(result.write_permission).equal(false);
	// 			done();
	// 		});
	// 	});

	// 	it('should fail for writer user (instance)', function (done) {
	// 		aclNoReadersNoWriters.check(users[1].getPrimaryKey(), function (err, result) {
	// 			assert.ifError(err);
	// 			should(result).have.property('read_permission');
	// 			should(result.read_permission).equal(false);
	// 			should(result).have.property('write_permission');
	// 			should(result.write_permission).equal(false);
	// 			done();
	// 		});
	// 	});

	// 	it('should fail for guest user', function (done) {
	// 		this.ACLModel.check({
	// 			id: aclNoReadersNoWriters.getPrimaryKey(),
	// 			user_id: users[2].getPrimaryKey()
	// 		}, function (err, result) {
	// 			assert.ifError(err);
	// 			should(result).be.an.Object;
	// 			should(result).have.property('read_permission');
	// 			should(result.read_permission).equal(false);
	// 			should(result).have.property('write_permission');
	// 			should(result.write_permission).equal(false);
	// 			done();
	// 		});
	// 	});

	// 	it('should fail for guest user (instance)', function (done) {
	// 		aclNoReadersNoWriters.check(users[2].getPrimaryKey(), function (err, result) {
	// 			assert.ifError(err);
	// 			should(result).be.an.Object;
	// 			should(result).have.property('read_permission');
	// 			should(result.read_permission).equal(false);
	// 			should(result).have.property('write_permission');
	// 			should(result.write_permission).equal(false);
	// 			done();
	// 		});
	// 	});
	// });

	// describe('Check - Reader Only, No Writer', function () {
	// 	it('should succeed for reader user', function (done) {
	// 		this.ACLModel.check({
	// 			id: aclReaderOnly.getPrimaryKey(),
	// 			user_id: users[0].getPrimaryKey()
	// 		}, function (err, result) {
	// 			assert.ifError(err);
	// 			should(result).have.property('read_permission');
	// 			should(result.read_permission).equal(true);
	// 			should(result).have.property('write_permission');
	// 			should(result.write_permission).equal(false);
	// 			done();
	// 		});
	// 	});

	// 	it('should succeed for reader user (instance)', function (done) {
	// 		aclReaderOnly.check(users[0].getPrimaryKey(), function (err, result) {
	// 			assert.ifError(err);
	// 			should(result).have.property('read_permission');
	// 			should(result.read_permission).equal(true);
	// 			should(result).have.property('write_permission');
	// 			should(result.write_permission).equal(false);
	// 			done();
	// 		});
	// 	});

	// 	it('should fail for writer user', function (done) {
	// 		this.ACLModel.check({
	// 			id: aclReaderOnly.getPrimaryKey(),
	// 			user_id: users[1].getPrimaryKey()
	// 		}, function (err, result) {
	// 			assert.ifError(err);
	// 			should(result).have.property('read_permission');
	// 			should(result.read_permission).equal(false);
	// 			should(result).have.property('write_permission');
	// 			should(result.write_permission).equal(false);
	// 			done();
	// 		});
	// 	});

	// 	it('should fail for writer user (instance)', function (done) {
	// 		aclReaderOnly.check(users[1].getPrimaryKey(), function (err, result) {
	// 			assert.ifError(err);
	// 			should(result).have.property('read_permission');
	// 			should(result.read_permission).equal(false);
	// 			should(result).have.property('write_permission');
	// 			should(result.write_permission).equal(false);
	// 			done();
	// 		});
	// 	});

	// 	it('should fail for guest user', function (done) {
	// 		this.ACLModel.check({
	// 			id: aclReaderOnly.getPrimaryKey(),
	// 			user_id: users[2].getPrimaryKey()
	// 		}, function (err, result) {
	// 			assert.ifError(err);
	// 			should(result).be.an.Object;
	// 			should(result).have.property('read_permission');
	// 			should(result.read_permission).equal(false);
	// 			should(result).have.property('write_permission');
	// 			should(result.write_permission).equal(false);
	// 			done();
	// 		});
	// 	});

	// 	it('should fail for guest user (instance)', function (done) {
	// 		aclReaderOnly.check(users[2].getPrimaryKey(), function (err, result) {
	// 			assert.ifError(err);
	// 			should(result).be.an.Object;
	// 			should(result).have.property('read_permission');
	// 			should(result.read_permission).equal(false);
	// 			should(result).have.property('write_permission');
	// 			should(result.write_permission).equal(false);
	// 			done();
	// 		});
	// 	});
	// });

	// describe('Check - Reader and Writer', function () {
	// 	it('should succeed for reader user', function (done) {
	// 		this.ACLModel.check({
	// 			id: aclReaderAndWriter.getPrimaryKey(),
	// 			user_id: users[0].getPrimaryKey()
	// 		}, function (err, result) {
	// 			assert.ifError(err);
	// 			should(result).have.property('read_permission');
	// 			should(result.read_permission).equal(true);
	// 			should(result).have.property('write_permission');
	// 			should(result.write_permission).equal(false);
	// 			done();
	// 		});
	// 	});

	// 	it('should succeed for reader user (instance)', function (done) {
	// 		aclReaderAndWriter.check(users[0].getPrimaryKey(), function (err, result) {
	// 			assert.ifError(err);
	// 			should(result).have.property('read_permission');
	// 			should(result.read_permission).equal(true);
	// 			should(result).have.property('write_permission');
	// 			should(result.write_permission).equal(false);
	// 			done();
	// 		});
	// 	});

	// 	it('should succeed for writer user', function (done) {
	// 		this.ACLModel.check({
	// 			id: aclReaderAndWriter.getPrimaryKey(),
	// 			user_id: users[1].getPrimaryKey()
	// 		}, function (err, result) {
	// 			assert.ifError(err);
	// 			should(result).have.property('read_permission');
	// 			should(result.read_permission).equal(true);
	// 			should(result).have.property('write_permission');
	// 			should(result.write_permission).equal(true);
	// 			done();
	// 		});
	// 	});

	// 	it('should succeed for writer user (instance)', function (done) {
	// 		aclReaderAndWriter.check(users[1].getPrimaryKey(), function (err, result) {
	// 			assert.ifError(err);
	// 			should(result).have.property('read_permission');
	// 			should(result.read_permission).equal(true);
	// 			should(result).have.property('write_permission');
	// 			should(result.write_permission).equal(true);
	// 			done();
	// 		});
	// 	});

	// 	it('should fail for guest user', function (done) {
	// 		this.ACLModel.check({
	// 			id: aclReaderAndWriter.getPrimaryKey(),
	// 			user_id: users[2].getPrimaryKey()
	// 		}, function (err, result) {
	// 			assert.ifError(err);
	// 			should(result).be.an.Object;
	// 			should(result).have.property('read_permission');
	// 			should(result.read_permission).equal(false);
	// 			should(result).have.property('write_permission');
	// 			should(result.write_permission).equal(false);
	// 			done();
	// 		});
	// 	});

	// 	it('should fail for guest user (instance)', function (done) {
	// 		aclReaderAndWriter.check(users[2].getPrimaryKey(), function (err, result) {
	// 			assert.ifError(err);
	// 			should(result).be.an.Object;
	// 			should(result).have.property('read_permission');
	// 			should(result.read_permission).equal(false);
	// 			should(result).have.property('write_permission');
	// 			should(result.write_permission).equal(false);
	// 			done();
	// 		});
	// 	});
	// });

	// describe('Add User', function () {
	// 	it('should add guest user to reader only acl', function (done) {
	// 		aclReaderOnly.add({
	// 			reader_ids: users[2].getPrimaryKey()
	// 		}, function (err, acl) {
	// 			assert.ifError(err);
	// 			assertACL(acl);

	// 			// hack until CLOUDSRV-4518 is fixed
	// 			this.ACLModel.query({
	// 				where: {
	// 					id: aclReaderOnly.getPrimaryKey()
	// 				}
	// 			}, function (err, acls) {
	// 				assert.ifError(err);
	// 				should(acls).be.an.Object;
	// 				should(acls.length).equal(1);
	// 				var acl = acls[0];
	// 				assertACL(acl);
	// 				should(acl.readers).be.an.Array;
	// 				should(acl.readers.length).equal(3);
	// 				should(acl.readers).containEql(users[0].getPrimaryKey());
	// 				should(acl.readers).containEql(users[2].getPrimaryKey());
	// 				should(acl.readers).containEql(this.connector.user.id);
	// 				done();
	// 			}.bind(this));
	// 		}.bind(this));
	// 	});

	// 	it('should succeed for guest user', function (done) {
	// 		aclReaderOnly.check(users[2].getPrimaryKey(), function (err, result) {
	// 			assert.ifError(err);
	// 			should(result).be.an.Object;
	// 			should(result).have.property('read_permission');
	// 			should(result.read_permission).equal(true);
	// 			should(result).have.property('write_permission');
	// 			should(result.write_permission).equal(false);
	// 			done();
	// 		});
	// 	});
	// });

	// describe('Show ACL', function () {
	// 	it('should show the acl info', function (done) {
	// 		this.ACLModel.show(aclReaderOnly, function (err, acl) {
	// 			assert.ifError(err);
	// 			assertACL(acl);
	// 			should(acl.readers).be.an.Array;
	// 			should(acl.readers.length).equal(3);
	// 			should(acl.readers).containEql(users[0].getPrimaryKey());
	// 			should(acl.readers).containEql(users[2].getPrimaryKey());
	// 			should(acl.readers).containEql(this.connector.user.id);
	// 			done();
	// 		}.bind(this));
	// 	});

	// 	it('should show the acl info (instance)', function (done) {
	// 		aclReaderOnly.show(function (err, acl) {
	// 			assert.ifError(err);
	// 			assertACL(acl);
	// 			should(acl.readers).be.an.Array;
	// 			should(acl.readers.length).equal(3);
	// 			should(acl.readers).containEql(users[0].getPrimaryKey());
	// 			should(acl.readers).containEql(users[2].getPrimaryKey());
	// 			should(acl.readers).containEql(this.connector.user.id);
	// 			done();
	// 		}.bind(this));
	// 	});
	// });

	// describe('Remove User', function () {
	// 	it('should remove guest user from reader only acl', function (done) {
	// 		var uid = this.connector.user.id;
	// 		aclReaderOnly.remove({
	// 			reader_ids: users[2].getPrimaryKey()
	// 		}, function (err, acl) {
	// 			assert.ifError(err);
	// 			assertACL(acl);

	// 			setTimeout(function () {
	// 				aclReaderOnly.show(function (err, acl) {
	// 					assert.ifError(err);
	// 					assertACL(acl);
	// 					should(acl.readers).be.an.Array;
	// 					should(acl.readers.length).equal(2);
	// 					should(acl.readers).containEql(users[0].getPrimaryKey());
	// 					should(acl.readers).containEql(uid);
	// 					done();
	// 				});
	// 			}, 500);
	// 		});
	// 	});
	// });

	// describe('Delete', function () {
	// 	it('should delete the no readers, no writers acl', function (done) {
	// 		this.ACLModel.delete(aclNoReadersNoWriters, function (err) {
	// 			assert.ifError(err);
	// 			done();
	// 		});
	// 	});

	// 	it('should delete the readers only acl by instance', function (done) {
	// 		aclReaderOnly.delete(function (err) {
	// 			assert.ifError(err);
	// 			done();
	// 		});
	// 	});

	// 	it('should delete the readers and writers acl by instance', function (done) {
	// 		aclReaderAndWriter.delete(function (err) {
	// 			assert.ifError(err);
	// 			done();
	// 		});
	// 	});

	// 	it('should have same acl count as start of test', function (done) {
	// 		this.ACLModel.count(function (err, count) {
	// 			assert.ifError(err);
	// 			should(count).be.a.Number;
	// 			should(count).equal(initialCount);
	// 			done();
	// 		}.bind(this));
	// 	});
	// });

	// describe('Delete All', function () {
	// 	it('should create 3 acls and delete them', function (done) {
	// 		var acls = [],
	// 			self = this;

	// 		async.times(3, function (n, next) {
	// 			self.ACLModel.create({
	// 				name: 'testACL' + Math.round(Math.random()*1e5)
	// 			}, function (err, acl) {
	// 				err || acls.push(acl);
	// 				next(err);
	// 			});
	// 		}, function (err) {
	// 			assert.ifError(err);

	// 			self.ACLModel.deleteAll(function (err) {
	// 				assert.ifError(err);

	// 				setTimeout(function () {
	// 					self.ACLModel.count(function (err, count) {
	// 						assert.ifError(err);
	// 						should(count).be.a.Number;
	// 						should(count).equal(0);
	// 						done();
	// 					});
	// 				}, 3000);
	// 			});
	// 		});
	// 	});
	// });

	// describe('Cleanup', function () {
	// 	it('should delete the reader and writer users', function (done) {
	// 		async.each(users, function (user, next) {
	// 			user.delete(next);
	// 		}, function (err) {
	// 			assert.ifError(err);

	// 			this.UserModel.count(function (err, count) {
	// 				assert.ifError(err);
	// 				should(count).be.a.Number;
	// 				should(count).equal(userCount);
	// 				done();
	// 			});
	// 		}.bind(this));
	// 	});

	// 	it('should have same user count as start of test', function (done) {
	// 		this.UserModel.count(function (err, count) {
	// 			assert.ifError(err);
	// 			should(count).be.a.Number;
	// 			should(count).equal(userCount);
	// 			done();
	// 		});
	// 	});
	// });
});

function assertACL(acl) {
	should(acl).be.an.Object;

	should(acl.getPrimaryKey()).be.a.String;
	should(acl.getPrimaryKey().length).be.greaterThan(0);

	should(acl).have.property('name');
	should(acl.name).be.a.String;

	should(acl).have.property('created_at');
	should(acl.created_at).be.a.Date;

	should(acl).have.property('updated_at');
	should(acl.updated_at).be.a.Date;

	should(acl).have.property('public_read');
	should(acl).have.property('public_write');

	should(acl).have.property('readers');
	should(acl.readers).be.an.Array;

	should(acl).have.property('writers');
	should(acl.writers).be.an.Array;

	should(acl).have.property('user');
	should(acl.user).be.an.Object;

	should(acl).have.property('user_id');
}