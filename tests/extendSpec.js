var extend = require("./../lib/extend");

describe("Extending", function(){
  it("Should extend an object", function(){
    var a = {name: "a", age: 10},
        b = {address: "earth"};

    extend(b, a);
    expect(b.name).toBeDefined();
    expect(b.age).toEqual(10);
    expect(b.address).toEqual("earth");
  });
});