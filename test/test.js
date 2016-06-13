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
  describe('#getArray()', function() {
    it('should return an Array of length 5', function() {
      var range = ranger.getArray(1, 10, 2);

      assert.equal(range.length, 5);
      assert.equal(typeof range, typeof []);
      assert.equal(range[1], [3]);
    });

    it('should return an array of length 10 without step', function() {
      var range = ranger.getArray(1, 10);

      assert.equal(range.length, 10);
      assert.equal(typeof range, typeof []);
      assert.equal(range[5], [6]);
    });

    it('should return an error if start and stop are missing', function() {
      var range = ranger.getArray();

      assert.equal(range, "start and stop are required!");
    });
  });


  describe('#getObject()', function() {
    it('should return an Object', function() {
      var range = ranger.getObject(1, 10, 2);

      assert.equal(typeof range, typeof {});
      assert.equal(range['0'], 1);
      assert.equal(range['1'], 3);
      assert.equal(typeof range['1'], typeof 3);
    });

    it('should return an Object of length 5 without step', function() {
      var range = ranger.getObject(1, 5);

      assert.equal(Object.keys(range).length, 5);
      assert.equal(typeof range, typeof {});
    });

    it('should return an error if start and stop are missing', function() {
      var range = ranger.getObject();

      assert.equal(range, "start and stop are required!");
    });
  });


  describe('#fill() regular for..loop', function() {
    it('should return an Array of length 5', function() {
      var range = ranger.fill(1, 10, 2);

      assert.equal(range.length, 5);
      assert.equal(typeof range, typeof []);
      assert.equal(range[1], [3]);
    });

    it('should return an array of length 10 without step', function() {
      var range = ranger.fill(1, 10);

      assert.equal(range.length, 10);
      assert.equal(typeof range, typeof []);
      assert.equal(range[5], [6]);
    });

    it('should return an error if start and stop are missing', function() {
      var range = ranger.fill();

      assert.equal(range, "start and stop are required!");
    });
  });
});
