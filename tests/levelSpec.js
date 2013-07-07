var should = require("should"),
    level = require("../lib/level"),
    conf = require("../conf/game");

describe("Game Configuration", function(){
  describe("Reading Configuration", function(){
    it("Should parse the configuration correctly", function(){
      var gameConf = level.init(conf);

      gameConf.should.have.ownProperty("world");
      gameConf.should.have.ownProperty("levels");

      gameConf.levels.should.have.ownProperty("1");
      gameConf.levels.should.have.ownProperty("2");

      gameConf.world.width.should.equal(600);
      gameConf.world["background-color"].should.equal("black");

    });
  });
});