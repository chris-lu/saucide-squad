define([
    'phaser'
], function (Phaser) {
    'use strict';
    var width = 100;

    function Sausage(game) {
        Phaser.Sprite.call(this, game, game.width / 2, 0, 'sausage', 1);
        this.width = 50;
        game.physics.enable(this, Phaser.Physics.ARCADE);
        
        this.anchor.setTo(0.5, 0.5);
        this.width = width;
        this.scale.y = this.scale.x;
                
	this.body.bounce.y = 0.35;
        this.body.gravity.y = 981;
	this.body.collideWorldBounds = true;
        
        game.add.existing(this);
    }

    Sausage.prototype = Object.create(Phaser.Sprite.prototype);
    Sausage.prototype.constructor = Sausage;
    Sausage.prototype.update = function () {
	this.game.physics.arcade.collide(this);
    };

    return Sausage;
});
