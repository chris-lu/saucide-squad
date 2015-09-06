define([
    'phaser'
], function (Phaser) {
    'use strict';
    var width = 20;

    function Human(game, y) {
        Phaser.Sprite.call(this, game, game.width / 2, y - 64, 'human', game.rnd.integerInRange(0, 5));
        game.physics.enable(this, Phaser.Physics.ARCADE);
        
        this.anchor.setTo(0.5, 0.5);
        this.width = width;
        this.scale.y = this.scale.x;
        this.angle = Math.random()*30 - 15;
	this.body.bounce.y = 0;
        this.body.gravity.y = 981;
	this.body.collideWorldBounds = true;
        
        game.add.existing(this);
    }

    Human.prototype = Object.create(Phaser.Sprite.prototype);
    Human.prototype.constructor = Human;
    Human.prototype.update = function () {
	//this.game.physics.arcade.collide(this);
    };

    return Human;
});
