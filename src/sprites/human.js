define([
    'phaser'
], function (Phaser) {
    'use strict';
    var width = 20;
    var cri = null;
    var lostHuman = false;

    function Human(game, x, y) {
        this.latestWindow = 0;
        
        Phaser.Sprite.call(this, game, x, y - 64, 'human', game.rnd.integerInRange(0, 5));
        game.physics.enable(this, Phaser.Physics.ARCADE);
        
        this.anchor.setTo(0.5, 0.5);
        this.width = width;
        this.scale.y = this.scale.x;
        this.angle = Math.random()*30 - 15;
        this.alpha = 0;
        this.body.bounce.y = 0;
        this.body.gravity.y = 981;
        this.body.collideWorldBounds = true;
        this.body.velocity.y = -170;
        this.body.velocity.x = Math.random()*120 - 60;
        
        game.add.existing(this);
        
        this.cri = this.game.add.audio('cri_wilhelm');
        game.add.tween(this).to( { alpha: 1 }, 250, "Quart.easeOut", true);
        game.time.events.add(Phaser.Timer.SECOND * 0.42, this.scream, this);
        game.time.events.add(Phaser.Timer.SECOND * 5, this.disappear, this);
    }

    Human.prototype = Object.create(Phaser.Sprite.prototype);
    Human.prototype.constructor = Human;
    Human.prototype.update = function () {
	    if (this.y > this.game.height - 88 && !this.lostHuman) {
	    	this.lostHuman = true;
	    	this.game.loseHumain();
	    }
    };
    Human.prototype.stop = function () {
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
    Human.prototype.scream = function () {
        //this.cri.play();
    };
    Human.prototype.disappear = function () {
        this.game.add.tween(this).to( { alpha: 0 }, 1500, "Quart.easeIn", true);
        this.game.time.events.add(Phaser.Timer.SECOND * 2, this.kill, this);
    };
    Human.prototype.changeWindow = function (newType) {
    };

    return Human;
});
