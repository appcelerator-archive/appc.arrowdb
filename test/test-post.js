/* global init, assertFailure, dump */
'use strict';

require('./_base');

var fs = require('fs'),
	tests = require('./_base.tests');

describe('Post', function () {

	var modelName = 'appc.arrowdb/post',
		Model;

	init(this, function () {
		Model = this.connector.getModel(modelName);
	});

	describe('Create', function () {
		tests.create(modelName, getCreationDict());
	});

	describe('FindAll and FindOne', function () {
		tests.findAllAndFindByID(modelName);
	});

	describe('Query and Count', function () {
		tests.queryAndCount(modelName);
	});

	describe('Update', function () {
		tests.update(modelName, getCreationDict());
	});

	describe('Delete All', function () {
		tests.deleteAll(modelName);
	});

	function getCreationDict() {
		return {
			content: 'my.post' + Date.now()
		};
	}

});