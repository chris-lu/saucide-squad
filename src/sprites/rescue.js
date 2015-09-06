define([
    'phaser'
], function (Phaser) {
    'use strict';
    var width = 50;    

    function Rescue(game) {
        Phaser.Sprite.call(this, game, game.width, game.height - 60, 'rescue');
        game.physics.enable(this, Phaser.Physics.ARCADE);
        this.active = false;
        this.anchor.setTo(0.5, 0.5);
        this.body.immovable = true;
        this.body.setSize(this.width, this.height / 5*4, 0, this.height / 5);
        this.width = width;
        this.scale.y = this.scale.x;
        game.add.existing(this);
    }

    Rescue.prototype = Object.create(Phaser.Sprite.prototype);
    Rescue.prototype.constructor = Rescue;
    Rescue.prototype.update = function () {
        if(this.active) {
            // Follow the mouse
            this.game.physics.arcade.moveToXY(this, this.game.input.x, this.y, 50, 100);
        }
        else {
            // Get out of my screen !
            this.game.physics.arcade.moveToXY(this, this.game.width + this.width, this.y, 50, 100);            
        }
    };

    return Rescue;
});
