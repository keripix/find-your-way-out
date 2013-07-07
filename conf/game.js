module.exports = {
  "world": {
    "width": 600,
    "height": 600,
    "background-color": "black",
    "box-color": "blue",
    "actor": "white"
  },
  "levels": [
    {
      blocks: [
      {x: 300, y: 290},
      {x: 50, y: 60},
      {x: 21, y: 31}
      ],
      "start": {
        x: 300,
        y: 580,
        width: 10,
        height: 10,
        color: "#ECF0F1"
      },
      "out": {
        x: 590,
        y: 300,
        height: 10,
        width: 10,
        color: "#27AE60"
      }
    },
    {
      blocks: [
      {x: 1, y: 50},
      {x: 23, y: 500},
      {x: 301, y: 400},
      {x: 491, y: 111}
      ],
      "start": {
        x: 300,
        y: 500,
        height: 10,
        width: 10,
        color: "#ECF0F1"
      },
      "out": {
        x: 590,
        y: 300,
        width: 10,
        height: 10,
        color: "#27AE60"
      }
    }
  ]
}