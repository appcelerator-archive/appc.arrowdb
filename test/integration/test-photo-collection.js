/* global init, assertFailure, dump */
'use strict';

require('./_base');

var fs = require('fs'),
	assert = require('assert'),
	should = require('should');

describe('PhotoCollection', function () {

	var modelName = 'appc.arrowdb/photoCollection',
		photoModelName = 'appc.arrowdb/photo',
		Model,
		PhotoModel,
		store = {};

	init(this, function () {
		Model = this.connector.getModel(modelName);
		PhotoModel = this.connector.getModel(photoModelName);
	});

	before(function (done) {
		// Create user models which should be used like chat participants.
		PhotoModel.create({
			photo: fs.createReadStream(__dirname + '/testfile.jpg'),
			photo_sizes: { preview: '120x120#' },
			'photo_sync_sizes[]': 'preview'
		}, function (err, instance) {
			// Store photo for later usage
			store.photos = [instance];
			done();
		});
	});

	after(function (done) {
		var pending = store.photos.length;
		store.photos.map(function (user) {
			user.delete(function () {
				--pending || done();
			});
		});
	});

	it('should create an object via the built-in model', function (next) {
		Model.create({
			cover_photo_id: store.photos[0].id,
			name: 'Holiday' + Date.now()
		}, function (err, instances) {
			assert.ifError(err);
			should(instances).be.an.Array;
			should(instances).have.lengthOf(1);
			should(instances[0]).have.property('name');
			should(instances[0]).have.property('cover_photo_id');

			// Store photoCollection for later usage
			store.photoCollection = instances[0];

			next();
		});
	});

	it('should create a photo and assign it to collection', function (next) {
		PhotoModel.create({
			photo: fs.createReadStream(__dirname + '/testfile.jpg'),
			photo_sizes: { preview: '120x120#' },
			'photo_sync_sizes[]': 'preview',
			collection_id: store.photoCollection.id
		}, function (err, instance) {
			assert.ifError(err);

			// Store photo for later usage
			store.photos.push(instance);

			next();
		});
	});

	// Cannot update models with no query method
	// Reported like a bug
	it.skip('should allow update', function (next) {
		Model.update({
			id: store.photoCollection.id,
			name: 'Holiday' + Date.now()
		}, function (err, instances) {
			assert.ifError(err);
			should(instances).be.an.Array;
			should(instances).have.lengthOf(1);
			should(instances[0]).have.property('name');
			should(instances[0]).have.property('cover_photo_id');

			next();
		});
	});

	it('should allow showPhotos', function (next) {
		Model.showPhotos({
			collection_id: store.photoCollection.id
		}, function (error, instances) {
			assert.ifError(error);
			should(instances).be.an.Array;
			should(instances.length).equal(1);
			next();
		});
	});

	it('should allow showSubcollections', function (next) {
		Model.showSubcollections({
			collection_id: store.photoCollection.id
		}, function (error, instances) {
			assert.ifError(error);
			should(instances).be.an.Array;
			should(instances.length).equal(0);
			next();
		});
	});

	it.skip('should delete the collection', function (next) {
		store.photoCollection.delete(function (err) {
			assert.ifError(err);
			next();
		});
	});

});