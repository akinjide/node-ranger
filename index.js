'use strict';

/**
 * Export modules.
 */
exports.fill = fill;
exports.getObject = getObject;
exports.getArray = getArray;


/**
 * [plainArraySync Use regular forloop to get a range of numbers]
 * @param {Integer} start [The number at which to start looping] (required)
 * @param {Integer} stop  [The number at which to stop looping] (required)
 * @param {Integer} step  [The number at which to increment loop] (optional)
 * @return {Array}       [The Array containing the numbers generated]
 */
function fill(start, stop, step) {
  var result = [],
      iterator = start;

  if (!start || !stop) return "start and stop are required!";

  step = step || 1;
  result = [];

  for (iterator; iterator <= stop; iterator+=step)
    result.push(iterator);

  return result;
}


/**
 * [ObjectSync description]
 * @param {Integer} start [The number at which to start looping] (required)
 * @param {Integer} stop  [The number at which to stop looping] (required)
 * @param {Integer} step  [The number at which to increment loop] (optional)
* @return {Object}       [The Object containing the numbers generated, KEY starts with 0]
 */
function getObject(start, stop, step) {
  var iterationCount;

  if (!start || !stop) return "start and stop are required!";

  step = step || 1;

  iterationCount = Array.apply(null, new Array((stop - start + 1) / step) );

  return iterationCount.reduce(function(previousValue, currentValue, index) {
    previousValue[index] = start + index * step;
    return previousValue;
  }, {} ); // created object out of this reduce call
}


/**
 * [forArray description]
 * @param {Integer} start [The number at which to start looping] (required)
 * @param {Integer} stop  [The number at which to stop looping] (required)
 * @param {Integer} step  [The number at which to increment loop] (optional)
 * @return {Array}       [The Array containing the numbers generated]
 */
function getArray(start, stop, step) {
  var iterationCount;

  if (!start || !stop) return "start and stop are required!";

  step = step || 1;

  iterationCount = Array.apply(null, new Array((stop - start + 1) / step) );

  return iterationCount.reduce(function(previousValue, currentValue, index) {
    previousValue.push(start + index * step);
    return previousValue;
  }, [] ); // created array out of this reduce call
}
