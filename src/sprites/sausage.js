define([
    'phaser'
], function (Phaser) {
    'use strict';
    var width = 20;

    function Sausage(game, x, y) {
        this.latestWindow = 0;
        
        Phaser.Sprite.call(this, game, x, y - 64, 'sausage', game.rnd.integerInRange(0, 4));
        game.physics.enable(this, Phaser.Physics.ARCADE);
        
        this.anchor.setTo(0.5, 0.5);
        this.width = width;
        this.scale.y = this.scale.x;
        this.angle = Math.random()*10 - 5;

	this.body.bounce.y = 0.20;
        this.body.gravity.y = 981;
	this.body.collideWorldBounds = true;
        
        game.add.existing(this);
    }

    Sausage.prototype = Object.create(Phaser.Sprite.prototype);
    Sausage.prototype.constructor = Sausage;
    Sausage.prototype.update = function () {
	//this.game.physics.arcade.collide(this);
    };
    Sausage.prototype.stop = function () {
        this.body.velocity.x = 0;
    };
    
    Sausage.prototype.changeWindow = function (newType) {
        switch(this.latestWindow) {
            case 1: break;
            default: break;
        }
        console.log(newType);
        switch(newType) {
            case 1: break;
            default: 
                this.body.allowGravity = true;
                this.body.velocity.x = Math.random()*400 - 200;
                this.body.velocity.y = Math.random()*100;
                break;
        }
        
        this.latestWindow = newType;
    }

    return Sausage;
});
