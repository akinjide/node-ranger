'use strict';

/**
 * Require Test modules
 */
var ranger = require('..');


/**
 * Tests
 */
describe('ranger()', function() {
  context('#fill()', function() {
    it('Promise: should return an Array of length 4', function(done) {
      var expect = [0, 1, 2, 3];
      var range = ranger.fill(0.2, 4.0);
      range.should.be.Promise();
      range.should.be.fulfilledWith(expect);
      range.should.eventually.have.length(4);
      done();
    });

    it('Promise: should throw an error if no start argument', function(done) {
      ranger.fill().catch(function(error) {
      	error.message.should.be.eql('fill() expected least 1 argument');
        done();
      });
    });

    it('Promise: should throw an error if step argument is 0', function(done) {
      var range = ranger.fill(1, 10, 0);
      range.should.be.Promise();
      range.catch(function(error) {
      	error.message.should.be.eql('fill() step must not be zero');
        done();
      });
    });

    it('Promise: should return an Empty Array if start is greater than stop', function(done) {
      var range = ranger.fill(4, 1, 2);
      range.should.be.Promise();
      range.should.be.fulfilledWith([]);
      range.should.eventually.have.length(0);
      done();
    });

    it('Promise: should return an Array of length 5 if step is a negative number', function(done) {
      var expect = [10, 8, 6, 4, 2];
      var range = ranger.fill(10, 1, -2);
      range.should.be.Promise();
      range.should.be.fulfilledWith(expect);
      range.should.eventually.have.length(5);
      done();
    });

    it('Callback: should return an Array of length 4', function(done) {
      var expect = [0, 1, 2, 3];
      ranger.fill(0, 4, 1, function(error, result) {
        result.should.be.an.Array().and.containDeep(expect);
        done();
      });
    });

    it('Callback: should throw an error if step argument is 0', function(done) {
      ranger.fill(1, 10, 0, function(error, result) {
        error.message.should.be.eql('fill() step must not be zero');
        done();
      });
    });

    it('Callback: should return an Empty Array if start is greater than stop', function(done) {
      ranger.fill(4, 1, 2, function(error, result) {
        result.should.be.an.Array().and.containDeep([]);
        done();
      });
    });
  });

  context('#object()', function() {
    it('Promise: should return an Object of length 5', function(done) {
      var expect = { '0': 2, '1': 11, '2': 20, '3': 29, '4': 38 };
      var range = ranger.object(2, 40, 9);

      range.should.be.Promise();
      range.should.be.fulfilledWith(expect);
      range.then(function(result) {
        result.should.have.size(5);
        result.should.be.eql(expect);
        done();
      });
    });

    it('Promise: should return an Object of length 4', function(done) {
      var expect = { '0': 1, '1': 3, '2': 5, '3': 7, '4': 9 };
      var range = ranger.object(1, 10, 2);

      range.should.be.Promise();
      range.should.be.fulfilledWith(expect);
      range.then(function(result) {
        result.should.have.size(5);
        result.should.be.eql(expect);
        done();
      });
    });

    it('Promise: should return an Object of length 5 without step', function(done) {
      var expect = { '0': 1, '1': 2, '2': 3, '3': 4 };
      var range = ranger.object(1, 5);

      range.should.be.Promise();
      range.should.be.fulfilledWith(expect);
      range.then(function(result) {
        result.should.have.size(4);
        result.should.be.eql(expect);
        done();
      });
    });

    it('Promise: should return an error if start and stop are missing', function(done) {
      ranger.object().catch(function(error) {
        error.message.should.be.eql('object() expected least 1 argument');
        done();
      });
    });

    it('Callback: should return an Object of length 5', function(done) {
      var expect = { '0': 2, '1': 11, '2': 20, '3': 29, '4': 38 };
      ranger.object(2, 40, 9, function(error, result) {
        result.should.be.an.Object().and.containDeep(expect);
        result.should.have.size(5);
        done();
      });
    });

    it('Callback: should return an Object of length 4', function(done) {
      var expect = { '0': 1, '1': 3, '2': 5, '3': 7, '4': 9 };
      ranger.object(1, 10, 2, function(error, result) {
        result.should.be.an.Object().and.containDeep(expect);
        result.should.have.size(5);
        done();
      });
    });
  });

  context('#rune()', function() {
    it('Promise: should return an Array of length 5', function(done) {
      var expect = ['a', 'b', 'c', 'd', 'e'];
      var range = ranger.rune('a', 'e');

      range.should.be.Promise();
      range.should.be.fulfilledWith(expect);
      range.then(function(result) {
        result.should.have.size(5);
        result.should.be.eql(expect);
        done();
      });
    });

    it('Promise: should return an Array reversed of length 10', function(done) {
      var expect = ['j', 'i', 'h', 'g', 'f', 'e', 'd', 'c', 'b', 'a'];
      var range = ranger.rune('a', 'j', true);

      range.should.be.Promise();
      range.should.be.fulfilledWith(expect);
      range.then(function(result) {
        result.should.have.size(10);
        result.should.be.eql(expect);
        done();
      });
    });

    it('Promise: should return an Array reversed of length 10', function(done) {
      var expect = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
      var range = ranger.rune('a');

      range.should.be.Promise();
      range.should.be.fulfilledWith(expect);
      range.then(function(result) {
        result.should.have.size(26);
        result.should.be.eql(expect);
        done();
      });
    });

    it('Callback: should return an Array of length 5', function(done) {
      var expect = ['a', 'b', 'c', 'd', 'e'];
      ranger.rune('a', 'e', false, function(error, result) {
        result.should.be.an.Array().and.containDeep(expect);
        result.should.have.size(5);
        done();
      });
    });

    it('Callback: should return an Array of length 5', function(done) {
      var expect = ['a', 'b', 'c', 'd', 'e'];
      ranger.rune('a', 'e', function(error, result) {
        result.should.be.an.Array().and.containDeep(expect);
        result.should.have.size(5);
        done();
      });
    });

    it('Callback: should return an Array reversed of length 10', function(done) {
      var expect = ['j', 'i', 'h', 'g', 'f', 'e', 'd', 'c', 'b', 'a'];
      ranger.rune('a', 'j', true, function(error, result) {
        result.should.be.an.Array().and.containDeep(expect);
        result.should.have.size(10);
        done();
      });
    });

    it('Callback: should return an an error if start is number', function(done) {
      var expect = ['j', 'i', 'h', 'g', 'f', 'e', 'd', 'c', 'b', 'a'];
      ranger.rune(1, 'j', true, function(error, result) {
        error.should.be.an.Error();
        error.message.should.be.eql('rune() expected argument type "string"');
        done();
      });
    });
  });
});
