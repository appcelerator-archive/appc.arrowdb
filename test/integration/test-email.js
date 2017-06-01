/* global init, assertFailure, dump */
'use strict';

require('./_base');
var tests = require('./_base.tests');

var assert = require('assert'),
	async = require('async'),
	should = require('should'),
	request = require('request');

describe('Email', function () {

	var modelName = 'appc.arrowdb/email',
		Model;

	init(this, function () {
		Model = this.connector.getModel(modelName);
	});

	describe('Count', function () {
		it('should get the count of templates', function (done) {
			Model.count(function (err, count) {
				assert.ifError(err);
				should(count).be.within(0, 1000);
				done();
			});
		});
	});

});