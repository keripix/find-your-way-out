var should = require("should"),
    level = require("../lib/level"),
    conf = require("../conf/game");

describe("Game Configuration", function(){
  describe("Reading Configuration", function(){
    it("Should parse the configuration correctly", function(){
      var gameConf = level.init(conf);

      gameConf.should.have.ownProperty("world");
    });
  });
});