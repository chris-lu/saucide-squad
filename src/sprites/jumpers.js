define([
    'phaser', 'sprites/sausage', 'sprites/human'
], function (Phaser, Sausage, Human) {
    'use strict';
    function Jumpers(game) {
        this.timer = game.time.create(false);
        this.timer.loop(1825, this.jump, this);
        this.timer.start();

        Phaser.Group.call(this, game, null);
        game.add.existing(this);
    }

    Jumpers.prototype = Object.create(Phaser.Group.prototype);
    Jumpers.prototype.constructor = Jumpers;
    Jumpers.prototype.jump = function () {
        if (Math.random() < 0.23) {
            this.add(new Human(this.game, this.game.rnd.between(70, 250), 170));
        } else {
            this.add(new Sausage(this.game, this.game.rnd.between(70, 250), 170));
        }
    }
    Jumpers.prototype.kill = function () {
        this.timer.stop();
        for (var i in this.children) {
            this.remove(this.children[i]);
        }
    }

    return Jumpers;
});
