'use strict';

function GameConfiguration(conf){
  this.parseConf(conf);
}

GameConfiguration.prototype.parseConf = function(conf) {
  if (!conf.world || !conf.levels){
    throw new Error("Required params not provided");
  }

  this.world = conf.world;
  this.levels = conf.levels;

  // will set global configuration for each level if none is
  // provided
  this.levels.forEach(function(l){
    l.actor.width = l.actor.width || conf.world.actor.width;
    l.actor.height = l.actor.height || conf.world.actor.height;
    l.actor.color = l.actor.color || conf.world.actor.color;

    l.out.width = l.out.width || conf.world.out.width;
    l.out.height = l.out.height || conf.world.out.height;
    l.out.color = l.out.color || conf.world.out.color;

    l.blocks.forEach(function(b){
      b.width = b.width || conf.world.blocks.width;
      b.height = b.height || conf.world.blocks.height;
      b.color = b.color || conf.world.blocks.color;
    });
  });
};

GameConfiguration.prototype.getLevel = function(level) {
  return this.levels[level-1];
};

exports.init = function(conf){
  return new GameConfiguration(conf)
}