'use strict';

var Block = require("./block"),
    util = require("util");

module.exports = Actor;

function Actor(conf){
  Block.call(this, conf);

  this.hasWon = false;
  this.hasLost = false;
  this.blockedFrom = undefined;
  this.type = "actor";
}

util.inherits(Actor, Block);

