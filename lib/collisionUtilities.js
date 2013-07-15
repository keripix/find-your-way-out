exports.detectStopper = function(actor, block){
  actor.stopperLocation = actor.moving.value >= 0 ? actor.moving.direction : "-" + actor.moving.direction;

  return actor;
};

exports.normalizedAfterCollision = function(actor, block){
  var direction = actor.moving.direction,
      // the ok distance between the two centers
      okDistance = (direction === "x") ?
                    block.width/2 + actor.width/2 :
                    block.height/2 + actor.height/2,
      // the current distance between the two centers
      delta = Math.abs(okDistance - Math.round(Math.abs(actor["mid"+direction.toUpperCase()] - block["mid"+direction.toUpperCase()])));

  if (delta !== 0){
    delta = actor.moving.value > 0 ? -1 * delta : delta;

    actor[direction] += delta;
    actor["mid"+direction.toUpperCase()] += delta;
    actor.requestRenderingForce = true;
  }

  return actor;
};