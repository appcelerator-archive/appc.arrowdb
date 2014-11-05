var should = require('should'),
	Connector = require('../'),
	APIBuilder = require('apibuilder'),
	Loader = APIBuilder.Loader,
	config = new Loader('../conf'),
	connector = new Connector(config),
	async = require('async'),
	Model;

describe("Connector", function() {
	this.timeout(10 * 1000);

	before(function(next) {

		// define your model
		Model = APIBuilder.Model.extend('post', {
			fields: {
				title: { type: String },
				content: { type: String }
			},
			connector: connector,
			metadata: {
				ACS: {
					object: 'Posts'
				}
			}
		});

		should(Model).should.be.an.object;

		connector.connect(next);
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

});