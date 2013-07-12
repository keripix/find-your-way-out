module.exports = {
  world: {
    width: 600,
    height: 600,
    actor: {
      width: 10,
      height: 10,
      color: "#ECF0F1"
    },
    exit: {
      width: 10,
      height: 10,
      color: "#27AE60"
    },
    blocks: {
      width: 10,
      height: 10,
      color: "#000000"
    }
  },
  levels: [
    {
      blocks: [
      {x: 300, y: 290},
      {x: 50, y: 60},
      {x: 20, y: 30}
      ],
      actor: [{
        x: 300,
        y: 580,
      }],
      exit: [{
        x: 590,
        y: 300
      }]
    },
    {
      blocks: [
      {x: 10, y: 50},
      {x: 20, y: 500},
      {x: 300, y: 400},
      {x: 150, y: 410},
      {x: 160, y: 290},
      {x: 500, y: 500}
      ],
      actor: [{
        x: 300,
        y: 500
      }],
      exit: [{
        x: 590,
        y: 300
      }]
    },
    {
      blocks: [
      {x: 300, y: 400},
      {x: 50, y: 410},
      {x: 500, y: 410},
      {x: 60, y: 290},
      {x: 500, y: 290}
      ],
      actor: [{
        x: 300,
        y: 500
      }],
      exit: [{
        x: 590,
        y: 300
      }]
    },
    {"blocks":[{"x":500,"y":10,"width":10,"height":10,"color":"#010101"},{"x":490,"y":160,"width":10,"height":10,"color":"#010101"},{"x":370,"y":150,"width":10,"height":10,"color":"#010101"},{"x":380,"y":290,"width":10,"height":10,"color":"#010101"},{"x":150,"y":290,"width":10,"height":10,"color":"#010101"},{"x":130,"y":10,"width":10,"height":10,"color":"#010101"},{"x":110,"y":380,"width":10,"height":10,"color":"#010101"},{"x":120,"y":380,"width":10,"height":10,"color":"#010101"},{"x":130,"y":380,"width":10,"height":10,"color":"#010101"},{"x":140,"y":380,"width":10,"height":10,"color":"#010101"},{"x":150,"y":380,"width":10,"height":10,"color":"#010101"},{"x":170,"y":360,"width":10,"height":10,"color":"#010101"},{"x":170,"y":350,"width":10,"height":10,"color":"#010101"},{"x":170,"y":340,"width":10,"height":10,"color":"#010101"},{"x":180,"y":340,"width":10,"height":10,"color":"#010101"},{"x":180,"y":330,"width":10,"height":10,"color":"#010101"},{"x":170,"y":330,"width":10,"height":10,"color":"#010101"}],"actor":[{"x":280,"y":10,"width":10,"height":10,"color":"#ECF0F1"}],"exit":[{"x":160,"y":590,"width":10,"height":10,"color":"#27AE60"}],"key":[]}
  ]
};