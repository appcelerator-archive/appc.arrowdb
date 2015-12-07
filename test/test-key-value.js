/* global init, assertFailure, dump */
'use strict';

require('./_base');

var tests = require('./_base.tests'),
	assert = require('assert'),
	async = require('async'),
	should = require('should'),
	request = require('request');

describe('Key Value', function () {

	var Model;
	init(this, function () {
		Model = this.connector.getModel('keyValue');
	});

	describe('Strings', function () {

		it('should set', function (next) {
			Model._set({
				name: 'welcome_message',
				value: 'Welcome to Appcelerator Cloud Services'
			}, function (err) {
				should(err).be.not.ok;
				next();
			});
		});

		it('should append', function (next) {
			Model.append({
				name: 'welcome_message',
				value: ', a really great way to store and retrieve data in the cloud!'
			}, function (err) {
				should(err).be.not.ok;
				next();
			});
		});

		it('should get', function (next) {
			Model._get({
				name: 'welcome_message'
			}, function (err, instance) {
				should(err).be.not.ok;
				should(instance.toJSON().value).equal('Welcome to Appcelerator Cloud Services, a really great way to store and retrieve data in the cloud!');
				next();
			});
		});

		it('should delete', function (next) {
			Model._get({
				name: 'welcome_message'
			}, function (err, instance) {
				should(err).be.not.ok;
				instance.delete(next);
			});
		});

	});

	describe('Numbers', function () {

		it('should set number', function (next) {
			Model._set({
				name: 'welcome_count',
				value: 1
			}, function (err) {
				should(err).be.not.ok;
				next();
			});
		});

		it('should incrby', function (next) {
			Model.incrby({
				name: 'welcome_count',
				value: 2
			}, function (err) {
				should(err).be.not.ok;
				next();
			});
		});


		it('should get', function (next) {
			Model._get({
				name: 'welcome_count'
			}, function (err, instance) {
				should(err).be.not.ok;
				should(+instance.toJSON().value).equal(3);
				next();
			});
		});

		it('should update', function (next) {
			Model._get({
				name: 'welcome_count'
			}, function (err, instance) {
				should(err).be.not.ok;
				instance.value = 1337;
				Model.update(instance, function (err) {
					should(err).be.not.ok;
					next();
				});
			});
		});

		it('should delete', function (next) {
			Model._get({
				name: 'welcome_count'
			}, function (err, instance) {
				should(err).be.not.ok;
				instance.delete(next);
			});
		});

	});

});