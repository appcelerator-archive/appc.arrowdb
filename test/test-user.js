/* global init, assertFailure, dump */
'use strict';

require('./_base');
var tests = require('./_base.tests');

var Arrow = require('arrow'),
	assert = require('assert'),
	async = require('async'),
	should = require('should'),
	request = require('request');

describe('User', function () {

	var modelName = 'appc.arrowdb/user',
		Model,
		server;

	init(this, function () {
		Model = this.connector.getModel(modelName);
		server = this.server;
	});

	describe('Create', function () {
		tests.create(modelName, getCreationDict('create'));
	});

	describe('FindAll and FindOne', function () {
		tests.findAllAndFindOne(modelName);
	});

	describe('Query and Count', function () {
		tests.queryAndCount(modelName);
	});

	describe('Update', function () {
		tests.update(modelName, {first_name: 'Dawson', last_name: 'Toth'});

		it('should update users properly over REST', function (done) {
			var urlToHit = 'http://localhost:' + server.port + '/api/' + modelName,
				auth = {
					user: server.config.apikey,
					password: ''
				};

			Model.create([
				getCreationDict('extend1'),
				getCreationDict('extend2'),
				getCreationDict('extend3')
			], function (err, results) {
				assert.ifError(err);
				should(results).be.an.Object;
				should(results.length).be.within(0, 10);

				async.each(results,
					function updateEachResult(result, next) {
						var json = result.toJSON();
						json.first_name = 'Updated:' + result.id;
						request({
							method: 'PUT',
							uri: urlToHit + '/' + result.id,
							auth: auth,
							json: json
						}, function (err, response, body) {
							assert.ifError(err);
							next();
						});
					},
					checkUpdates);

				function checkUpdates() {
					async.each(results,
						function checkEachResult(result, next) {
							request({
								method: 'GET',
								uri: urlToHit + '/' + result.id,
								auth: auth,
								json: true
							}, function (err, response, body) {
								assert.ifError(err);
								should(body[body.key]).have.property('first_name', 'Updated:' + result.id);
								next();
							});
						},
						done);
				}
			});
		});
	});

	function getCreationDict(suffix) {
		return {
			email: 'test.' + Date.now() + '.' + suffix + '@appc.com',
			username: 'test.' + Date.now() + '.' + suffix,
			password: 'test.password',
			password_confirmation: 'test.password',
			first_name: 'Test',
			last_name: 'User'
		};
	}
});