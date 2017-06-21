/* global describe, before, it, init */
'use strict';

var Arrow = require('arrow'),
  assert = require('assert'),
  should = require('should'),
  Model = require('arrow').Model,
  TestModel;

require('./_base');

describe('generic model', function () {
  init(this, function () { });

  before(function () {
    TestModel = Model.extend('testBase', {
      fields: {
        fname: {
          type: String, required: false
        },
        lname: {
          type: String, required: false
        },
        age: {
          type: Number, required: false
        }
      },
      connector: 'appc.arrowdb'
    });
  });

  it('should return 0', function (done) {
    TestModel.count(function (err, count) {
      should(err).be.not.ok;
      should(count).equal(0);

      done();
    });
  });

});