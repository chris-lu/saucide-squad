define([
    'phaser'
], function (Phaser) {
    'use strict';

    function Splash(game, x, y, type) {
        Phaser.Sprite.call(this, game, x, y, 'splash', type);
        this.anchor.setTo(0.5, 0.5);        
        this.scale.setTo(0.5, 0.5);
        
        game.time.events.add(Phaser.Timer.SECOND * 3, this.disappear, this);
    }

    Splash.prototype = Object.create(Phaser.Sprite.prototype);
    Splash.prototype.constructor = Splash;
    Splash.prototype.disappear = function() {
        this.game.add.tween(this).to( { alpha: 0 }, 6000, "Quart.easeIn", true);
        this.game.time.events.add(Phaser.Timer.SECOND * 1.1, this.kill, this);
    }

    return Splash;
});
