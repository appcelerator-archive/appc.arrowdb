/* global init, assertFailure, dump */
'use strict';

require('./_base');

var tests = require('./_base.tests'),
	assert = require('assert'),
	async = require('async'),
	should = require('should'),
	request = require('request');

describe('ACL', function () {

	var modelName = 'appc.arrowdb/acl',
		Model;

	init(this, function () {
		Model = this.connector.getModel(modelName);
	});

	describe('Create', function () {
		tests.create(modelName, {
			name: 'my.acl.' + Date.now()
		});
	});

	describe('FindAll and FindOne', function () {
		tests.findAllAndFindOne(modelName);
	});

	describe('Query and Count', function () {
		tests.queryAndCount(modelName);
	});

	describe('Update', function () {
		tests.update(modelName, {name: 'my.acl.' + Date.now()});
	});

	describe('Delete All', function () {
		tests.deleteAll(modelName);
	});

});