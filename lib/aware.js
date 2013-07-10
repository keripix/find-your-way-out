'use strict';

module.exports = Aware;

/**
 * Module to detect actor playing state relatives to it's surroding
 * @param {Object} actor  The player
 * @param {Object} blocks The building blocks that can stop the player
 * @param {Object} exit   Exit Door
 * @param {Object} world  World properties
 */
function Aware(actor, blocks, exit, world){
  this.actor = actor;
  this.blocks = blocks;
  this.exit = exit;
  this.world = world;
}

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
    this.actor.stop();
    this.actor.hasWon = true;
    return;
  }

  if (this.hasLost()){
    this.actor.stop();
    this.actor.hasLost = true;
    return;
  }

  this.blocks.forEach(function(b){
    // check wether the actor and this block has the possibility to collide
    if (b[check] < (this.actor[check] + bound) && b[check] > (this.actor[check] - bound)) {

      var distanceSqr = Math.pow(this.actor.midX - b.midX,2) + Math.pow(this.actor.midY - b.midY, 2),
          collisionDistanceSqr = Math.pow((this.actor[collisionSide] + b[collisionSide])/2, 2);

      // has collided
      if (distanceSqr <= collisionDistanceSqr) {
        this.detectStopper(this.actor, b)
            .normalizeAfterCollision(this.actor, b, Math.sqrt(distanceSqr));

        this.actor.stop();
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
  return this.actor.x >= this.world.width || this.actor.y >= this.world.height || this.actor.x <= 0 || this.actor.y <= 0
};

/**
 * Add stopper location relatives to the player
 * @param  {Object} actor The player
 * @param  {Object} block The stopper
 */
Aware.prototype.detectStopper = function(actor, block) {
  actor.stopperLocation = actor.moving.value >= 0 ? actor.moving.direction : "-" + actor.moving.direction;

  return this;
};

/**
 * Make the actor bounce out of the stopper if it's somehow managed to get into the inside's of the stopper block.
 * @param  {Object} actor           The player
 * @param  {Object} block           The block stopping the player
 * @param  {Integer} currentDistance The distance between the player and
 *                                   the block
 */
Aware.prototype.normalizeAfterCollision = function(actor, block, currentDistance) {
  if (!actor.hasOwnProperty("stopperLocation")){
    this.detectStopper(actor, block);
  }

  var movementDirection = actor.moving.direction,
      radius = movementDirection === "x" ? block.width : block.height,
      delta = Math.abs(radius - Math.round(currentDistance));

  if (delta !== 0){
    delta = actor.moving.value > 0 ? -1 * delta : delta;

    actor[actor.moving.direction] += delta;
    actor["mid"+actor.moving.direction.toUpperCase()] += delta;
    actor.requestRenderingForce = true;
  }

  return this;
};