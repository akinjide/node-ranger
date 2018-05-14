'use strict';

/**
 * Export modules.
 *
 * @api public
 */
exports.fill = fill;
exports.object = object;


/**
 * [fill Use regular forloop to get a range of numbers]
 * implementation supports dual promise/callback API's. Module can be used either through
 * a promise or through the standard NodeJS error-first callback
 *
 *
 * Arguments:   [start], stop[, step]
 *
 *
 * @param {Integer}  start    [The number at which to start looping] (required)
 * @param {Integer}  stop     [The number at which to stop looping] (required)
 * @param {Integer}  step     [The number at which to increment loop] (optional)
 * @param {function} callback [standard NodeJS error-first callback] (optional)
 * @return {Promise}          [The Array containing the numbers generated]
 *
 *
 * ranger.fill() -> Error: needs more arguments
 * range.fill(4) -> Promise { [ 1, 2, 3, 4] }
 * range.fill(0, 4) -> Promise { [ 1, 2, 3, 4] }
 * range.fill(0) -> Promise { [] }
 * range.fill(4, 0, -1) -> Promise { [ 4, 3, 2, 1 ] }
 * range.fill(0, 4, -1) -> Promise { [] }
 * range.fill(0, 1, 0) -> Error: step cannot be zero
 * range.fill(0.2, 4.0) -> Promise { [ 0, 1, 2, 3 ] }
 *
 *
 * @api private
 */
function fill(start, stop, step, callback) {
  var args = arguments;
  var data = [];
  var iterator;
  var error;

  if (typeof step === 'function') {
    callback = opts;
  }

  if (typeof callback !== 'function') {
    callback = function () {};
  }

  var promise = new Promise(function(resolve, reject) {
    if (args.length === 0) {
      return reject(new Error("fill() expected least 1 argument"));
    }

    if (args.length === 1) {
      iterator = iterator || 0;
      stop = Math.floor(start) - 1;
    } else {
      iterator = Math.floor(start);
      stop = Math.floor(stop) - 1;
    }

    if (typeof step === 'undefined') {
      step = 1;
    }

    step = Math.floor(step) || (function() {
      return reject(new Error("fill() step must not be zero"));
    })();

    if (step > 0) {
      for (iterator; iterator <= stop; iterator += step) {
        data.push(iterator);
      }
    } else if (step < 0) {
      step = Math.abs(step)

      if (iterator > stop) {
        for (iterator; iterator > stop + 1; iterator -= step) {
          data.push(iterator);
        }
      }
    }

    resolve(data);
  });
  
  // will always return a promise and if passed a callback (assuming it's a NodeJS-style callback),
  promise.then(callback.bind(null, null), callback);
  return promise;
}


/**
 * [object description]
 * implementation supports dual promise/callback API's. Module can be used either through
 * a promise or through the standard NodeJS error-first callback
 *
 *
 * Arguments:   [start], stop[, step]
 *
 *
 * @param {Integer}  start    [The number at which to start looping] (required)
 * @param {Integer}  stop     [The number at which to stop looping] (required)
 * @param {Integer}  step     [The number at which to increment loop] (optional)
 * @param {function} callback [standard NodeJS error-first callback] (optional)
 * @return {Promise}          [The Object containing the numbers generated, KEY starts
 *                            with 0]
 *
 * ranger.object() -> Error: needs more arguments
 * range.object(4) -> Promise { { '0': 1, '1': 2, '2': 3, '3': 4 } }
 *
 *
 * @api private
 */
function object(start, stop, step, callback) {
  var args = arguments;
  var previousValue = {};
  var iterationCount;
  var error;

  if (typeof step === 'function') {
    callback = opts;
  }

  if (typeof callback !== 'function') {
    callback = function () {};
  }

  var promise = new Promise(function(resolve, reject) {
    if (Object.keys(args).length === 0) {
      return reject(new Error("object() expected least 1 argument"));
    }

    if (Object.keys(args).length === 1) {
      stop = Math.floor(start) - 1;
      start = 0;
    } else {
      start = Math.floor(start);
      stop = Math.floor(stop) - 1;
    }

    if (typeof step === 'undefined') {
      step = 1;
    }

    step = Math.floor(step) || (function() {
      return reject(new Error("object() step must not be zero"));
    })();

    iterationCount = Array.apply(null, new Array(Math.round((Math.abs(stop - start) + 1) / Math.abs(step))));

    previousValue = iterationCount.reduce(function(previousValue, currentValue, index) {
      previousValue[index] = start + index * step;
      return previousValue;
    }, {});

    resolve(previousValue);
  });

  promise.then(callback.bind(null, null), callback);
  return promise;
}