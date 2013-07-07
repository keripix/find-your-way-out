exports.parsePosition = function(position){
  var results = [];

  // if this is not an array, then make it an array
  if (toString.call(position) != '[object Array]'){
    position = [position];
  }

  position.forEach(function(pos){
    results.push({
      x: pos.x,
      y: pos.y,
      width: pos.width || 5,
      height: pos.height || 5
    });
  });

  return results;
};

exports.generate = function(canvas, position){
  var points = parsePosition(position);
}