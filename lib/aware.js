function normalizeAfterCollision(actor, block, currentDistance){
  if (!actor.hasOwnProperty("stopperLocation")){
    detectStopper(actor, block);
  }

  var stopper = actor.stopperLocation,
      dist = stopper === "x" ? block.width/2 : block.height/2,
      delta = Math.round(currentDistance/2) - dist;

  console.log(dist, delta);

  if (delta !== 0){
    console.log("currentDistance: " + currentDistance);
    console.log("delta", block[actor.moving.direction], block["mid"+actor.moving.direction.toUpperCase()]);
    console.log("delta", actor[actor.moving.direction], actor["mid"+actor.moving.direction.toUpperCase()]);
    actor[actor.moving.direction] += delta;
    actor["mid"+actor.moving.direction.toUpperCase()] += delta;
    actor.requestRenderingForce = true;
    console.log("delta", actor[actor.moving.direction], actor["mid"+actor.moving.direction.toUpperCase()]);
  }
}

function detectStopper(actor, block){
  actor.stopperLocation = actor.moving.value >= 0 ? actor.moving.direction : "-" + actor.moving.direction;
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
        detectStopper(actor, b);
        normalizeAfterCollision(actor, b, Math.sqrt(distanceSqr));
        actor.stop();
      }
    }
  });
};