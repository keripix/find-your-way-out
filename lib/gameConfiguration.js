'use strict';

var block = require("./block");

function GameConfiguration(conf){
  this.parseConf(conf);
}

GameConfiguration.prototype.parseConf = function(conf) {
  if (!conf.world || !conf.levels){
    throw new Error("Required params not provided");
  }

  this.world = conf.world;
  this.levels = [];

  // will set global configuration for each level if none is
  // provided
  conf.levels.forEach(function(l){
    var newLevel = {};

    newLevel.actor = block.create({
      x: l.actor.x,
      y: l.actor.y,
      width: l.actor.width || conf.world.actor.width,
      height: l.actor.height || conf.world.actor.height,
      color: l.actor.color || conf.world.actor.color
    });

    newLevel.out = block.create({
      x: l.out.x,
      y: l.out.y,
      width: l.out.width || conf.world.out.width,
      height: l.out.height || conf.world.out.height,
      color: l.out.color || conf.world.out.color
    });

    newLevel.blocks = [];

    l.blocks.forEach(function(b){
      newLevel.blocks.push(block.create({
        x: b.x,
        y: b.y,
        width: b.width || conf.world.blocks.width,
        height: b.height || conf.world.blocks.height,
        color: b.color || conf.world.blocks.color
      }));
    });

    this.levels.push(newLevel);
  }.bind(this));
};

GameConfiguration.prototype.getLevel = function(level) {
  return this.levels[level-1];
};

exports.init = function(conf){
  return new GameConfiguration(conf)
}