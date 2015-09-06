define([
    'phaser'
], function (Phaser) {
    'use strict';
    var width = 50;
    var pointerDown = true;

    function Bbq(game) {
        Phaser.Sprite.call(this, game, game.width, game.height - 84, 'bbq');
        game.physics.enable(this, Phaser.Physics.ARCADE);
        this.animations.add('burn');
        this.anchor.setTo(0.5, 0.5);
        this.body.immovable = true;
        this.body.setSize(this.width, this.height / 4 * 3, 0, this.height / 4);
        this.width = width;
        this.scale.y = this.scale.x;
        game.add.existing(this);
    }

    Bbq.prototype = Object.create(Phaser.Sprite.prototype);
    Bbq.prototype.constructor = Bbq;
    Bbq.prototype.update = function () {
        if (this.active) {
            // Follow the mouse
            this.game.physics.arcade.moveToXY(this, this.game.input.x, this.y, 50, 100);
        }
        else {
            // Get out of my screen !
            this.game.physics.arcade.moveToXY(this, this.game.width + this.width, this.y, 50, 100);
        }
    };

    return Bbq;
});
