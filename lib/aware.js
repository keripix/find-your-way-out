module.exports = function(actor, blocks, exit){
  var check = "x",
      moving = "y",
      bound = actor.height,
      collisionAxis = "height";

  if (actor.x >= (exit.x - actor.width) && actor.y >= (exit.y - actor.height)){
    actor.isMoving = false;
    actor.hasWon = true;
    return;
  }

  // not good
  if (actor.x >= 600 || actor.y >= 600 || actor.x <= 0 || actor.y <= 0){
    actor.hasLost = true;
    return;
  }

  if (actor.moving.x !== 0) {
    check = "y";
    moving = "x";
    bound = actor.width;
    collisionAxis = "width";
  }

  blocks.forEach(function(b){
    if (b[check] <= (actor[check] + bound) && b[check] >= (actor[check] - bound)) {

      var midActor = {x: actor.x + (actor.width/2), y: actor.y + (actor.height/2)},
          midBlock = {x: b.x + (b.width/2), y: b.y + (b.height/2)},
          distance = Math.sqrt(Math.pow(midActor.x-midBlock.x,2)+Math.pow(midActor.y-midBlock.y,2));
          collisionDistance = (actor[collisionAxis] + b[collisionAxis])/2;
      console.log(distance, collisionDistance);
      if (distance <= collisionDistance) {
        actor.isMoving = false;
        actor.moving.x = 0;
        actor.moving.y = 0;
      }
    }
  });
};