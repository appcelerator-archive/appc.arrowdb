var assert = require('assert'),
	async = require('async'),
	should = require('should'),
	request = require('request');

/*
 Public API.
 */
exports.create = create;
exports.findAllAndFindByID = findAllAndFindByID;
exports.queryAndCount = queryAndCount;
exports.update = update;
exports.deleteAll = deleteAll;
exports.mockDBMethod = mockDBMethod;

/*
 Implementation.
 */

function create(modelName, creationDict) {
	var Model;
	before(function () {
		Model = this.connector.getModel(modelName);
	});

	it('should create an object via the built-in model', function (done) {
		Model.create(creationDict, function (err, instance) {
			assert.ifError(err);
			should(instance.getPrimaryKey()).be.a.String;
			should(instance.getPrimaryKey().length).be.greaterThan(0);
			done();
		});
	});
}

function findAllAndFindByID(modelName) {
	var Model,
		testObject;
	before(function () {
		Model = this.connector.getModel(modelName);
	});

	it('should return range of 0-1000 objects with findAll', function (done) {
		Model.findAll(function (err, items) {
			assert.ifError(err);
			should(items).be.an.Object;
			should(items.length).be.within(1, 1000);
			testObject = items[0];
			done();
		});
	});

	it('should find the object by id', function (done) {
		assert(testObject);
		Model.findByID(testObject.getPrimaryKey(), function (err, instance) {
			assert.ifError(err);
			should(instance).be.ok;
			done();
		});
	});

	it('should find the object by id using deprecated findOne method', function (done) {
		assert(testObject);
		this.connector.findOne(Model, testObject.getPrimaryKey(), function (err, instance) {
			assert.ifError(err);
			should(instance).be.ok;
			done();
		});
	});

	it('should not find any objects with a invalid id', function (done) {
		Model.findByID('this_id_is_invalid', function (err, results) {
			should(err).not.be.ok;
			should(results).not.be.ok;
			done();
		});
	});

	it('should not find any objects with a invalid id using deprecated findOne method', function (done) {
		this.connector.findOne(Model, 'this_id_is_invalid', function (err, results) {
			should(err).not.be.ok;
			should(results).not.be.ok;
			done();
		});
	});
}

function queryAndCount(modelName) {
	var Model;
	before(function () {
		Model = this.connector.getModel(modelName);
	});

	it('should return default of 10 objects without a query', function (done) {
		Model.query(function (err, items) {
			assert.ifError(err);
			should(items).be.an.Object;
			should(items.length).be.within(0, 10);
			done();
		});
	});

	it('should return no more than 1000 objects using a query', function (done) {
		Model.query({limit: 1000}, function (err, items) {
			assert.ifError(err);
			should(items).be.an.Object;
			should(items.length).be.within(0, 1000);
			done();
		});
	});

	it('should fail when trying to query more than 1000 objects', function (done) {
		Model.query({limit: 1001}, function (err) {
			assert(err);
			should(err).be.an.Error;
			should(err.statusCode).equal(400);
			should(err.body.meta.code).equal(400);
			should(err.body.meta.message).equal('Invalid limit parameter; value must be in a valid range of 1~1000');
			done();
		});
	});
}

function update(modelName, updateDict) {
	var Model,
		testObject;
	before(function () {
		Model = this.connector.getModel(modelName);
	});

	it('should find an object to update', function (done) {
		Model.findAll(function (err, items) {
			assert.ifError(err);
			should(items).be.an.Object;
			should(items.length).be.within(1, 1000);
			testObject = items[0];
			done();
		});
	});

	it('should update custom object', function (done) {
		assert(testObject);
		for (var key in updateDict) {
			if (updateDict.hasOwnProperty(key)) {
				testObject.change(key, updateDict[key]);
			}
		}
		testObject.update(function (err, item) {
			assert.ifError(err);
			done();
		});
	});

}

function deleteAll(modelName) {
	var Model;
	before(function () {
		Model = this.connector.getModel(modelName);
	});

	it('should delete objects by id', function (done) {
		Model.query({limit: 50}, function (err, items) {
			assert.ifError(err);
			should(items).be.an.Object;
			should(items.length).be.within(0, 1000);

			function deleteOne(err) {
				should(err).be.not.ok;
				if (items.length === 0) {
					done();
				}
				else {
					var item = items.pop();
					item.delete(deleteOne);
				}
			}

			deleteOne();
		});
	});

	it('should delete all objects', function (done) {
		Model.deleteAll(function (err) {
			assert.ifError(err);
			done();
		});
	});
}

function mockDBMethod (name, resp, once) {
	var db = this.connector.getDB();
	var origMethod = db[name];
	db[name] = function (params, cb) {
		cb(null, {
			body: resp
		});

		if (once) {
			// Restore the original method
			db[name] = origMethod;
		} else {
			return function () {
				db[name] = origMethod;
			};
		}
	};
}