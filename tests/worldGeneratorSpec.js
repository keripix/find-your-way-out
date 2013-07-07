var wg = require("../lib/worldGenerator");

describe("Generating World", function(){
  describe("Parsing Position", function(){
    it("Should parse position correctly when passed an object", function(){

      var positions = wg.parsePosition({x: 59, y: 21});

      expect(positions[0].x).toEqual(59);
      expect(positions[0].y).toEqual(21);
      expect(positions[0].width).toEqual(5);
      expect(positions[0].height).toEqual(5);
    });

    it("Should parse positions correctly when passed an array", function(){
      var positions = wg.parsePosition([{x: 5, y: 5},{x: 6, y: 6}]);

      expect(positions.length).toEqual(2);

      var pos1 = positions[0],
          pos2 = positions[1];

      expect(pos1.x).toEqual(5);
      expect(pos2.x).toEqual(6);
    });
  });
});