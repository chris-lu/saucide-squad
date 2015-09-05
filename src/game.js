define([
    'phaser'
], function (Phaser) { 
    'use strict';

    function Game() {    
    }
    
    Game.prototype = {
        constructor: Game,

        start: function() {
            this.game = new Phaser.Game('100', '100', Phaser.AUTO, '', { 
                preload: this.preload, 
                create: this.create 
            });
        },

        preload: function() {
            this.game.load.image('logo', 'assets/title.png');
        },
        
        create: function() {
            var logo = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'logo');
            logo.anchor.setTo(0.5, 0.5);
        }
    };
    
    return Game;
});