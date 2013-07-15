var collisionUtil = require("./../lib/collisionUtilities");

describe("Collision Utilities", function(){
  describe("Detecting Stopper Location", function(){
    it("Should be x", function(){
      var actor = {
        moving: {value: 20, direction: "x"}
      };

      collisionUtil.detectStopper(actor, {});
      expect(actor.stopperLocation).toEqual("x");
    });
  });

  describe("Normalizing player's position", function(){

  });
});