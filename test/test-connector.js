/* global init, assertFailure, dump */
// jscs:disable jsDoc
'use strict';

var should = require('should');

require('./_base');

describe('Connector', function () {

	it('should require a minimum version of Arrow', function () {
		var mockConnector = {
			Capabilities: {},
			extend: function () {}
		};

		should(function () {
			require('../lib/index').create({
				Connector: mockConnector
			});
		}).throw();
		should(function () {
			require('../lib/index').create({
				Version: '1.2.0',
				Connector: mockConnector
			});
		}).throw();
		should(function () {
			require('../lib/index').create({
				Version: '1.5.0',
				Connector: mockConnector
			});
		}).not.throw();
	});

});
