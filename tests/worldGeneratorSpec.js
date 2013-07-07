var wg = require("../lib/worldGenerator"),
    Canvas = require("canvas");

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
      expect(pos1.width).toEqual(5);

      expect(pos2.x).toEqual(6);
      expect(pos2.width).toEqual(5);
    });
  });

  describe("Placing items on canvas", function(){
    var canvas;

    beforeEach(function(){
      canvas = new Canvas(600, 600);
    });

    it("Should place item correctly with the correct dimension", function(){
      var positions = [{x: 50,y: 50, color:"rgb(212,213,214)"}, {x: 121, y: 31, width: 10, height:20, color: "rgb(100,101,102)"}],
          drawn = wg.generate(canvas, positions);

      expect(drawn).toBeDefined();

      // check wether the boxes has been drawn
      var context = drawn.getContext('2d'),
          data1 = context.getImageData(50, 50, 5, 5).data, // the first box
          data2 = context.getImageData(121, 31, 10, 21).data; // the second box

      for (var i = 0, n = data1.length; i < n; i += 4){
        expect(data1[i]).toEqual(212);
        expect(data1[i+1]).toEqual(213);
        expect(data1[i+2]).toEqual(214);
      }
    });
  });
});