var aware = require("./../lib/aware"),
    actor = {
      x: 10,
      y: 10,
      width: 10,
      height: 10,
      isMoving: true,
      hasWon: false,
      moving: {x: 5,y:0}
    },
    blocks = [{
      x: 50,
      y: 12,
      width: 10,
      height: 10
    }];

describe("I'm aware", function(){
  it("Should stop when the distance is to close", function(){
    for(var i=actor.x;i<=50;i+=5){
      actor.x += 5;
      aware(actor, blocks, {x: 100,y:100});
    }

    expect(actor.isMoving).toBeFalsy();
  });
});