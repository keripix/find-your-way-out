var block = require("./../lib/block"),
    conf = {
      x: 10,
      y: 10,
      width: 10,
      height: 10,
      color: "red"
    };

describe("Block Item", function(){
  it("Should create block", function(){
    var item = block.create(conf);

    expect(item.x).toEqual(10);
    expect(item.midX).toEqual(15);
  });
});