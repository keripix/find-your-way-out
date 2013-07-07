var should = require("should"),
    gameConfig = require("../lib/gameConfiguration"),
    conf = require("../conf/game");

describe("Game Configuration", function(){
  describe("Reading Configuration", function(){
    it("Should parse the configuration correctly", function(){
      var gameConf = gameConfig.init(conf);

      gameConf.should.have.ownProperty("world");
      gameConf.should.have.ownProperty("levels");

      gameConf.levels.should.have.length(2);
    });

    it("Should throw Error if bad conf is passed", function(){
      (function(){
        gameConfig.init({bla:1,bli:2});
      }).should.throw();
    });

    it("Should parsed the level correctly", function(){
      var gameConf = gameConfig.init(conf);

      gameConf.getLevel("1").should.be.ok;

      var level1 = gameConf.getLevel("1");

      level1.should.have.property("blocks");
      level1.start.x.should.equal(300);
      level1.start.y.should.equal(580);

      gameConf.getLevel(2).start.y.should.equal(500);
    });
  });
});