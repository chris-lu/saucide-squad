define([
    'phaser'
], function (Phaser) {
    'use strict';
    var width = 100;
    var wType = 0;

    function Window(game) {
        Phaser.Sprite.call(this, game, game.width / 2, game.height - this.height, 'w');
        //game.physics.enable(this, Phaser.Physics.ARCADE);
        this.anchor.setTo(0.5, 0.5);
        this.width = width;
        this.scale.y = this.scale.x;
    }

    Window.prototype = Object.create(Phaser.Sprite.prototype);
    Window.prototype.constructor = Window;

    return Window;
});
