define([
    'phaser', 'sprites/sausage', 'sprites/human'
], function (Phaser, Sausage, Human) {
    'use strict';
    function Jumpers(game) {
        var timer = game.time.create(false);
        timer.loop(2000, this.jump, this);
        timer.start();
        
        Phaser.Group.call(this, game, null);
        game.add.existing(this);
    }

    Jumpers.prototype = Object.create(Phaser.Group.prototype);
    Jumpers.prototype.constructor = Jumpers;
    Jumpers.prototype.jump = function() {
        this.add(new Human(this.game, 0));
    }

    return Jumpers;
});
