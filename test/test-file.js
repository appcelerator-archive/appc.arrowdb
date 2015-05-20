/* global init, assertFailure, dump */
'use strict';

require('./_base');

var fs = require('fs'),
	tests = require('./_base.tests'),
	assert = require('assert'),
	async = require('async'),
	should = require('should'),
	request = require('request');

describe('File', function () {

	var modelName = 'appc.arrowdb/file',
		Model;

	init(this, function () {
		Model = this.connector.getModel(modelName);
	});

	describe('Create', function () {
		tests.create(modelName, {
			name: 'my.file',
			file: fs.createReadStream(__dirname + '/testfile.jpg')
		});
	});

	describe('FindAll and FindOne', function () {
		tests.findAllAndFindOne(modelName);
	});

	describe('Query and Count', function () {
		tests.queryAndCount(modelName);
	});

	describe('Update', function () {
		tests.update(modelName, {name: 'my.file.' + Date.now()});
	});

	describe('Delete All', function () {
		tests.deleteAll(modelName);
	});

});