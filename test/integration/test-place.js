/* global init, assertFailure, dump */
'use strict';

require('./_base');
var tests = require('./_base.tests');

var assert = require('assert'),
	async = require('async'),
	should = require('should'),
	request = require('request');

describe('Place', function () {

	var modelName = 'appc.arrowdb/place',
		Model;

	init(this, function () {
		Model = this.connector.getModel(modelName);
	});

	describe('Create', function () {
		tests.create(modelName, {
			name: 'my.place.' + Date.now(),
			address: '440 N Bernardo Ave',
			city: 'Mountain View',
			state: 'CA',
			country: 'USA',
			postal_code: '94043'
		});
	});

	describe('FindAll and FindByID', function () {
		tests.findAllAndFindByID(modelName);
	});

	describe('Query and Count', function () {
		tests.queryAndCount(modelName);
	});

	describe('Update', function () {
		tests.update(modelName, { state: 'California' });
	});

	describe('Delete All', function () {
		tests.deleteAll(modelName);
	});

});