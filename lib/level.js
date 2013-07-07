function Level(conf){
  this.world = conf.world;
}

exports.init = function(conf){
  return new Level(conf)
}