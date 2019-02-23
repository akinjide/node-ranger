'use strict';


/**
 * Export modules.
 *
 * @api public
 */
exports.fill = fill;
exports.object = object;
exports.rune = rune;


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
 * ranger.fill(4) -> Promise { [ 1, 2, 3, 4] }
 * ranger.fill(0, 4) -> Promise { [ 1, 2, 3, 4] }
 * ranger.fill(0) -> Promise { [] }
 * ranger.fill(4, 0, -1) -> Promise { [ 4, 3, 2, 1 ] }
 * ranger.fill(0, 4, -1) -> Promise { [] }
 * ranger.fill(0, 1, 0) -> Error: step cannot be zero
 * ranger.fill(0.2, 4.0) -> Promise { [ 0, 1, 2, 3 ] }
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
    callback = step;
  }

  if (typeof callback !== 'function') {
    callback = function () {};
  }

  var promise = new Promise(function(resolve, reject) {
    if (args.length === 0) {
      return reject(new RangeError('fill() expected least 1 argument'));
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
      return reject(new RangeError('fill() step must not be zero'));
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
 * ranger.object(4) -> Promise { { '0': 1, '1': 2, '2': 3, '3': 4 } }
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
    callback = step;
  }

  if (typeof callback !== 'function') {
    callback = function () {};
  }

  var promise = new Promise(function(resolve, reject) {
    if (args.length === 0) {
      return reject(new RangeError('object() expected least 1 argument'));
    }

    if (args.length === 1) {
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
      return reject(new RangeError('object() step must not be zero'));
    })();

    iterationCount = Array.apply(null, new Array(Math.round((Math.abs(stop - start) + step) / Math.abs(step))));

    previousValue = iterationCount.reduce(function(previousValue, currentValue, index) {
      previousValue[index] = start + index * step;
      return previousValue;
    }, {});

    resolve(previousValue);
  });

  promise.then(callback.bind(null, null), callback);
  return promise;
}


/**
 * [rune Use String.prototype.substring to get a range of alphabets]
 * implementation supports dual promise/callback API's. Module can be used either through
 * a promise or through the standard NodeJS error-first callback
 *
 *
 * Arguments:   [start], stop[, order]
 *
 *
 * @param {Integer}  start    [The character at which to start looping] (required)
 * @param {Integer}  stop     [The character at which to stop looping] (required)
 * @param {Integer}  order    [Order Ascending or Descending alphabets range] (optional)
 * @param {function} callback [standard NodeJS error-first callback] (optional)
 * @return {Promise}          [The Array containing the alphabets generated]
 *
 *
 * ranger.rune() -> Error: needs more arguments
 * ranger.rune('a') -> Promise { [ 'a', ..., 'z'] }
 * ranger.rune('A','F') -> Promise { ['A','B','C','D','E','F'] }
 * ranger.rune(0) -> Error: needs string arguments
 * ranger.rune('m', 'r') -> Promise { ['m', 'n', 'o', 'p', 'q', 'r'] }
 * ranger.rune('m', 'r', true) -> Promise { ['r', 'q', 'p', 'o', 'n', 'm']  }
 *
 *
 * @api private
 */
function rune(start, stop, order, callback) {
  var args = arguments;
  var chars = 'abcdefghijklmnopqrstuvwxyz';
  var values;

  if (typeof order === 'function') {
    callback = order;
  }

  if (typeof callback !== 'function') {
    callback = function () {};
  }

  var promise = new Promise(function(resolve, reject) {
    if (args.length === 0) {
      return reject(new RangeError('rune() expected least 1 argument'));
    }

    if (typeof start === 'number') {
      return reject(new TypeError('rune() expected argument type "string"'));
    }

    if (args.length === 1) {
      stop = 'z';
    }

    if (start === start.toUpperCase()) {
      stop = stop.toUpperCase();
      chars = chars.toUpperCase();
    }

    values = chars.substring(chars.indexOf(start), chars.indexOf(stop) + 1).split('');

    if (order) {
      return resolve(values.sort(function(a, b) {
        return b.charCodeAt() - a.charCodeAt();
      }));
    }

    resolve(values);
  });

  promise.then(callback.bind(null, null), callback);
  return promise;
}
