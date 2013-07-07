# Find Your Way Out

A simple game I made in order to try out game-shell created by @mikolalysenko. This project is also my first try at using browserify. So, lets rock n roll.

The purpose of this game is to find a way out of the box. Simple Game.

## What If?

What if, in order to set the configuration of each level, I just need to write this:

    {
        "world": {
            "width": "600",
            "height": "600",
            "background-color": "black",
            "box-color": "blue",
            "actor": "white"
        },
        "1": {
            blocks: [
                {x: 1, y: 1},
                {x: 50, y: 60},
                {x: 21, y: 31}
            ],
            "out": {
                "position": {x: 600, y: 200},
                "width": "10",
                "height": "10"
            }
        },
        "2": {
            blocks: [
                {x: 1, y: 50},
                {x: 23, y: 500},
                {x: 301, y: 400},
                {x: 491, y: 111}
            ],
            "out": {
                "position": {x: 600, y: 200},
                "width": "10",
                "height": "10"
            }
        }

    }

## License
Copyright (c) 2013 A. Akbar Hidayat
Licensed under the MIT license.
