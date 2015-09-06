define([
    'phaser','sprites/window'
], function (Phaser, Window) {
    'use strict';

    function Credit(game) {
        this.music = null;
        this.clic = null;
        this.playButton = null;
    }

    Credit.prototype = {
        constructor: Credit,
        create: function () {
            //	We've already preloaded our assets, so let's kick right into the Main Menu itself.
            // background
			
            this.imgCredits = this.add.button(0, 0, 'credits-img', this.startMenu, this, 0, 0, 1);
            this.imgCredits.scale.setTo(0.5, 0.5);
			
			// Apparition de la croix
            this.croixFermer = this.game.add.text(0, -10, 'x', {fontSize: '32px', fill: '#fff'});

            this.music = this.game.add.audio('zik-intro');
            this.music.loop=true;
            this.music.play();
            this.music.volume=0.25;
            
            this.clic = this.game.add.audio('clic');
            
        },
        update: function () {
            // à virer quand on voudra vraiment le menu du cul
            // this.state.start('Game');
        },
        startMenu: function (pointer) {
            //	Ok, the Play Button has been clicked or touched, so let's stop the music (otherwise it'll carry on playing)
            this.music.stop();
            this.clic.play();

            //	And start the actual game
            this.state.start('Menu');

        }
    };

    return Credit;
});