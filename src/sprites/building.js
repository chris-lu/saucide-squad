define([
    'phaser', 'sprites/window'
], function (Phaser, Window) {
    'use strict';

    function Building(game, y) {
        this.windows = null;
        this.wMatrix = [
            [
                [4, 6, 7],
                [2, 3, 2],
                [2, 3, 1],
                [2, 5, 2],
                [4, 0, 7],
            ],
            [
                [2, 6, 1],
                [3, 3, 3],
                [2, 6, 2],
                [2, 5, 2],
                [7, 0, 7],
            ],
            [
                [7, 1, 2],
                [3, 7, 2],
                [2, 5, 4],
                [3, 6, 3],
                [2, 0, 2],
            ]
        ];

        Phaser.Sprite.call(this, game, 73, 155, 'building');
        this.scale.setTo(0.5, 0.5);
        game.add.existing(this);
        
        this.constructWindows();
        game.add.existing(this.windows);
    }

    Building.prototype = Object.create(Phaser.Sprite.prototype);
    Building.prototype.constructor = Building;
    Building.prototype.constructWindows = function () {
        this.windows = this.game.add.group();
        var rnd = Math.random();
        var wType = [];
        if (rnd > 0.67) {
            wType = this.wMatrix[2];
        }
        else if (Math.random() < 0.5) {
            wType = this.wMatrix[1];
        }
        else {
            wType = this.wMatrix[0];
        }
        for (var i = 0; i < 5; i++) {
            for (var j = 0; j < 3; j++) {
                if (!(i == 4 && j == 1)) {
                    this.windows.add(new Window(this.game, 112 + j * 60, 200 + i * 60, wType[i][j]));
                }
            }
        }
    }

    Building.prototype.update = function () {
        //this.game.physics.arcade.collide(this);
    };

    return Building;
});
