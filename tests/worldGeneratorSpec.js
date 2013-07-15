var wg = require("../lib/worldGenerator"),
    Block = require("../lib/blocks/block"),
    Canvas = require("canvas");

describe("Generating World", function(){
  describe("Placing items on canvas", function(){
    var canvas,
        blocks;

    beforeEach(function(){
      canvas = new Canvas(600, 600);
      blocks = [new Block({
        x: 50,
        y: 50,
        color:"rgb(212,213,214)",
        width: 10,
        height: 10
      }), new Block({
        x: 121,
        y: 31,
        width: 10,
        height:20,
        color: "rgb(100,101,102)"
      })];
    });

    it("Should place item correctly with the correct dimension", function(){
      wg.generate(canvas, blocks);

      var context = canvas.getContext('2d'),
          data1 = context.getImageData(50, 50, 5, 5).data, // the first box
          data2 = context.getImageData(121, 31, 10, 20).data; // the second box

      for (var i = 0, n = data1.length; i < n; i += 4){
        expect(data1[i]).toEqual(212);
        expect(data1[i+1]).toEqual(213);
        expect(data1[i+2]).toEqual(214);
      }

      for (i = 0, n = data2.length; i < n; i += 4){
        expect(data2[i]).toEqual(100);
        expect(data2[i+1]).toEqual(101);
        expect(data2[i+2]).toEqual(102);
      }
    });
  });
});