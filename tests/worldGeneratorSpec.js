var wg = require("../lib/worldGenerator");

describe("Generating World", function(){
  describe("Parsing Position", function(){
    it("Should parse position correctly", function(){

      var positions = wg.parsePosition({x: 59, y: 21});

      expect(positions[0].x).toEqual(59);
      expect(positions[0].y).toEqual(21);
    });
  });
});