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
		aclName = 'my.acl.' + Date.now(),
		auth,
		server,
		Model;

	init(this, function () {
		auth = {
			user: this.server.config.apikey,
			password: ''
		};
		Model = this.connector.getModel(modelName);
		server = this.server;
	});

	describe('Create', function () {
		tests.create(modelName, {
			name: aclName
		});

		it('should allow calling show', function (next) {
			this.connector.getModel(modelName).show({
				name: aclName
			}, function (error, response) {
				assert.ifError(error);
				should(response).have.property('name', aclName);
				should(response).have.property('user_id');
				next();
			});
		});

		it('should expose a "show" api', function makeSureAuthIsRequired(cb) {
			request({
				method: 'GET',
				uri: 'http://localhost:' + server.port + '/api/' + modelName + '/show?name=' + aclName,
				auth: auth,
				json: true
			}, function (err, response, body) {
				should(body.success).be.true;
				should(body).have.property('acl');
				should(body.acl).have.property('name', aclName);
				should(body.acl).have.property('user_id');
				cb();
			});
		});
	});

	describe('FindAll and FindOne', function () {
		tests.findAllAndFindOne(modelName);
	});

	describe('Query and Count', function () {
		tests.queryAndCount(modelName);
	});

	describe('Update', function () {
		tests.update(modelName, {name: aclName});
	});

	describe('Delete All', function () {
		tests.deleteAll(modelName);
	});

});