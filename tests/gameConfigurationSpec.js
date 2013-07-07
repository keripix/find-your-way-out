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
      it("Should apply global settings if none provided", function(){
        var gameConf = gameConfig.init(conf);

        expect(gameConf.getLevel(1).actor.width).toEqual(10);
        expect(gameConf.getLevel(1).actor.color).toEqual("#ECF0F1");

        expect(gameConf.getLevel(2).out.width).toEqual(10);
        expect(gameConf.getLevel(2).out.color).toEqual("#27AE60");
      });
    });

    it("Should parsed the level correctly", function(){
      var gameConf = gameConfig.init(conf);

      expect(gameConf.getLevel("1")).toBeDefined();

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