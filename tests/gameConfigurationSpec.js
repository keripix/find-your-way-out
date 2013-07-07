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

    it("Should parsed the level correctly", function(){
      var gameConf = gameConfig.init(conf);

      expect(gameConf.getLevel("1")).toBeDefined();

      var level1 = gameConf.getLevel("1");

      expect(level1.start.x).toEqual(300);
      expect(level1.start.y).toEqual(580);

      expect(gameConf.getLevel(2).start.y).toEqual(500);
    });

    it("Should not proceed when the level requested is more than what is available", function(){
      var gameConf = gameConfig.init(conf),
          level = gameConf.getLevel(10);

      expect(level).toBeUndefined();
    });
  });
});