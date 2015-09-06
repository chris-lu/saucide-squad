define([
    'phaser'
], function (Phaser) {
    'use strict';

    function Ground(game) {
        Phaser.Sprite.call(this, game, 0, game.height - 60);

        game.physics.enable(this, Phaser.Physics.ARCADE);
        this.body.immovable = true;
        // Cannot set offset off box here cannot understand why (working in BBQ). Moving windows instead... 
        this.body.setSize(game.width, 60);

        game.add.existing(this);
    }

    Ground.prototype = Object.create(Phaser.Sprite.prototype);
    Ground.prototype.constructor = Ground;

    return Ground;
});
