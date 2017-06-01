'use strict';

var Arrow = require('arrow'),
	assert = require('assert'),
	should = require('should'),
	util = require('util');

global.dump = dump;
global.init = init;
global.assertFailure = assertFailure;

var state = {};

function dump() {
	Array.prototype.slice.call(arguments).forEach(function (arg) {
		console.log(util.inspect(arg, false, null, true));
	});
}

function init(ctx, beforeFn) {
	ctx.timeout(60000);
	ctx.slow(50000);

	before(function (next) {
		if (state.server) {
			this.server = state.server;
			this.connector = state.connector;
			beforeFn && beforeFn.call(this);
			next();
		}
		else {
			this.server = state.server = new Arrow({
				ignoreDuplicateModels: true,
				generateModelsFromSchema: true,
				connectors: {
					'appc.arrowdb': {
						modelAutogen: true
					}
				}
			});
			this.connector = state.connector = this.server.getConnector('appc.arrowdb');
			this.server.start(function () {
				beforeFn && beforeFn.call(this);
				next();
			}.bind(this));
		}
	});

	afterEach(function () {
		if (this.connector) {
			this.connector.reset();
		} else if (state.connector) {
			state.connector.reset();
		}
	});
}

after(function (cb) {
	state.connector.disconnect(function () {
		state.server.stop(cb);
	});
});

function assertFailure(err) {
	assert(err);
	should(err).be.an.Error;
	should(err).have.keys('errorCode', 'docUrl', 'message', 'statusCode', 'reason', 'response', 'body');
	should(err.errorCode).be.a.Number;
	should(err.docUrl).be.a.String;
	should(err.message).be.a.String;
	should(err.statusCode).be.a.Number;
	should(err.reason).be.a.String;
	should(err.response).be.an.Object;
	should(err.body).be.an.Object;
	should(err.body).have.property('meta');
	should(err.body.meta).be.an.Object;

	should(err.body.meta).have.property('code');
	should(err.body.meta.code).be.a.Number;
	should(err.body.meta).have.property('status');
	should(err.body.meta.status).be.a.String;
	should(err.body.meta.status).equal('fail');
	should(err.body.meta).have.property('message');
	should(err.body.meta.message).be.a.String;
}
