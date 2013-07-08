var block = require("./block");

exports.create = function(conf){
  var actor = block.create(conf);

  actor.hasWon = false;
  actor.hasLost = false;

  return actor;
};