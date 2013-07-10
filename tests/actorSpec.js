var Actor = require("./../lib/actor"),
    conf = {
      x: 10,
      y: 10,
      width: 10,
      height: 10,
      color: "red"
    };

describe("An Actor", function(){
  it("Should have the same properties as block", function(){
    var person = new Actor(conf);

    expect(person.midX).toEqual(15);
    expect(person.isMoving).toEqual(false);
  });

  it("Should have hasWon and hasLost properties", function(){
    var person = new Actor(conf);

    expect(person.hasWon).toBeDefined();
    expect(person.hasLost).toBeDefined();
  });
});