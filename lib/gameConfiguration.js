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
        e = l.exit[0];

    newLevel.actor = {
      x: a.x,
      y: a.y,
      width: a.width || conf.world.actor.width,
      height: a.height || conf.world.actor.height,
      color: a.color || conf.world.actor.color
    };

    newLevel.exit = new Block({
      x: e.x,
      y: e.y,
      width: e.width || conf.world.exit.width,
      height: e.height || conf.world.exit.height,
      color: e.color || conf.world.exit.color
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
  var levelConf = this.levels[level-1];

  return new Actor(levelConf.actor);
};