module.exports = function(actor, blocks, exit){
  var check = "x",
      moving = "y";

  if (actor.x >= (exit.x-actor.w) && actor.y >= (exit.y - actor.h)){
    actor.isMoving = false;
    actor.hasWon = true;
    return;
  }

  if (actor.moving.x !== 0) {
    check = "y";
    moving = "x";
  }

  blocks.forEach(function(b){
    if (b[check] === actor[check]) {
      if (actor[moving] <= (b[moving] + actor.h)) {
        actor.isMoving = false;
        actor.moving.x = 0;
        actor.moving.y = 0;
      }
    }
  });
};