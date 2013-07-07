function Level(conf){
  this.world = conf.world;
  this.levels = conf.levels;
}

exports.init = function(conf){
  return new Level(conf)
}