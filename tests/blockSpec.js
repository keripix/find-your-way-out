var Block = require("./../lib/block"),
    conf = {
      x: 10,
      y: 10,
      width: 10,
      height: 10,
      color: "red"
    };

describe("Block Item", function(){
  it("Should create block", function(){
    var item = new Block(conf);

    expect(item.x).toEqual(10);
    expect(item.midX).toEqual(15);
  });

  it("Should move and update property correctly", function(){
    var item = new Block(conf);

    item.moveX(10);
    expect(item.x).toEqual(20);
    expect(item.midX).toEqual(25);
    expect(item.moving.value).toEqual(10);
    expect(item.moving.direction).toEqual("x");

    item.moveX(-10);
    expect(item.x).toEqual(10);
    expect(item.midX).toEqual(15);
    expect(item.moving.value).toEqual(-10);
    expect(item.moving.direction).toEqual("x");

    item.moveY(10);
    expect(item.y).toEqual(20);
    expect(item.midY).toEqual(25);
    expect(item.moving.value).toEqual(10);
    expect(item.moving.direction).toEqual("y");

    item.moveY(-10);
    expect(item.y).toEqual(10);
    expect(item.midY).toEqual(15);
    expect(item.moving.value).toEqual(-10);
    expect(item.moving.direction).toEqual("y");
  });

  it("Should not move when stopped", function(){
    var item = new Block(conf);

    item.moveX(10);
    item.stop();

    expect(item.isMoving).toBeFalsy();
    expect(item.moving.amount).toEqual(0);
  });
});
