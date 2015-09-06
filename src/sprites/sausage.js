define([
    'phaser'
], function (Phaser) {
    'use strict';
    var width = 20;
    var lostSausage = false;

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
        
        this.body.velocity.y = -170;
        this.body.velocity.x = Math.random()*120 - 60;
        
        game.time.events.add(Phaser.Timer.SECOND * 5, this.disappear, this);
        
        game.add.existing(this);
    }

    Sausage.prototype = Object.create(Phaser.Sprite.prototype);
    Sausage.prototype.constructor = Sausage;
    Sausage.prototype.update = function () {
        this.body.angularVelocity=this.body.angularVelocity*0.9;
        if (this.y > this.game.height - 80) {
        	this.lostSausage = true;
        }
    };
    Sausage.prototype.stop = function () {
        this.body.velocity.x = 0;
        this.body.velocity.y = 0;
        this.body.angularVelocity = 0;
        this.body.enable=false;
        if (!this.lostSausage) {
        	this.game.add.tween(this).to( { alpha: 0 }, 1000, "Quart.easeIn", true);
            this.game.add.tween(this).to( { y: this.y-20 }, 1000, "Quart.easeOut", true);
            this.game.time.events.add(Phaser.Timer.SECOND * 1.1, this.kill, this);
        }
    };
    Sausage.prototype.disappear = function () {
        this.game.add.tween(this).to( { alpha: 0 }, 1500, "Quart.easeIn", true);
        this.game.time.events.add(Phaser.Timer.SECOND * 2, this.kill, this);
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
                this.body.velocity.y = -Math.random()*80;
                this.body.angularVelocity = Math.random()*1000-500;
                break;
        }
        
        this.latestWindow = newType;
    }

    return Sausage;
});
