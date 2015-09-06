define([
    'phaser'
], function (Phaser) {
    'use strict';
    var winType;
    
    function Window(game, x, y, type) {
        this.winType = type; //Math.floor(Math.random() * 7) + 1;;
        Phaser.Sprite.call(this, game, x, y, 'window', this.winType);
        game.physics.enable(this, Phaser.Physics.ARCADE);
        this.anchor.setTo(0.5, 0.5);        
        this.body.immovable = true;
        this.body.setSize(30, 1, this.width/2 - 15, this.height / 2);

        
        //game.physics.enable(this, Phaser.Physics.ARCADE);
        this.anchor.setTo(0.5, 0.5);
        this.scale.setTo(0.5, 0.5);
        
        game.add.existing(this);
    }

    Window.prototype = Object.create(Phaser.Sprite.prototype);
    Window.prototype.constructor = Window;

    return Window;
});
