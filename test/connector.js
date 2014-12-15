var should = require('should'),
	APIBuilder = require('appcelerator').apibuilder,
	server = new APIBuilder(),
	async = require('async'),
	Model,
	connector;

describe("Connector", function() {
	this.timeout(10 * 1000);
	
	before(function(next) {
		connector = server.getConnector('appc.acs');

		// define your model
		Model = APIBuilder.Model.extend('post', {
			fields: {
				title: { type: String },
				content: { type: String }
			},
			connector: 'appc.acs',
			metadata: {
				'appc.acs': {
					object: 'Posts'
				}
			}
		});

		should(Model).should.be.an.object;
		
		next();
	});

	after(function(next) {
		connector.disconnect(next);
	});

	it("should be able to fetch config", function(callback) {
		connector.fetchConfig(function(err, config) {
			should(err).be.not.ok;
			should(config).be.an.object;
			callback();
		});
	});

	it("should be able to fetch metadata", function(callback) {
		connector.fetchMetadata(function(err, config) {
			should(err).be.not.ok;
			should(config).be.an.object;
			callback();
		});
	});

	it("should be able to fetch schema", function(callback) {
		connector.fetchSchema(function(err, config) {
			should(err).be.not.ok;
			should(config).be.an.object;
			callback();
		});
	});

	it('should be able to create a user', function(callback) {
		var UserModel = APIBuilder.Model.extend('User', {
				fields: {
					first_name: { type: String },
					last_name: { type: String },
					email: { type: String },
					role: { type: String },
					username: { type: String, readonly: true },
					password: { type: String, hidden: true },
					password_confirmation: { type: String, hidden: true }
				},
				connector: 'appc.acs',
				metadata: {
					'appc.acs': {
						object: 'Users'
					}
				}
			}),
			object = {
				"first_name": "John",
				"last_name": "Smith",
				"email": "test" + Date.now() + "@test.com",
				"password": "password",
				"password_confirmation": "password",
				"role": "user"
			};

		UserModel.create(object, function(err, instance) {
			should(err).be.not.ok;
			should(instance).be.an.Object;
			should(instance.getPrimaryKey()).be.a.String;
			should(instance.first_name).equal(object.first_name);
			should(instance.last_name).equal(object.last_name);
			should(instance.email).equal(object.email);
			should(instance.password).be.not.ok;
			callback();
		});

	});

	it("should be able to create instance", function(callback) {

		var object = {
			title: 'Hello, world',
			content: 'How are you today?'
		};

		Model.create(object, function(err, instance) {
			should(err).be.not.ok;
			should(instance).be.an.object;
			should(instance.getPrimaryKey()).be.a.string;
			should(instance.title).equal(object.title);
			should(instance.content).equal(object.content);
			instance.remove(callback);
		});

	});

	it("should be able to query instances", function(callback) {

		var objects = [];
		for (var i = 1; i <= 5; i++) {
			objects.push({
				title: i + ' Iterations and Counting!',
				content: 'Those iterations sure do add up, do they not?'
			});
		}

		Model.create(objects, function(err, instances) {
			should(err).be.not.ok;

			var options = {
				where: { content: objects[0].content },
				sel: { all: ["id", "title"] },
				order: 'title,-content',
				limit: 5,
				skip: 0
			};
			Model.find(options, function(err, coll) {
				should(err).be.not.ok;

				async.eachSeries(coll, function(obj, next) {
					should(obj.getPrimaryKey()).be.a.string;
					should(obj.title).be.a.string;
					should(obj.content).be.not.ok;
					obj.remove(next);
				}, callback);
			});

		});

	});

	// TODO: Add test to check updating data.

});
