function normalizeAfterCollision(actor, block, currentDistance){
  var moving = actor.moving.direction,
      side = moving === "x" ? "width" : "height";

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
  var moving = actor.moving.direction,
      check = moving === "x" ? "y" : "x",
      bound = moving === "x" ? actor.width : actor.height,
      collisionAxis = moving === "x" ? "width" : "height";

  // check the distance between the actor and the exit door
  if (Math.sqrt(Math.pow(actor.midX-exit.midX,2)+Math.pow(actor.midY-exit.midY,2)) <= ((actor[collisionAxis]+exit[collisionAxis])/2)){
    actor.stop();
    actor.hasWon = true;
    return;
  }

  if (actor.x >= world.width || actor.y >= world.height || actor.x <= 0 || actor.y <= 0){
    actor.stop();
    actor.hasLost = true;
    return;
  }

  blocks.forEach(function(b){
    if (b[check] <= (actor[check] + bound) && b[check] >= (actor[check] - bound)) {

      var distanceSqr = Math.pow(actor.midX-b.midX,2)+Math.pow(actor.midY-b.midY, 2),
          collisionDistanceSqr = Math.pow((actor[collisionAxis] + b[collisionAxis])/2, 2);

      if (distanceSqr <= collisionDistanceSqr) {
        actor.stop();
        // actor = normalizeAfterCollision(actor, b, distance);
      }
    }
  });
};