define([
    'phaser'
], function (Phaser) {
    'use strict';
    var width = 100;

    function Bbq(game) {
        Phaser.Sprite.call(this, game, game.width / 2, game.height - this.height, 'bbq');
        game.physics.enable(this, Phaser.Physics.ARCADE);
        this.anchor.setTo(0.5, 0.5);
        this.width = width;
        this.scale.y = this.scale.x;
    }

    Bbq.prototype = Object.create(Phaser.Sprite.prototype);
    Bbq.prototype.constructor = Bbq;
    Bbq.prototype.update = function () {
        // Follow the mouse
        this.game.physics.arcade.moveToXY(this, this.game.input.x, this.y, 50, 100);
    };

    return Bbq;
});
