/* global init, assertFailure, dump */
'use strict';

require('./_base');
var tests = require('./_base.tests');

var assert = require('assert'),
	async = require('async'),
	should = require('should'),
	request = require('request');

describe('User', function () {

	var modelName = 'appc.arrowdb/user',
		Model;

	init(this, function () {
		Model = this.connector.getModel(modelName);
	});

	describe('Create', function () {
		tests.create(modelName, {
			username: 'test.user.' + Date.now(),
			password: 'test.password',
			password_confirmation: 'test.password',
			first_name: 'Test',
			last_name: 'User'
		});
	});

	describe('FindAll and FindOne', function () {
		tests.findAllAndFindOne(modelName);
	});

	describe('Query and Count', function () {
		tests.queryAndCount(modelName);
	});

	describe('Update', function () {
		tests.update(modelName, {first_name: 'Dawson', last_name: 'Toth'});
	});

});