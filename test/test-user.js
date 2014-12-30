/* global init, assertFailure, dump */
require('./_base');

var assert = require('assert'),
	async = require('async'),
	should = require('should'),
	APIBuilder = require('appcelerator').apibuilder;

describe('Users', function () {
	this.timeout(60000);
	this.slow(50000);

	var username = 'userTest' + Math.round(Math.random()*1e5),
		userCount = 0,
		initialCount = 0,
		lastname = '',
		theUser = null;

	init(function () {
		// since init() sets up before() and after() which in turn creates a fresh
		// server and connector, we need to get the user model each time
		this.UserModel = this.connector.getModel('user');
	});

	describe('Query and Count', function () {
		it('should return default of 10 users without a query', function (done) {
			this.UserModel.query(function (err, users) {
				assert.ifError(err);
				should(users).be.an.Object;
				should(users.length).be.within(0, 10);
				done();
			}.bind(this));
		});

		it('should return no more than 1000 users using a query', function (done) {
			this.UserModel.query({ limit: 1000 }, function (err, users) {
				assert.ifError(err);
				should(users).be.an.Object;
				should(users.length).be.within(0, 1000);

				userCount = users.length;

				done();
			}.bind(this));
		});

		it('should return the correct users count as queried before', function (done) {
			this.UserModel.count(function (err, count) {
				assert.ifError(err);
				should(count).be.a.Number;

				if (userCount < 1000) {
					should(count).equal(userCount);
				} else {
					should(count).greaterThan(999);
				}

				userCount = count;
				initialCount = count;

				done();
			}.bind(this));
		});

		it('should fail when trying to query more than 1000 users', function (done) {
			this.UserModel.query({ limit: 1001 }, function (err) {
				assertFailure(err);
				should(err.statusCode).equal(400);
				should(err.body.meta.code).equal(400);
				should(err.body.meta.message).equal('Invalid limit parameter; value must be in a valid range of 1~1000');
				done();
			}.bind(this));
		});
	});

	describe('Create', function () {
		it('should create a user', function (done) {
			var r = Math.round(Math.random()*1e5),
				params = {
					email:                 'Test' + r + '@test.com',
					username:              username,
					password:              'password',
					password_confirmation: 'password',
					first_name:            'John' + r,
					last_name:             'Smith' + r,
					role:                  'user'
				};

			lastname = params.last_name;

			this.UserModel.create(params, function (err, user) {
				assert.ifError(err);

				assertUser(user);

				// hack until CLOUDSRV-4502 is resolved
				params.username = params.username.toLowerCase();
				params.email = params.email.toLowerCase();

				should(user.first_name).equal(params.first_name);
				should(user.last_name).equal(params.last_name);
				should(user.external_accounts.length).equal(0);
				should(user.username).equal(params.username);
				should(user.role).equal(params.role);
				should(user.stats.photos.total_count).equal(0);
				should(user.stats.storage.used).equal(0);
				should(user.email).equal(params.email);
				should(user.friend_counts.requests).equal(0);
				should(user.friend_counts.friends).equal(0);

				// ACS currently returns a string, but CLOUDSRV-4504 exists to change it to be a boolean
				[false, 'false'].should.containEql(user.admin);

				theUser = user;

				done();
			}.bind(this));
		});

		it('should increase user count', function (done) {
			this.UserModel.count(function (err, count) {
				assert.ifError(err);
				should(count).be.a.Number;
				should(count).equal(userCount + 1);
				userCount++;
				done();
			}.bind(this));
		});

		it('should query user correctly', function (done) {
			this.UserModel.query({
				where: {
					username: username.toLowerCase() // hack until CLOUDSRV-4502 is resolved
				}
			}, function (err, users) {
				assert.ifError(err);
				should(users).be.an.Object;
				should(users.length).equal(1);
				assertUser(users[0]);
				done();
			});
		});

		it('should fail to create user with existing username', function (done) {
			var r = Math.round(Math.random()*1e5),
				params = {
					username:              username,
					password:              'password',
					password_confirmation: 'password'
				};

			this.UserModel.create(params, function (err, user) {
				assert(err);
				should(err).be.an.Error;
				should(err).have.property('reason');
				should(err.reason).match(/Username is already taken/i);
				done();
			}.bind(this));
		});
	});

	describe('findAll and findOne', function () {
		it('should find the user by id', function (done) {
			assert(theUser);
			this.UserModel.findOne(theUser.getPrimaryKey(), function (err, user) {
				assert.ifError(err);
				assertUser(user);
				done();
			});
		});

		it('should not find any users with a invalid id', function (done) {
			this.UserModel.findOne('this_id_is_invalid', function (err) {
				assertFailure(err);
				should(err.statusCode).equal(400);
				should(err.body.meta.code).equal(400);
				should(err.body.meta.message).match(/Invalid object id ?: 'this_id_is_invalid'/i);
				done();
			});
		});

		it('should find our user within all users', function (done) {
			this.UserModel.findAll(function (err, users) {
				assert.ifError(err);

				if (users.length < 1000) {
					// if there are 1000 users, then we can assume that there could be
					// millions and it's not certain our user will be in the first 999

					var id = theUser.getPrimaryKey(),
						user = null;

					for (var i = 0; i < users.length; i++) {
						if (users[i].getPrimaryKey() === id) {
							user = users[i];
							break;
						}
					}

					assertUser(user);
				}

				done();
			});
		});
	});

	describe('Login and Logout', function () {
		it('should show user not logged in', function (done) {
			assert(theUser);
			theUser.showMe(function (err, result) {
				assert(err);
				should(err).be.an.Error;
				should(err).have.property('statusCode');
				should(err.statusCode).equal(401);
				should(err).have.property('reason');
				should(err.reason).match(/You need to sign in or sign up before continuing/i);
				done();
			});
		});

		it('should log the user in', function (done) {
			assert(theUser);
			theUser.login({
				password: 'password'
			}, function (err, user) {
				assert.ifError(err);
				assertUser(user);
				done();
			});
		});

		it('should show user logged in', function (done) {
			assert(theUser);
			theUser.showMe(function (err, user) {
				assert.ifError(err);
				assertUser(user);
				should(user.username).equal(theUser.username);
				done();
			});
		});

		it('should log the user out', function (done) {
			assert(theUser);
			theUser.logout(function (err) {
				assert.ifError(err);
				done();
			});
		});

		it('should verify user is logged out', function (done) {
			assert(theUser);
			theUser.showMe(function (err) {
				assert(err);
				should(err).be.an.Error;
				should(err).have.property('statusCode');
				should(err.statusCode).equal(401);
				should(err).have.property('reason');
				should(err.reason).match(/You need to sign in or sign up before continuing/i);
				done();
			});
		});
	});

	describe('Update', function () {
		it('should fail to update user because not logged in', function (done) {
			assert(theUser);

			lastname += '_updated';

			theUser.set('last_name', lastname);
			theUser.set('custom_fields', { test: true });

			theUser.update(function (err) {
				assert(err);
				should(err).be.an.Error;
				should(err).have.property('statusCode');
				should(err.statusCode).equal(401);
				should(err).have.property('reason');
				should(err.reason).match(/You need to sign in or sign up before continuing/i);
				done();
			});
		});

		it('should log the user in', function (done) {
			assert(theUser);
			theUser.login({
				password: 'password'
			}, function (err, user) {
				assert.ifError(err);
				assertUser(user);
				done();
			});
		});

		it('should update user\'s last name and add a custom field', function (done) {
			assert(theUser);
			theUser.update(function (err, user) {
				assert.ifError(err);
				assertUser(user);
				done();
			});
		});

		it('should query the updated user values', function (done) {
			this.UserModel.query({
				where: {
					username: username.toLowerCase() // hack until CLOUDSRV-4502 is resolved
				}
			}, function (err, users) {
				assert.ifError(err);
				should(users).be.an.Object;
				should(users.length).equal(1);

				var user = users[0];

				assertUser(user);
				should(user.last_name).equal(lastname);

				should(user).have.property('custom_fields');
				should(user.custom_fields).be.an.Object;
				should(user.custom_fields).have.property('test');
				should(user.custom_fields.test).be.a.Boolean;
				should(user.custom_fields.test).equal(true);

				done();
			});
		});

		it('should fail to update user when trying to set a read-only parameter', function (done) {
			assert(theUser);

			should(function () {
				theUser.set('confirmed_at', 'foo');
			}).throw();

			done();
		});
	});

	describe('Delete', function () {
		it('should delete the current user', function (done) {
			assert(theUser);
			theUser.delete(function (err) {
				assert.ifError(err);
				done();
			});
		});

		it('should fail to delete the current user again', function (done) {
			assert(theUser);
			theUser.delete(function (err) {
				assert(err);
				should(err).be.an.Error;
				should(err.message).match(/instance has already been deleted/i);
				done();
			});
		});

		it('should fail to update deleted user', function (done) {
			assert(theUser);
			theUser.set('last_name', 'foo');
			theUser.update(function (err) {
				assert(err);
				should(err).be.an.Error;
				should(err.message).match(/instance has already been deleted/i);
				done();
			});
		});

		it('should report original user count after deleting all test users', function (done) {
			this.UserModel.count(function (err, count) {
				assert.ifError(err);
				should(count).be.a.Number;
				should(count).equal(initialCount);
				done();
			}.bind(this));
		});

		it('should fail to delete when an id is omitted', function (done) {
			this.UserModel.delete(function (err) {
				assert(err);
				should(err).be.an.Error;
				should(err.message).match(/Missing required "id"/);
				done();
			});
		});

		it('should fail to delete when an id does not exist', function (done) {
			this.UserModel.delete('this_id_is_invalid', function (err) {
				assertFailure(err);
				should(err.statusCode).equal(400);
				should(err.body.meta.code).equal(400);
				should(err.body.meta.message).match(/Invalid object id ?: 'this_id_is_invalid'/i);
				done();
			});
		});

		it('should create a test user', function (done) {
			var r = Math.round(Math.random()*1e5),
				params = {
					email:                 'Test' + r + '@test.com',
					username:              'userTest' + r,
					password:              'password',
					password_confirmation: 'password',
					first_name:            'John' + r,
					last_name:             'Smith' + r,
					role:                  'user'
				};

			this.UserModel.create(params, function (err, user) {
				assert.ifError(err);
				assertUser(user);
				this.testUser = user;
				done();
			}.bind(this));
		});

		it('should fail to delete test user because not logged in', function (done) {
			assert(this.testUser);
			this.UserModel.delete(this.testUser.getPrimaryKey(), function (err) {
				assertFailure(err);
				should(err.statusCode).equal(401);
				should(err.body.meta.code).equal(401);
				should(err.body.meta.message).equal('You need to sign in or sign up before continuing.');
				done();
			});
		});

		it('should log the test user in', function (done) {
			assert(this.testUser);
			this.testUser.login({
				password: 'password'
			}, function (err, user) {
				assert.ifError(err);
				assertUser(user);
				done();
			});
		});

		it('should delete the test user by instance', function (done) {
			assert(this.testUser);
			this.UserModel.delete(this.testUser, function (err) {
				assert.ifError(err);
				this.testUser = null;
				done();
			}.bind(this));
		});

		it.skip('should create a test user', function (done) {
			var r = Math.round(Math.random()*1e5),
				params = {
					email:                 'Test' + r + '@test.com',
					username:              'userTest' + r,
					password:              'password',
					password_confirmation: 'password',
					first_name:            'John' + r,
					last_name:             'Smith' + r,
					role:                  'user'
				};

			this.UserModel.create(params, function (err, user) {
				assert.ifError(err);
				assertUser(user);
				this.testUser = user;
				done();
			}.bind(this));
		});

		it.skip('should log the test user in', function (done) {
			assert(this.testUser);
			this.testUser.login({
				password: 'password'
			}, function (err, user) {
				assert.ifError(err);
				assertUser(user);
				done();
			});
		});

		it.skip('should delete the test user by primary key', function (done) {
			assert(this.testUser);
			this.UserModel.delete(this.testUser.getPrimaryKey(), function (err) {
				assert.ifError(err);
				this.testUser = null;
				done();
			}.bind(this));
		});
	});

	describe('Batch Delete', function () {
		var users = [],
			userCount = 0;

		it('should create 3 users', function (done) {
			this.UserModel.count(function (err, count) {
				assert.ifError(err);
				should(count).be.a.Number;
				userCount = count;

				async.times(3, function (n, next) {
					var r = Math.round(Math.random()*1e5),
						params = {
							email:                 'Test' + r + '@test.com',
							username:              'userTest' + r,
							password:              'password',
							password_confirmation: 'password',
							first_name:            'John' + r,
							last_name:             'Smith' + r,
							role:                  'user'
						};

					this.UserModel.create(params, function (err, user) {
						if (err) {
							next(err);
						} else {
							users.push(user);
							next();
						}
					}.bind(this));
				}.bind(this), function (err) {
					assert.ifError(err);
					done();
				});
			}.bind(this));
		});

		it('should delete all 3 users', function (done) {
			this.UserModel.batchDelete({
				where: {
					'$or': users.map(function (u) { return { id: u.getPrimaryKey() }; })
				}
			}, function (err) {
				assert.ifError(err);

				// sometimes the count is dirty and we need to wait for ACS to finish up the deletes
				setTimeout(function () {
					this.UserModel.count(function (err, count) {
						assert.ifError(err);
						should(count).be.a.Number;
						should(count).equal(userCount);
						done();
					});
				}.bind(this), 2000);
			}.bind(this));
		});
	});
});

