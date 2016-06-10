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
  describe('#getArray()', function () {
    it('should return an array of length 5', function () {
      var range = ranger.getArray(1, 10, 2);

      assert.equal(range.length, 5);
      assert.equal(typeof range, typeof []);
      assert.equal(range[1], [3]);
    });

    it('should return an array of length 10 without step', function () {
      var range = ranger.getArray(1, 10);

      assert.equal(range.length, 10);
      assert.equal(typeof range, typeof []);
      assert.equal(range[5], [6]);
    });

    it('should return an error if start and stop are missing', function () {
      var range = ranger.getArray();

      assert.equal(range, "start and stop are required!");
    });
  });
});
