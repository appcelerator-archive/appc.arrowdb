var APIBuilder = require('appcelerator').apibuilder,
	assert = require('assert'),
	should = require('should'),
	util = require('util');

global.dump = dump;
global.init = init;
global.assertFailure = assertFailure;

function dump() {
	Array.prototype.slice.call(arguments).forEach(function (arg) {
		console.log(util.inspect(arg, false, null, true));
	});
}

function init(model, beforeFn) {
	if (typeof model === 'function') {
		beforeFn = model;
		model = null;
	}

	before(function (next) {
		model && (this.model = model);

		this.server = new APIBuilder();
		model && this.server.addModel(this.model);

		this.connector = this.server.getConnector('appc.acs');
		this.connector.connect(function () {
			beforeFn && beforeFn.call(this);
			next();
		}.bind(this));
	});

	after(function (next) {
		if (this.connector) {
			this.connector.disconnect(finalize.bind(this));
		} else {
			finalize.call(this);
		}

		function finalize() {
			this.connector = null;
			this.server = null;
			next();
		}
	});
}

function assertFailure(err, result) {
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
