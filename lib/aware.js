'use strict';

function normalizeAfterCollision(actor, block, currentDistance){
  if (!actor.hasOwnProperty("stopperLocation")){
    detectStopper(actor, block);
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
}

function detectStopper(actor, block){
  actor.stopperLocation = actor.moving.value >= 0 ? actor.moving.direction : "-" + actor.moving.direction;
}

function Aware(actor, blocks, exit, world){
  this.actor = actor;
  this.blocks = blocks;
  this.exit = exit;
  this.world = world;
}

Aware.prototype.observe = function() {
  var moving = this.actor.moving.direction,
      check = (moving === "x") ? "y" : "x",
      bound = (moving === "x") ? this.actor.width : this.actor.height,
      collisionSide = (moving === "x") ? "width" : "height";

  // check the distance between the actor and the exit door
  if (Math.sqrt(Math.pow(this.actor.midX - this.exit.midX,2) + Math.pow(this.actor.midY - this.exit.midY,2)) <= ((this.actor[collisionSide] + this.exit[collisionSide])/2)){
    this.actor.stop();
    this.actor.hasWon = true;
    return;
  }

  if (this.actor.x >= this.world.width || this.actor.y >= this.world.height || this.actor.x <= 0 || this.actor.y <= 0){
    this.actor.stop();
    this.actor.hasLost = true;
    return;
  }

  this.blocks.forEach(function(b){
    if (b[check] < (this.actor[check] + bound) && b[check] > (this.actor[check] - bound)) {

      var distanceSqr = Math.pow(this.actor.midX - b.midX,2) + Math.pow(this.actor.midY - b.midY, 2),
          collisionDistanceSqr = Math.pow((this.actor[collisionSide] + b[collisionSide])/2, 2);

      if (distanceSqr <= collisionDistanceSqr) {
        this.detectStopper(this.actor, b);
        this.normalizeAfterCollision(this.actor, b, Math.sqrt(distanceSqr));
        this.actor.stop();
      }
    }
  }.bind(this));
};

Aware.prototype.detectStopper = function(actor, block) {
  actor.stopperLocation = actor.moving.value >= 0 ? actor.moving.direction : "-" + actor.moving.direction;
};

Aware.prototype.normalizeAfterCollision = function(actor, block, currentDistance) {
  if (!actor.hasOwnProperty("stopperLocation")){
    detectStopper(actor, block);
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
};

module.exports = Aware;

// TODO this method is to fat
// module.exports = function(actor, blocks, exit, world){
//   var moving = actor.moving.direction,
//       check = (moving === "x") ? "y" : "x",
//       bound = (moving === "x") ? actor.width : actor.height,
//       collisionSide = (moving === "x") ? "width" : "height";

//   // check the distance between the actor and the exit door
//   if (Math.sqrt(Math.pow(actor.midX-exit.midX,2)+Math.pow(actor.midY-exit.midY,2)) <= ((actor[collisionSide]+exit[collisionSide])/2)){
//     actor.stop();
//     actor.hasWon = true;
//     return;
//   }

//   if (actor.x >= world.width || actor.y >= world.height || actor.x <= 0 || actor.y <= 0){
//     actor.stop();
//     actor.hasLost = true;
//     return;
//   }

//   blocks.forEach(function(b){
//     if (b[check] < (actor[check] + bound) && b[check] > (actor[check] - bound)) {

//       var distanceSqr = Math.pow(actor.midX-b.midX,2)+Math.pow(actor.midY-b.midY, 2),
//           collisionDistanceSqr = Math.pow((actor[collisionSide] + b[collisionSide])/2, 2);

//       if (distanceSqr <= collisionDistanceSqr) {
//         detectStopper(actor, b);
//         normalizeAfterCollision(actor, b, Math.sqrt(distanceSqr));
//         actor.stop();
//       }
//     }
//   });
// };