function assertUser(user) {
	should(user).be.an.Object;

	should(user.getPrimaryKey()).be.a.String;
	should(user.getPrimaryKey().length).be.greaterThan(0);

	should(user).have.property('first_name');
	should(user.first_name).be.a.String;

	should(user).have.property('last_name');
	should(user.last_name).be.a.String;

	should(user).have.property('created_at');
	should(user.created_at).be.a.Date;

	should(user).have.property('updated_at');
	should(user.updated_at).be.a.Date;

	should(user).have.property('external_accounts');
	should(user.external_accounts).be.an.Array;

	should(user).have.property('confirmed_at');
	should(user.confirmed_at).be.a.Date;

	should(user).have.property('username');
	should(user.username).be.a.String;

	should(user).have.property('role');
	should(user.role).be.a.String;

	should(user).have.property('admin');
	// ACS currently returns a string, but CLOUDSRV-4504 exists to change it to be a boolean
	assert(typeof user.admin === 'boolean' || typeof user.admin === 'string');

	should(user).have.property('stats');
	should(user.stats).be.an.Object;
	should(user.stats).have.keys('photos', 'storage');
	should(user.stats.photos).be.an.Object;
	should(user.stats.photos).have.keys('total_count');
	should(user.stats.photos.total_count).be.a.Number;
	should(user.stats.storage).be.an.Object;
	should(user.stats.storage).have.keys('used');
	should(user.stats.storage.used).be.a.Number;

	should(user).have.property('email');
	should(user.email).be.a.String;

	should(user).have.property('friend_counts');
	should(user.friend_counts).be.an.Object;
	should(user.friend_counts).have.keys('requests', 'friends');
	should(user.friend_counts.requests).be.a.Number;
	should(user.friend_counts.friends).be.a.Number;
}
