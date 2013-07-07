module.exports = function(actor, blocks, exit){
  var check = "x",
      moving = "y",
      bound = actor.h;

  if (actor.x >= (exit.x - actor.w) && actor.y >= (exit.y - actor.h)){
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
    bound = actor.w;
  }

  blocks.forEach(function(b){
    if (b[check] === actor[check]) {
      if (actor[moving] <= (b[moving] + bound)) {
        actor.isMoving = false;
        actor.moving.x = 0;
        actor.moving.y = 0;
      }
    }
  });
};