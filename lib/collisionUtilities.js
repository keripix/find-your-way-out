exports.detectStopper = function(actor, block){
  actor.stopperLocation = actor.moving.value >= 0 ? actor.moving.direction : "-" + actor.moving.direction;

  return actor;
};

exports.normalizedAfterCollision = function(actor, block, currentDistance){
  if (!actor.hasOwnProperty("stopperLocation")){
    this.detectStopper(actor, block);
  }

  var movementDirection = actor.moving.direction,
      okDistance = movementDirection === "x" ? block.width : block.height
      delta = Math.abs(okDistance - Math.round(Math.abs(actor[movementDirection] - block[movementDirection])));

  if (delta !== 0){
    delta = actor.moving.value > 0 ? -1 * delta : delta;

    actor[actor.moving.direction] += delta;
    actor["mid"+actor.moving.direction.toUpperCase()] += delta;
    actor.requestRenderingForce = true;
  }

  return actor;
};