var gameConfig = require("../lib/gameConfiguration"),
    conf = require("../conf/game");

describe("Game Configuration", function(){
  describe("Reading Configuration", function(){
    it("Should parse the configuration correctly", function(){
      var gameConf = gameConfig.init(conf);

      expect(gameConf.world).toBeDefined();
      expect(gameConf.levels).toBeDefined();

      expect(gameConf.levels.length).toEqual(2);
    });

    // it("Should throw Error if bad conf is passed", function(){
    //   expect(gameConfig.init({bla:1,bli:2})).toThrow();
    // });
    //

    describe("Setting global configuration for each level's setting", function(){
      it("Should apply global settings to actor if none provided", function(){
        var gameConf = gameConfig.init(conf);

        expect(gameConf.getLevel(1).actor.width).toEqual(10);
        expect(gameConf.getLevel(1).actor.color).toEqual("#ECF0F1");

        expect(gameConf.getLevel(2).out.width).toEqual(10);
        expect(gameConf.getLevel(2).out.color).toEqual("#27AE60");
      });

      it("Should apply global settings to blocks if none provided", function(){
        var gameConf = gameConfig.init(conf),
            blocks = gameConf.getLevel(1).blocks;

        expect(blocks[0].width).toEqual(10);
        expect(blocks[0].height).toEqual(10);
        expect(blocks[0].color).toEqual("#000000");

        expect(blocks[2].width).toEqual(10);
        expect(blocks[2].height).toEqual(10);
        expect(blocks[2].color).toEqual("#000000");
      });
    });

    it("Should add middle point for each item", function(){
      var gameConf = gameConfig.init(conf),
          blocks = gameConf.getLevel(1).blocks,
          actor = gameConf.getLevel(1).actor;

      expect(actor.midX).toEqual(305);
      expect(actor.midY).toEqual(585);

      expect(blocks[0].midX).toEqual(305);
      expect(blocks[0].midY).toEqual(295);
    });

    it("Should parsed the level correctly", function(){
      var gameConf = gameConfig.init(conf);

      expect(gameConf.getLevel("1")).toBeDefined();
      expect(gameConf.getLevel(1).hasWon).toBeFalsy();
      expect(gameConf.getLevel(1).hasLost).toBeFalsy();

      var level1 = gameConf.getLevel("1");

      expect(level1.actor.x).toEqual(300);
      expect(level1.actor.y).toEqual(580);

      expect(gameConf.getLevel(2).actor.y).toEqual(500);
    });

    it("Should not proceed when the level requested is more than what is available", function(){
      var gameConf = gameConfig.init(conf),
          level = gameConf.getLevel(10);

      expect(level).toBeUndefined();
    });
  });
});