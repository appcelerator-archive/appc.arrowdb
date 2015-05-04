/* global init, assertFailure, dump */
'use strict';

require('./_base');

var assert = require('assert'),
	async = require('async'),
	should = require('should');

describe('Social Integrations', function () {

	init();

	it('should allow calling externalAccountLogin', function (next) {

		this.connector.getModel('socialIntegration').externalAccountLogin({
			id: 'an_invalid_external_id',
			type: 'custom',
			token: ''
		}, function (error, response) {
			next();
		});

	});
});