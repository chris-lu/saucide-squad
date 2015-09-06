define([
    'phaser'
], function (Phaser) {
    'use strict';
    var width = 20;

    function Sausage(game, y) {
        Phaser.Sprite.call(this, game, game.width / 2, y - 64, 'sausage', game.rnd.integerInRange(0, 4));
        game.physics.enable(this, Phaser.Physics.ARCADE);
        
        this.anchor.setTo(0.5, 0.5);
        this.width = width;
        this.scale.y = this.scale.x;
        this.angle = Math.random()*10 - 5;

	this.body.bounce.y = 0.35;
        this.body.gravity.y = 981;
	this.body.collideWorldBounds = true;
        
        game.add.existing(this);
    }

    Sausage.prototype = Object.create(Phaser.Sprite.prototype);
    Sausage.prototype.constructor = Sausage;
    Sausage.prototype.update = function () {
	//this.game.physics.arcade.collide(this);
    };

    return Sausage;
});
