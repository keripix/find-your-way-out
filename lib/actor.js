var block = require("./block");

exports.create = function(conf){
  var actor = block.create(conf);

  actor.hasWon = false;
  actor.hasLost = false;
  actor.blockedFrom = undefined;

  return actor;
};