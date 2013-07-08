function normalizeAfterCollision(actor, block, currentDistance){
  var moving = "x",
      side = "width";

  if (actor.moving.x === 0){
    moving = "y";
    side = "height";
  }

  var shouldDistance = Math.abs(actor[side]+block[side])/2,
      diff = Math.round(shouldDistance) - Math.round(currentDistance);

  if (diff !== 0){
    // normalize
    actor[moving] += diff;
    actor.needsToRender = true;
  }

  return actor;
}

module.exports = function(actor, blocks, exit, world){
  var check = "x",
      moving = "y",
      bound = actor.height,
      collisionAxis = "height",
      midActor = {x: actor.x + (actor.width/2), y: actor.y + (actor.height/2)},
      midExit = {x: exit.x + (exit.width/2), y: exit.y + (exit.height/2)};

  if (actor.moving.x !== 0) {
    check = "y";
    moving = "x";
    bound = actor.width;
    collisionAxis = "width";
  }

  // check the distance between the actor and the exit door
  if (Math.sqrt(Math.pow(midActor.x-midExit.x,2)+Math.pow(midActor.y-midExit.y,2)) <= ((actor[collisionAxis]+exit[collisionAxis])/2)){
    actor.isMoving = false;
    actor.hasWon = true;
    return;
  }

  if (actor.x >= world.width || actor.y >= world.height || actor.x <= 0 || actor.y <= 0){
    actor.hasLost = true;
    return;
  }

  blocks.forEach(function(b){
    if (b[check] <= (actor[check] + bound) && b[check] >= (actor[check] - bound)) {

      var midBlock = {x: b.x + (b.width/2), y: b.y + (b.height/2)},
          distanceSqr = Math.pow(midActor.x-midBlock.x,2)+Math.pow(midActor.y-midBlock.y,2),
          collisionDistanceSqr = Math.pow((actor[collisionAxis] + b[collisionAxis])/2, 2);

      if (distanceSqr <= collisionDistanceSqr) {
        actor.isMoving = false;
        // actor = normalizeAfterCollision(actor, b, distance);
      }
    }
  });
};