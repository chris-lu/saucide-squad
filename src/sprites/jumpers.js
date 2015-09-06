define([
    'phaser', 'sprites/sausage', 'sprites/human'
], function (Phaser, Sausage, Human) {
    'use strict';
    function Jumpers(game) {
        var timer = game.time.create(false);
        timer.loop(1425, this.jump, this);
        timer.start();
        
        Phaser.Group.call(this, game, null);
        game.add.existing(this);
    }

    Jumpers.prototype = Object.create(Phaser.Group.prototype);
    Jumpers.prototype.constructor = Jumpers;
    Jumpers.prototype.jump = function() {
        if(Math.random() < 0.23) {
            this.add(new Human(this.game, this.game.rnd.between(70, 250), 170));
        } else {
            this.add(new Sausage(this.game, this.game.rnd.between(70, 250), 170));
        }
    }

    return Jumpers;
});
