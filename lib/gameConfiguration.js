'use strict';

var Block = require("./block"),
    Actor = require("./actor");

module.exports = GameConfiguration;

/**
 * Game Global Configuration
 *
 * @param {Object} conf Configuration
 */
function GameConfiguration(conf){
  this.parseConf(conf);
}

/**
 * Parse game configuration
 * @param  {Object} conf Configuration
 * @return {GameConfiguration}      this
 */
GameConfiguration.prototype.parseConf = function(conf) {
  if (!conf.world || !conf.levels){
    throw new Error("Required params not provided");
  }

  this.conf = conf;

  this.world = conf.world;
  this.worldWidth = conf.world.width;
  this.worldHeight = conf.world.height;
  this.levelLength = conf.levels.length;
  this.speed = conf.world.speed;

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
  return this;
};

/**
 * Get level configuration
 *
 * @param  {Number} level Level
 * @return {Object}       Level configuration
 */
GameConfiguration.prototype.getLevel = function(level) {
  return this.levels[level-1];
};

/**
 * Create actor based on level's configuration
 *
 * @param  {Number} level Level
 * @return {Actor}       The actor for this level
 */
GameConfiguration.prototype.createActor = function(level) {
  var levelConf = this.levels[level-1];

  return new Actor(levelConf.actor);
};