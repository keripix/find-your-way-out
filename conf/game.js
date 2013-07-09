module.exports = {
  world: {
    width: 600,
    height: 600,
    actor: {
      width: 10,
      height: 10,
      color: "#ECF0F1"
    },
    out: {
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
      actor: {
        x: 300,
        y: 580,
      },
      out: {
        x: 590,
        y: 300
      }
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
      actor: {
        x: 300,
        y: 500
      },
      out: {
        x: 590,
        y: 300
      }
    },
    {
      blocks: [
      {x: 300, y: 400},
      {x: 50, y: 410},
      {x: 500, y: 410},
      {x: 60, y: 290},
      {x: 500, y: 290}
      ],
      actor: {
        x: 300,
        y: 500
      },
      out: {
        x: 590,
        y: 300
      }
    }
  ]
}