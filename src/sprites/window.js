define([
    'phaser'
], function (Phaser) {
    'use strict';
    var winType;
    
    function Window(game, x, y, type) {
        this.winType = type; //Math.floor(Math.random() * 7) + 1;;
        Phaser.Sprite.call(this, game, x, y, 'window', this.winType);
        game.physics.enable(this, Phaser.Physics.ARCADE);
        this.anchor.setTo(0.25, 0.5);        
        this.body.immovable = true;
        // Cannot set offset off box here cannot understand why (working in BBQ). Moving windows instead... 
        this.body.setSize(30, 2);
        
        //game.physics.enable(this, Phaser.Physics.ARCADE);
        this.scale.setTo(0.5, 0.5);
        
        game.add.existing(this);
    }

    Window.prototype = Object.create(Phaser.Sprite.prototype);
    Window.prototype.constructor = Window;

    return Window;
});
