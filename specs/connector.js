var should = require('should'),
	Connector = require('../'),
	APIBuilder = require('apibuilder'),
	Loader = APIBuilder.Loader,
	config = new Loader('../conf'),
	connector = new Connector(config),
	Model;

describe("Connector", function(){

	before(function(next){

		// define your model
		Model = APIBuilder.Model.extend('post',{
			fields: {
				name: { type: String },
				type: { type: String },
				value: { type: String }
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

	after(function(next){
		connector.disconnect(next);
	});

	it("should be able to fetch config", function(callback){
		connector.fetchConfig(function(err, config){
			should(err).be.not.ok;
			should(config).be.an.object;
			callback();
		});
	});

	it("should be able to fetch metadata", function(callback){
		connector.fetchMetadata(function(err, config){
			should(err).be.not.ok;
			should(config).be.an.object;
			callback();
		});
	});

	it("should be able to fetch schema", function(callback){
		connector.fetchSchema(function(err, config){
			should(err).be.not.ok;
			should(config).be.an.object;
			callback();
		});
	});

	it("should be able to create instance", function(callback){

		var object = {
			content: 'Hello, world',
			title: 'Test'
		};

		Model.create(object, function(err, instance){
			should(err).be.not.ok;
			should(instance).be.an.object;
			console.log(instance);

			should(instance.getPrimaryKey()).be.a.string;
			instance.remove(callback);
		});

	});

});