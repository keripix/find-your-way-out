function Level(conf){
  if (!conf.world || !conf.levels){
    throw new Error("Required params not provided");
  }

  this.world = conf.world;
  this.levels = conf.levels;
}

exports.init = function(conf){
  return new Level(conf)
}