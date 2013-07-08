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
    }],
    exit = {
      x: 100,
      y: 100,
      width: 10,
      height: 10
    };

describe("I'm aware", function(){
  beforeEach(function(){
    actor = {
      x: 10,
      y: 10,
      width: 10,
      height: 10,
      isMoving: true,
      hasWon: false,
      moving: {x: 5,y:0}
    };
  });
  it("Should stop when the distance is to close", function(){
    for(var i=actor.x;i<=50;i+=5){
      actor.x += 5;
      aware(actor, blocks, exit,{width:150,height:150});
    }

    expect(actor.isMoving).toBeFalsy();
  });

  it("Should only win if the actor has made a contact with the exit box", function(){
    exit.y = 5;
    for (var i=actor.x; i<=110;i+=5){
      actor.x += 5;
      aware(actor, blocks, exit,{width:150,height:150});
    }

    expect(actor.hasWon).toBeTruthy();
  });

  it("Should lose if the actor has gone out of the world", function(){
    exit.x = 145;
    exit.y = 50;
    for (var i=actor.x; i<=160;i+=5){
      actor.x += 5;
      aware(actor, blocks, {x: 145,y:50},{width:150,height:150});
    }

    expect(actor.hasLost).toBeTruthy();
  });

  it("Should normalize actor position after collision with block", function(){
    actor.moving.x = 7;

    for (var i = actor.x; i <= blocks[0].x; i+= actor.moving.x) {
      actor.x += actor.moving.x;
      aware(actor, blocks, exit, {width: 150, height: 150});
    }

    expect(actor.isMoving).toBeFalsy();
    expect(actor.x).toEqual(60);
  });
});