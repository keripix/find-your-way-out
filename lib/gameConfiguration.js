var level = require("./level");

function GameConfiguration(conf){
  this.parseConf(conf);
}

GameConfiguration.prototype.parseConf = function(conf) {
  if (!conf.world || !conf.levels){
    throw new Error("Required params not provided");
  }

  this.world = conf.world;
  this.levels = conf.levels;
};

GameConfiguration.prototype.getLevel = function(level) {
  return this.levels[level];
};

exports.init = function(conf){
  return new GameConfiguration(conf)
}