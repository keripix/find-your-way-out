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
      {x: 1, y: 1},
      {x: 50, y: 60},
      {x: 21, y: 31}
      ],
      "start": {
        x: 300,
        y: 580
      },
      "out": {
        "position": {x: 600, y: 200},
        "width": "10",
        "height": "10"
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
        y: 500
      },
      "out": {
        "position": {x: 600, y: 200},
        "width": "10",
        "height": "10"
      }
    }
  ]
}