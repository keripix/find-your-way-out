var aware = require("./../lib/aware"),
    block = require("./../lib/block"),
    actor = require("./../lib/actor"),
    player = actor.create({
      x: 10,
      y: 10,
      width: 10,
      height: 10
    }),
    blocks = [block.create({
      x: 50,
      y: 12,
      width: 10,
      height: 10
    })],
    exit = block.create({
      x: 100,
      y: 100,
      width: 10,
      height: 10
    });

describe("I'm aware", function(){
  beforeEach(function(){
    player = actor.create({
      x: 10,
      y: 10,
      width: 10,
      height: 10
    });
    player.isMoving = true;
  });

  it("Should stop when the distance is to close", function(){
    var iterate = 0;
    while(player.isMoving){
      if (++iterate >= 10){
        break;
      }
      player.moveX(5);
      aware(player, blocks, exit,{width:150,height:150});
    }
    expect(player.isMoving).toBeFalsy();
  });

  it("Should only win if the player has made a contact with the exit box", function(){
    exit.y = 10;
    exit.midY = 15;
    blocks[0].y = 100;
    blocks[0].midY = 105;

    while(player.x <= exit.x){
      player.moveX(5);
      aware(player, blocks, exit,{width:150,height:150});
    }

    expect(player.hasWon).toBeTruthy();
  });

  it("Should lose if the player has gone out of the world", function(){
    while(player.x <= 150){
      player.moveX(5);
      aware(player, blocks, {x: 145,y:50,midX:150,midY:55},{width:150,height:150});
    }

    expect(player.hasLost).toBeTruthy();
  });

  it("Should normalize player position after collision with block", function(){
    while (player.x <= blocks[0].x) {
      player.moveX(7);
      aware(player, blocks, exit, {width: 150, height: 150});
    }

    expect(player.isMoving).toBeFalsy();
    expect(player.x).toEqual(50);
  });

  it("Should be able to detect where the stopper's location is", function(){
    for(var i=player.x;i<=50;i+=5){
      player.moveX(5);
      aware(player, blocks, exit,{width:150,height:150});
    }

    expect(player.isMoving).toBeFalsy();
    expect(player.stopperLocation).toEqual("x");
  });
});