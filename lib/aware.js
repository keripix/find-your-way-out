'use strict';

var util = require("util"),
    EventEmitter = require("events").EventEmitter;

module.exports = Aware;

/**
 * Module to detect actor playing state relatives to it's surroding
 */
function Aware(actor, blocks, exit, world){}

util.inherits(Aware, EventEmitter);

/**
 * Set the objects that should be observed
 * @param  {Object} actor  The player
 * @param  {Object} blocks The blocks
 * @param  {Object} exit   The exit door
 * @param  {Object} world  The world
 */
Aware.prototype.setObserved = function(actor, blocks, exit, world) {
  this.actor = actor;
  this.blocks = blocks;
  this.exit = exit;
  this.world = world;
};

/**
 * Observe actor movements relatives to it's surroundings
 * @return {[type]} [description]
 */
Aware.prototype.observe = function() {
  var moving = this.actor.moving.direction,
      check = (moving === "x") ? "y" : "x",
      bound = (moving === "x") ? this.actor.width : this.actor.height,
      collisionSide = (moving === "x") ? "width" : "height";

  // check the distance between the actor and the exit door
  if (this.hasWon(collisionSide)){
    this.emit("playerExit", this.actor);
    return;
  }

  if (this.hasLost()){
    this.emit("playerOut", this.actor);
    return;
  }

  this.blocks.forEach(function(b){
    // check wether the actor and this block has the possibility to collide
    if (b[check] < (this.actor[check] + bound) && b[check] > (this.actor[check] - bound)) {

      var distanceSqr = Math.pow(this.actor.midX - b.midX,2) + Math.pow(this.actor.midY - b.midY, 2),
          collisionDistanceSqr = Math.pow((this.actor[collisionSide] + b[collisionSide])/2, 2);

      // has collided
      if (distanceSqr <= collisionDistanceSqr) {
        this.emit("playerBlocked", this.actor, b, {
          currentDistance: Math.sqrt(distanceSqr)
        });
        return;
      }
    }
  }.bind(this));
};

/**
 * Has the player exit the world through the door?
 *
 * @param  {string} side Which side we need to take into consideration to
 *                       detect wether the player has gone outside of the
 *                       world
 * @return {boolean}
 */
Aware.prototype.hasWon = function(side) {
  return Math.sqrt(Math.pow(this.actor.midX - this.exit.midX,2) + Math.pow(this.actor.midY - this.exit.midY,2)) <= ((this.actor[side] + this.exit[side])/2);
};

/**
 * Has the player lost? The player should lose if it has gone outside of
 * the world, but not through the door.
 *
 * @return {boolean}
 */
Aware.prototype.hasLost = function() {
  return this.actor.x >= this.world.width || this.actor.y >= this.world.height || this.actor.x <= 0 || this.actor.y <= 0;
};