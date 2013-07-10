/**
 * Taken from 2ality
 */

module.exports = function(target, source){
  for (var propName in source) {
    // Is propName an own property of source?
    if (hasOwnProperty.call(source, propName)) {
      target[propName] = source[propName];
    }
  }
};