var Aware = require("./../lib/aware"),
    Block = require("./../lib/block"),
    Actor = require("./../lib/actor"),
    aware = new Aware(),
    player, blocks, exit, world;

describe("I'm aware", function(){
  beforeEach(function(){
    player = new Actor({
      x: 10,
      y: 10,
      width: 10,
      height: 10
    });
    player.isMoving = true;

    blocks = [new Block({
      x: 50,
      y: 12,
      width: 10,
      height: 10
    })];

    exit = new Block({
      x: 100,
      y: 100,
      width: 10,
      height: 10
    });

    world = {width: 150, height: 150};

    aware.setObserved(player, blocks, exit, world);
  });

  afterEach(function(){
    player = blocks = exit = null;
  });

  // global
  it("Should stop when the distance is to close", function(){
    var called = false;
    spyOn(aware, "emit").andCallThrough();

    aware.on("playerBlocked", function(){
      called = true;
    });

    while(true){
      player.moveX(5);
      aware.observe();
      if (called){
        break;
      }
    }

    expect(aware.emit).toHaveBeenCalledWith("playerBlocked", player, blocks[0]);
  });

  it("Should only win if the player has made a contact with the exit box", function(){
    exit.y = 10;
    exit.midY = 15;
    blocks[0].y = 100;
    blocks[0].midY = 105;

    var called = false;

    spyOn(aware, "emit").andCallThrough();

    aware.on("playerExit", function(){
      called = true;
    });

    while(true){
      player.moveX(5);
      aware.observe();

      if (called){
        break;
      }
    }

    expect(aware.emit).toHaveBeenCalledWith("playerExit", player);
  });

  it("Should lose if the player has gone out of the world", function(){
    blocks[0].y = 100;
    blocks[0].midY = 105;
    exit.x =  145;
    exit.y = 50;
    exit.midX = 150;
    exit.midY = 55;

    var called = false;

    spyOn(aware, "emit").andCallThrough();

    aware.on("playerOut", function(){
      called = true;
    });

    while(true){
      player.moveX(5);
      aware.observe();

      if (called){
        break;
      }
    }

    expect(aware.emit).toHaveBeenCalledWith("playerOut", player);
  });

  it("Should normalize player position after collision with block", function(){
    var called = false;

    aware.on("playerBlocked", function(){
      called = true;
    });

    while (true) {
      player.moveX(7);
      aware.observe();

      if (called){
        break;
      }
    }

    expect(player.x).toEqual(40);
  });

  it("Should be able to detect where the stopper's location is", function(){
    for(var i=player.x;i<=50;i+=5){
      player.moveX(5);
      aware.observe();
    }

    expect(player.stopperLocation).toEqual("x");
  });

  // it("Should not stop if the block is not stopping the block eventhough the distance between them is 0", function(){

  // });
});