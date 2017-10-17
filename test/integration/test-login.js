/* global init, assertFailure, dump */
'use strict';

require('./_base');

var assert = require('assert'),
	async = require('async'),
	should = require('should'),
	request = require('request');

describe('Login', function () {

	init(this);

	var auth,
		sessionCookieString,
		connector,
		server,
		urlToHit;

	before(function (cb) {
		connector = this.connector;
		auth = {
			user: connector.config.username,
			password: connector.config.password
		};
		server = this.server;
		connector.config.requireSessionLogin = true;
		urlToHit = 'http://localhost:' + server.port + '/api/appc.arrowdb/user';
		cb();
	});

	after(function () {
		connector.config.requireSessionLogin = false;
	});

	it('should go through without auth alright', function makeSureAuthIsRequired(cb) {
		connector.config.requireSessionLogin = false;
		request({
			method: 'GET',
			uri: urlToHit,
			auth: auth,
			json: true
		}, function (err, response, body) {
			should(body.success).be.true;
			connector.config.requireSessionLogin = true;
			cb();
		});
	});

	it('should make sure auth is required', function makeSureAuthIsRequired(cb) {
		request({
			method: 'GET',
			uri: urlToHit,
			auth: auth,
			json: true
		}, function (err, response, body) {
			should(body.success).be.false;
			should(body.message).containEql('Authentication is required. Please pass these headers:');
			cb();
		});
	});

	it('should pass with valid auth params', function passGoodAuth(cb) {
		request({
			method: 'GET',
			uri: urlToHit,
			auth: auth,
			headers: {
				user: connector.config.username,
				pass: connector.config.password
			},
			json: true
		}, function (err, response, body) {
			should(body.success).be.true;
			should(response.headers.sessioncookiestring).be.ok;
			sessionCookieString = response.headers.sessioncookiestring;
			cb();
		});
	});

	it('should make sure auth is required even after auth params', function makeSureAuthIsRequired(cb) {
		request({
			method: 'GET',
			uri: urlToHit,
			auth: auth,
			json: true
		}, function (err, response, body) {
			should(body.success).be.false;
			should(body.message).containEql('Authentication is required. Please pass these headers:');
			cb();
		});
	});

	it.skip('should pass with valid sessionCookieString', function passGoodAccessToken(cb) {
		request({
			method: 'GET',
			uri: urlToHit,
			auth: auth,
			headers: {
				sessioncookiestring: sessionCookieString,
				 //request.cookies.arrowdbuid
			},
			json: true
		}, function (err, response, body) {
			should(body.success).be.true;
			should(response).be.ok;
			should(response.headers).have.property('set-cookie');
			should(response.headers['set-cookie']).match(/arrowdbuid=/);
			cb();
		});
	});

	it('should make sure auth is required even after sessionCookieString', function makeSureAuthIsRequired(cb) {
		request({
			method: 'GET',
			uri: urlToHit,
			auth: auth,
			json: true
		}, function (err, response, body) {
			should(body.success).be.false;
			should(body.message).containEql('Authentication is required. Please pass these headers:');
			cb();
		});
	});

	it('should error with invalid sessionCookieString', function passInvalidAccessToken(cb) {
		connector.config.requireSessionLogin = false;
		request({
			method: 'GET',
			uri: urlToHit,
			auth: auth,
			headers: {
				sessionCookieString: 'bad-session-cookie-string!'
			},
			json: true
		}, function (err, response, body) {
			should(body.success).be.false;
			should(body.message).containEql('Invalid or expired sessionCookieString header passed.');
			connector.config.requireSessionLogin = true;
			cb();
		});
	});

	it('should error with invalid auth params', function passInvalidAuth(cb) {
		request({
			method: 'GET',
			uri: urlToHit,
			auth: auth,
			headers: {
				user: 'bad-user!',
				pass: 'bad-pass!'
			},
			json: true
		}, function (err, response, body) {
			should(body.success).be.false;
			should(body.message).containEql('Invalid email/username or password');
			cb();
		});
	});


});