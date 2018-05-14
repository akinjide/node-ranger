'use strict';

/**
 * Require Test modules
 */
var assert = require('assert');
var ranger = require('..');


/**
 * Tests
 */
describe('ranger()', function() {

  describe('#fill()', function() {
    it('Promise: should return an Array of length 4', function(done) {
      var range = ranger.fill(0.2, 4.0);
      range.should.be.Promise();
      range.should.be.fulfilledWith([0, 1, 2, 3]);
      range.should.eventually.have.length(4);
      done();
    });

    it('Callback: should return an Array of length 4', function(done) {
      ranger.fill(0, 4, 1, function(error, result) {
        result.should.be.an.Array().and.containDeep([0, 1, 2, 3]);
      });
      done();
    });

    it('Promise: should throw an error if no start argument', function(done) {
      ranger.fill().catch(function(error) {
      	error.message.should.be.eql('fill() expected least 1 argument');
      });
      done();
    });

    it('Promise: should throw an error if step argument is 0', function(done) {
      var range = ranger.fill(1, 10, 0);
      range.should.be.Promise();
      range.catch(function(error) {
      	error.message.should.be.eql('fill() step must not be zero');
      });
      done();
    });

    it('Callback: should throw an error if step argument is 0', function(done) {
      ranger.fill(1, 10, 0, function(error, result) {
      	error.message.should.be.eql('fill() step must not be zero');
      });
      done();
    });

    it('Promise: should return an Empty Array if start is greater than stop', function(done) {
      var range = ranger.fill(4, 1, 2);
      range.should.be.Promise();
      range.should.be.fulfilledWith([]);
      range.should.eventually.have.length(0);
      done();
    });

    it('Callback: should return an Empty Array if start is greater than stop', function(done) {
      ranger.fill(4, 1, 2, function(err, result) {
        result.should.be.an.Array().and.containDeep([]);
      });
      done();
    });

    it('Promise: should return an Array of length 5 if step is a negative number', function(done) {
      var range = ranger.fill(10, 1, -2);
      range.should.be.Promise();
      range.should.be.fulfilledWith([10, 8, 6, 4, 2]);
      range.should.eventually.have.length(5);
      done();
    });
  });


  describe('#object()', function() {
    it('Promise: should return an Object of length 5', function(done) {
      var range = ranger.object(2, 40, 9);
      range.should.be.Promise();
      range.should.be.fulfilledWith({ '0': 2, '1': 11, '2': 20, '3': 29, '4': 38 });
      done();
    });

    it('Promise: should return an Object of length 4', function(done) {
      var range = ranger.object(1, 10, 2);
      range.should.be.Promise();
      range.should.be.fulfilledWith({ '0': 1, '1': 3, '2': 5, '3': 7, '4': 9 });
      done();
    });

    it('Promise: should return an Object of length 5 without step', function(done) {
      var range = ranger.object(1, 5);
      range.should.be.Promise();
      range.should.be.fulfilledWith({ '0': 1, '1': 2, '2': 3, '3': 4 });
      done();
    });

    it('Promise: should return an error if start and stop are missing', function(done) {
      ranger.object().catch(function(error) {
        error.message.should.be.eql('object() expected least 1 argument')
      });
      done();
    });
  });

});
