'use strict';

var Block = require("./block"),
    inherits = require("./inherits");

module.exports = Actor;

function Actor(conf){
  Block.call(this, conf);

  this.hasWon = false;
  this.hasLost = false;
  this.blockedFrom = undefined;
}

inherits(Actor, Block);

