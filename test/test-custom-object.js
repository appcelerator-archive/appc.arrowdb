/* global init, assertFailure, dump */
'use strict';

require('./_base');

var assert = require('assert'),
	async = require('async'),
	Model = require('arrow').Model,
	should = require('should');

describe('Custom Objects', function () {
	var FruitModel = null,
		FruitNameModel = null,
		fruitCount = 0,
		initialCount = 0,
		testCustomObj = null,
		testFruit = null;

	init(this, function () {
		this.CustomObjectModel = this.connector.getModel('customObject');
		should(this.CustomObjectModel).be.an.Object;
	});

	before(function (done) {
		FruitModel = Model.extend('fruit', {
			fields: {
				name: {type: String},
				color: {type: String}
			},
			connector: 'appc.arrowdb'
		});

		should(FruitModel.getConnector()).equal(this.connector);

		this.server.addModel(FruitModel);

		FruitNameModel = Model.reduce('fruit', 'fruitColor', {
			fields: {
				name: {type: String}
			}
		});

		should(FruitNameModel.getConnector()).equal(this.connector);

		this.server.addModel(FruitNameModel);

		done();
	});

	describe('Query and Count', function () {
		it('should return default of 10 custom objects without a query', function (done) {
			FruitModel.query(function (err, fruits) {
				assert.ifError(err);
				should(fruits).be.an.Object;
				should(fruits.length).be.within(0, 10);
				done();
			});
		});

		it('should support sel and unsel', function (done) {
			FruitModel.create({
				name: 'apple' + Math.round(Math.random() * 1e5),
				color: 'red'
			}, function (err) {
				assert.ifError(err);
				FruitModel.query({sel: {name: 1}}, function (err, fruits) {
					assert.ifError(err);
					should(fruits).be.an.Object;
					should(fruits.length).be.ok;
					for (var i = 0; i < fruits.length; i++) {
						should(fruits[i].name).be.ok;
						should(fruits[i].color).be.not.ok;
					}
					FruitModel.query({unsel: {color: '1'}}, function (err, fruits) {
						assert.ifError(err);
						should(fruits).be.an.Object;
						should(fruits.length).be.ok;
						for (var i = 0; i < fruits.length; i++) {
							should(fruits[i].name).be.ok;
							should(fruits[i].color).be.not.ok;
						}
						done();
					});
				});
			});
		});

		it('should support order', function (done) {
			FruitModel.create([
				{name: 'apple', color: 'red'},
				{name: 'orange', color: 'orange'},
				{name: 'watermelon', color: 'green'},
				{name: 'banana', color: 'yellow'},
				{name: 'kiwi', color: 'green'}
			], function (err) {
				assert.ifError(err);
				FruitModel.query({order: {name: 1}}, function (err, fruits) {
					assert.ifError(err);
					should(fruits).be.an.Object;
					should(fruits.length).be.ok;
					for (var i = 0; i < fruits.length - 1; i++) {
						assert(fruits[i].name <= fruits[i + 1].name);
					}
					FruitModel.query({order: {name: -1}}, function (err, fruits) {
						assert.ifError(err);
						should(fruits).be.an.Object;
						should(fruits.length).be.ok;
						for (var i = 0; i < fruits.length - 1; i++) {
							assert(fruits[i].name >= fruits[i + 1].name);
						}
						done();
					});
				});
			});
		});

		it('should support order as string', function (done) {
			FruitModel.create([
				{name: 'apple', color: 'red'},
				{name: 'orange', color: 'orange'},
				{name: 'watermelon', color: 'green'},
				{name: 'banana', color: 'yellow'},
				{name: 'kiwi', color: 'green'}
			], function (err) {
				assert.ifError(err);
				FruitModel.query({order: 'name'}, function (err, fruits) {
					assert.ifError(err);
					should(fruits).be.an.Object;
					should(fruits.length).be.ok;
					for (var i = 0; i < fruits.length - 1; i++) {
						assert(fruits[i].name <= fruits[i + 1].name);
					}
					FruitModel.query({order: '-name'}, function (err, fruits) {
						assert.ifError(err);
						should(fruits).be.an.Object;
						should(fruits.length).be.ok;
						for (var i = 0; i < fruits.length - 1; i++) {
							assert(fruits[i].name >= fruits[i + 1].name);
						}
						done();
					});
				});
			});
		});

		it('should support $like', function (done) {

			async.eachSeries([
				{insert: 'Hello world', where: 'Hello%'},
				// Not supported by ACS: { insert: 'Hello world', where: '%world' },
				// Not supported by ACS: { insert: 'Hello world', where: '%Hello%' },
				{insert: '10% Off', where: '10%% %'},
				{insert: '10% Off', where: '10\\% %'},
				{insert: 'Hello world', where: 'Hello world'},
				{insert: 'Hello world', where: 'He%ld'},
				{insert: 'We use _.js', where: 'We % \\_._s'}
			], function (item, next) {
				FruitModel.create({name: item.insert, color: 'testing'}, function (err) {
					if (err) {
						return next(item.where + ' insert failed: ' + err);
					}
					FruitModel.query({where: {name: {$like: item.where}}}, function (err, coll) {
						if (err || !coll || !coll.length) {
							return next(item.where + ' lookup failed: ' + (err || 'none found'));
						}
						next();
					});
				});
			}, done);

		});

		it('should return no more than 1000 custom objects using a query', function (done) {
			FruitModel.query({limit: 1000}, function (err, fruits) {
				assert.ifError(err);
				should(fruits).be.an.Object;
				should(fruits.length).be.within(1, 1000);

				fruitCount = fruits.length;

				done();
			});
		});

		it('should return the correct custom objects count as queried before', function (done) {
			FruitModel.count(function (err, count) {
				assert.ifError(err);
				should(count).be.a.Number;

				if (fruitCount < 1000) {
					should(count).equal(fruitCount);
				} else {
					should(count).greaterThan(999);
				}

				fruitCount = count;
				initialCount = count;

				done();
			});
		});
	});

	describe('Create', function () {
		it('should create a custom object via built-in model', function (done) {
			var r = Math.round(Math.random() * 1e5),
				params = {
					name: 'grape' + r,
					color: 'purple'
				};

			this.CustomObjectModel.create({
				classname: 'fruit',
				fields: params
			}, function (err, customObj) {
				assert.ifError(err);

				should(customObj.getPrimaryKey()).be.a.String;
				should(customObj.getPrimaryKey().length).be.greaterThan(0);

				should(customObj).have.property('fields');
				should(customObj.fields).be.an.Object;

				should(customObj.fields).have.property('name');
				should(customObj.fields.name).be.a.String;
				should(customObj.fields.name).equal(params.name);

				should(customObj.fields).have.property('color');
				should(customObj.fields.color).be.a.String;
				should(customObj.fields.color).equal(params.color);

				testCustomObj = customObj;
				done();
			});
		});

		it('should create a custom object via custom model', function (done) {
			var params = {
				name: 'apple' + Math.round(Math.random() * 1e5),
				color: 'red'
			};

			FruitModel.create(params, function (err, fruit) {
				assert.ifError(err);

				assertFruit(fruit);

				should(fruit.name).equal(params.name);
				should(fruit.color).equal(params.color);

				testFruit = fruit;

				done();
			});
		});

		it('should increase custom object count via built-in model', function (done) {
			this.CustomObjectModel.count({
				classname: 'fruit'
			}, function (err, count) {
				assert.ifError(err);
				should(count).be.a.Number;
				should(count).equal(fruitCount + 2);
				done();
			}.bind(this));
		});

		it('should increase custom object count via custom model', function (done) {
			FruitModel.count(function (err, count) {
				assert.ifError(err);
				should(count).be.a.Number;
				should(count).equal(fruitCount + 2);

				fruitCount += 2;

				done();
			}.bind(this));
		});

		it('should query custom object correctly via built-in model', function (done) {
			this.CustomObjectModel.query({
				classname: 'fruit',
				where: {
					name: testFruit.name
				}
			}, function (err, objs) {
				assert.ifError(err);

				should(objs).be.an.Object;
				should(objs.length).equal(1);

				var customObj = objs[0];

				should(customObj).be.an.Object;

				should(customObj.getPrimaryKey()).be.a.String;
				should(customObj.getPrimaryKey().length).be.greaterThan(0);

				should(customObj).have.property('fields');
				should(customObj.fields).be.an.Object;

				should(customObj.fields).have.property('name');
				should(customObj.fields.name).be.a.String;
				should(customObj.fields.name).equal(testFruit.name);

				should(customObj.fields).have.property('color');
				should(customObj.fields.color).be.a.String;
				should(customObj.fields.color).equal(testFruit.color);

				done();
			});
		});

		it('should query custom object correctly via custom model', function (done) {
			FruitModel.query({
				where: {
					name: testFruit.name
				}
			}, function (err, fruits) {
				assert.ifError(err);

				should(fruits).be.an.Object;
				should(fruits.length).equal(1);

				var fruit = fruits[0];
				assertFruit(fruit);
				should(fruit.name).equal(testFruit.name);
				should(fruit.color).equal(testFruit.color);

				done();
			});
		});

		it('should create models via batch operation', function(done) {
			var values = [];
			for (var i = 0; i < 50; i++) {
				values.push({
					name: 'Batch Apple ' + (i + 1),
					color: 'red'
				});
			}
			FruitModel.create(values, function (err, result) {
				assert.ifError(err);
				should(result.length).equal(50);
				initialCount += 50;
				done();
			});
		});
	});

	describe('FindAll and FindByID', function () {
		it('should find the custom object by id', function (done) {
			assert(testFruit);
			FruitModel.findByID(testFruit.getPrimaryKey(), function (err, fruit) {
				assert.ifError(err);
				assertFruit(fruit);
				should(fruit.name).equal(testFruit.name);
				should(fruit.color).equal(testFruit.color);
				done();
			});
		});

		it('should not find any custom objects with a invalid id', function (done) {
			FruitModel.findByID('this_id_is_invalid', function (err, results) {
				should(err).not.be.ok;
				should(results).not.be.ok;
				done();
			});
		});

		it('should return default of 1000 custom objects with findAll', function (done) {
			FruitModel.findAll(function (err, fruits) {
				assert.ifError(err);
				should(fruits).be.an.Object;
				should(fruits.length).be.within(1, 1000);
				should(fruits[0]).have.property('name');
				should(fruits[0]).have.property('color');
				done();
			});
		});

		it('should return custom objects from a reduced model', function (done) {
			FruitNameModel.findAll(function (err, fruits) {
				assert.ifError(err);
				should(fruits).be.an.Object;
				should(fruits.length).be.within(1, 1000);
				should(fruits[0]).have.property('name');
				should(fruits[0]).not.have.property('color');
				done();
			});
		});

		it('should find our custom object within all custom objects', function (done) {
			FruitModel.findAll(function (err, fruits) {
				assert.ifError(err);

				if (fruits.length < 1000) {
					// if there are 1000 custom objects, then we can assume that there could be
					// millions and it's not certain our custom object will be in the first 999

					var id = testFruit.getPrimaryKey(),
						fruit = null;

					for (var i = 0; i < fruits.length; i++) {
						if (fruits[i].getPrimaryKey() === id) {
							fruit = fruits[i];
							break;
						}
					}

					assertFruit(fruit);
					should(fruit.name).equal(testFruit.name);
					should(fruit.color).equal(testFruit.color);
				}

				done();
			});
		});
	});

	describe('Update', function () {
		it('should update custom object', function (done) {
			assert(testFruit);
			testFruit.set('color', 'green');
			testFruit.update(function (err, fruit) {
				assert.ifError(err);
				assertFruit(fruit);
				should(fruit.color).equal('green');
				done();
			});
		});

		it('should query the updated custom object values', function (done) {
			FruitModel.query({
				where: {
					name: testFruit.name,
					color: 'green'
				}
			}, function (err, fruits) {
				assert.ifError(err);
				should(fruits).be.an.Object;
				should(fruits.length).equal(1);

				var fruit = fruits[0];
				assertFruit(fruit);

				done();
			});
		});

		it('should fail to update custom object when trying to set a read-only parameter', function (done) {
			assert(testFruit);

			should(function () {
				testFruit.set('confirmed_at', 'foo');
			}).throw();

			done();
		});
	});

	describe('Show', function () {
		it('should show custom object using built-in model', function (done) {
			assert(testFruit);
			this.CustomObjectModel.show({
				classname: 'fruit',
				id: testFruit.getPrimaryKey()
			}, function (err, customObj) {
				assert.ifError(err);

				should(customObj.getPrimaryKey()).be.a.String;
				should(customObj.getPrimaryKey().length).be.greaterThan(0);

				should(customObj).have.property('fields');
				should(customObj.fields).be.an.Object;

				should(customObj.fields).have.property('name');
				should(customObj.fields.name).be.a.String;
				should(customObj.fields.name).equal(testFruit.name);

				should(customObj.fields).have.property('color');
				should(customObj.fields.color).be.a.String;
				should(customObj.fields.color).equal(testFruit.color);

				done();
			});
		});

		it('should show custom object using custom object model by id', function (done) {
			assert(testFruit);
			FruitModel.show(testFruit.getPrimaryKey(), function (err, fruit) {
				assert.ifError(err);
				assertFruit(fruit);
				should(fruit.name).equal(testFruit.name);
				should(fruit.color).equal(testFruit.color);
				done();
			});
		});

		it('should show custom object using custom object model', function (done) {
			assert(testFruit);
			FruitModel.show(testFruit, function (err, fruit) {
				assert.ifError(err);
				assertFruit(fruit);
				should(fruit.name).equal(testFruit.name);
				should(fruit.color).equal(testFruit.color);
				done();
			});
		});

		it('should show custom object via instance', function (done) {
			testFruit.show(function (err, fruit) {
				assert.ifError(err);
				assertFruit(fruit);
				should(fruit.name).equal(testFruit.name);
				should(fruit.color).equal(testFruit.color);
				done();
			});
		});

		it('should show custom object via connector\'s method', function (done) {
			this.connector.show(testFruit, {
				classname: 'fruit',
				id: testFruit.getPrimaryKey()
			}, function (err, fruit) {
				assert.ifError(err);
				assertFruit(fruit);
				should(fruit.name).equal(testFruit.name);
				should(fruit.color).equal(testFruit.color);
				done();
			});
		});
	});

	describe('Delete', function () {
		var tmpFruit = null;

		it('should delete custom object using built-in model', function (done) {
			assert(testCustomObj);
			this.CustomObjectModel.delete(testCustomObj, function (err) {
				assert.ifError(err);
				done();
			});
		});

		it('should delete custom object using custom object model', function (done) {
			assert(testFruit);
			FruitModel.delete(testFruit.getPrimaryKey(), function (err) {
				assert.ifError(err);
				done();
			});
		});

		it('should delete custom object using custom object by instance', function (done) {
			FruitModel.create({
				name: 'banana' + Math.round(Math.random() * 1e5),
				color: 'yellow'
			}, function (err, fruit) {
				assert.ifError(err);
				assertFruit(fruit);

				tmpFruit = fruit;

				fruit.delete(function (err) {
					assert.ifError(err);
					done();
				});
			});
		});

		it('should fail to delete the custom object again', function (done) {
			assert(tmpFruit);
			tmpFruit.delete(function (err) {
				assert(err);
				should(err).be.an.Error;
				should(err.message).match(/instance has already been deleted/i);
				done();
			});
		});

		it('should fail to update the custom object', function (done) {
			assert(testFruit);
			testFruit.set('color', 'blue');
			testFruit.update(function (err, instance) {
				should(err).be.not.ok;
				should(instance).be.not.ok;
				done();
			});
		});

		it('should report original custom object count after deleting all test custom objects', function (done) {
			FruitModel.count(function (err, count) {
				assert.ifError(err);
				should(count).be.a.Number;
				should(count).equal(initialCount);
				done();
			});
		});

		it('should fail to delete when an id is omitted', function (done) {
			FruitModel.delete(function (err) {
				assert(err);
				should(err).be.an.Error;
				should(err.message).match(/Missing required "id"/);
				done();
			});
		});

		it('should fail to delete when an id does not exist', function (done) {
			FruitModel.delete('this_id_is_invalid', function (err) {
				should(err).containEql('trying to remove, couldn\'t');
				done();
			});
		});

		it('should delete multiple custom objects', function (done) {
			var fruits = [];

			async.eachSeries(['pear', 'pineapple', 'pear'], function (name, next) {
				FruitModel.create({
					name: name,
					color: 'green'
				}, function (err, fruit) {
					err || fruits.push(fruit);
					next(err);
				});
			}, function (err) {
				assert.ifError(err);

				should(fruits).be.an.Array;
				should(fruits).have.lengthOf(3);

				FruitModel.count(function (err, beforeCount) {
					assert.ifError(err);
					should(beforeCount).be.a.Number;

					FruitModel.delete(fruits.map(function (f) { return f.getPrimaryKey(); }), function (err) {
						assert.ifError(err);

						FruitModel.count(function (err, afterCount) {
							assert.ifError(err);
							should(afterCount).be.a.Number;
							should(afterCount).equal(beforeCount - fruits.length);
							done();
						});
					});
				});
			});
		});
	});

	describe('Delete All', function () {
		it('should delete all custom objects', function (done) {
			var fruits = [];

			async.times(3, function (n, next) {
				FruitModel.create({
					name: 'mango',
					color: 'yellow-orangish'
				}, function (err, fruit) {
					err || fruits.push(fruit);
					next(err);
				});
			}, function (err) {
				assert.ifError(err);

				FruitModel.deleteAll(function (err) {
					assert.ifError(err);

					// Batch delete is async so we wait a little before counting
					setTimeout(function() {
						FruitModel.count(function (err, count) {
							assert.ifError(err);
							should(count).be.a.Number;
							should(count).equal(0);
							done();
						});
					}, 1000);
				});
			});
		});
	});

	describe('Invalid primary key', function () {
		it('should return 404 on invalid id', function (done) {
			if (!FruitModel) {
				FruitModel = Model.extend('fruit', {
					fields: {
						name: {type: String},
						color: {type: String}
					},
					connector: 'appc.arrowdb'
				});

				should(FruitModel.getConnector()).equal(this.connector);

				this.server.addModel(FruitModel);
			}

			FruitModel.find('12345', function (err, resp) {
				should(err).not.be.ok;
				should(resp).not.be.ok;
				done();
			});
		});
	});
});

function assertFruit(fruit) {
	should(fruit).be.an.Object;

	should(fruit.getPrimaryKey()).be.a.String;
	should(fruit.getPrimaryKey().length).be.greaterThan(0);

	should(fruit).have.property('name');
	should(fruit.name).be.a.String;

	should(fruit).have.property('color');
	should(fruit.color).be.a.String;
}
