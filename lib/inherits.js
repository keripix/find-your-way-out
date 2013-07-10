var extend = require("./extend");

/**
 * Taken from 2ality
 */
module.exports = function(target, source){
  var proxy = Object.create(source.prototype);

  extend(proxy, target.prototype);
  target.prototype = proxy;
};