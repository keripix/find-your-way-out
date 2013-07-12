'use strict';

var Block = require("./block"),
    Actor = require("./actor");

module.exports = GameConfiguration;

function GameConfiguration(conf){
  this.parseConf(conf);
}

GameConfiguration.prototype.parseConf = function(conf) {
  if (!conf.world || !conf.levels){
    throw new Error("Required params not provided");
  }
  this.conf = conf;
  this.world = conf.world;
  this.levels = [];

  // will set global configuration for each level if none is
  // provided
  conf.levels.forEach(function(l){
    var newLevel = {
          actor: undefined,
          blocks: [],
          exit: undefined
        },
        a = l.actor[0],
        o = l.exit[0];

    newLevel.actor = new Actor({
      x: a.x,
      y: a.y,
      width: a.width || conf.world.actor.width,
      height: a.height || conf.world.actor.height,
      color: a.color || conf.world.actor.color
    });

    newLevel.exit = new Block({
      x: o.x,
      y: o.y,
      width: o.width || conf.world.exit.width,
      height: o.height || conf.world.exit.height,
      color: o.color || conf.world.exit.color
    });

    l.blocks.forEach(function(b){
      newLevel.blocks.push(new Block({
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

GameConfiguration.prototype.createActor = function(level) {
  var levelConf = this.conf.levels[level-1];

  return new Actor({
    x: levelConf.actor.x,
    y: levelConf.actor.y,
    width: levelConf.actor.width || this.world.actor.width,
    height: levelConf.actor.height || this.world.actor.height,
    color: levelConf.actor.color || this.world.actor.color
  });
};