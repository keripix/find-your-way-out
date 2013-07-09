var Block = require("./block");

exports.create = function(conf){
  var actor = new Block(conf);

  actor.hasWon = false;
  actor.hasLost = false;
  actor.blockedFrom = undefined;

  return actor;
};