module.exports = function(actor, blocks){
  var check = "x",
      moving = "y";

  if (actor.moving.x !== 0) {
    check = "y";
    moving = "x";
  }

  blocks.forEach(function(b){
    if (b[check] === actor[check]) {
      console.log(actor[moving], b[moving]+actor.h);
      if (actor[moving] <= (b[moving] + actor.h)) {
        actor.isMoving = false;
        actor.moving.x = 0;
        actor.moving.y = 0;
      }
    }
  });
};