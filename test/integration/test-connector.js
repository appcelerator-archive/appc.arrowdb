/* global init, assertFailure, dump */
'use strict';

var should = require('should');

require('./_base');

describe('Connector', function () {

	init(this, function () {});

	it('should require a minimum version of Arrow', function () {
		var mockConnector = {
			Capabilities: {},
			extend: function () {}
		};

		should(function () {
			require('../../lib/index').create({
				Connector: mockConnector
			});
		}).throw();
		should(function () {
			require('../../lib/index').create({
				Version: '1.2.0',
				Connector: mockConnector
			});
		}).throw();
		should(function () {
			require('../../lib/index').create({
				Version: '1.5.0',
				Connector: mockConnector
			});
		}).not.throw();
	});

	it('should fetch config', function (done) {
		var mockConnector = Object.create({
			config: {
				requireSessionLogin: true
			},
			cacheInit: function () {}
		});

		this.connector.fetchConfig.call(mockConnector, function (err, result) {
			should(result).be.an.Object;
			should(result).equal(mockConnector.config);
			done();
		});
	});

	it('should throw error', function () {
		should(function() {
			this.connector.getDB();
		}).throw();
	});

	it('should return db', function (done) {
		var mockConnector = Object.create({
			db: this.connector.baseDB
		});

		var db = this.connector.getDB.call(mockConnector);
		should(db).be.an.Object;
		done();
	});
});
