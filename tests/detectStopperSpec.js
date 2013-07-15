var collisionUtil = require("./../lib/collisionUtilities");

describe("Collision Utilities", function(){
  describe("Detecting Stopper Location", function(){
    it("Should detect the incoming direction", function(){
      var actor = {
        moving: {value: 20, direction: "x"}
      };

      collisionUtil.detectStopper(actor, {});
      expect(actor.stopperLocation).toEqual("x");

      actor.moving = {value: 20, direction: "-x"};
      collisionUtil.detectStopper(actor, {});
      expect(actor.stopperLocation).toEqual("-x");
    });
  });

  describe("Normalizing player's position", function(){
    it("Should placed the player's position correctly (X)", function(){
      var actor = {
            moving: {value: 20, direction: "x"},
            x: 42,
            midX: 47
          },
          block = {
            width: 10,
            height: 10,
            x: 50,
            midX: 55
          };

      collisionUtil.normalizedAfterCollision(actor, block);
      expect(actor.x).toEqual(40);
      expect(actor.midX).toEqual(45);

      actor.moving = {value: -20, direction: "x"};
      actor.x = 58;
      actor.midX = 63;
      collisionUtil.normalizedAfterCollision(actor, block);
      expect(actor.x).toEqual(60);
      expect(actor.midX).toEqual(65);
    });

    it("Should placed the player's position correctly (Y)", function(){
      var actor = {
            moving: {value: 20, direction: "y"},
            y: 44,
            midY: 49
          },
          block = {
            width: 10,
            height: 10,
            y: 50,
            midY: 55
          };

      collisionUtil.normalizedAfterCollision(actor, block);
      expect(actor.y).toEqual(40);
      expect(actor.midY).toEqual(45);

      actor.moving = {value: -20, direction: "y"};
      actor.y = 56;
      actor.midY = 61;
      collisionUtil.normalizedAfterCollision(actor, block);
      expect(actor.y).toEqual(60);
      expect(actor.midY).toEqual(65);
    });
  });
});