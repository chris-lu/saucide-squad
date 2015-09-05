define([
    'phaser', 'sprites/sausage'
], function (Phaser, Sausage) {
    'use strict';
    function Jumpers(game) {
        var test = new Sausage(game, 0);
        Phaser.Group.call(this, game, null);
    }

    Jumpers.prototype = Object.create(Phaser.Group.prototype);
    Jumpers.prototype.constructor = Jumpers;
    

    return Jumpers;
});
