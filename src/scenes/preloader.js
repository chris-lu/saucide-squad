define([
    'phaser'
], function (Phaser) {
    'use strict';

    function Preloader(game) {
        this.background = null;
        this.preloadBar = null;
        this.ready = false;
        this.game = game;
        
                
        this.resources = [
            ['logo', 'assets/title.png'],
            ['bbq', 'assets/images/bbq.png'],
            ['plateforme', 'assets/plateforme.png']
        ]
    }

    Preloader.prototype = {
        constructor: Preloader,
        preload: function () {
            //	These are the assets we loaded in Boot.js
            //	A nice sparkly background and a loading progress bar
            var logo = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'logo');
            this.preloadBar = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY + logo.height, 'preloaderBar');
            logo.anchor.setTo(0.5, 0.5);
            this.preloadBar.anchor.setTo(0.5, 0.5);

            //	This sets the preloadBar sprite as a loader sprite.
            //	What that does is automatically crop the sprite from 0 to full-width
            //	as the files below are loaded in.
            this.load.setPreloadSprite(this.preloadBar);

            //	Here we load the rest of the assets our game needs.
            //	As this is just a Project Template I've not provided these assets, swap them for your own.
            for(var key in this.resources) {
                this.game.load.image(this.resources[key][0], this.resources[key][1]);
            }
            
            //this.load.image('titlepage', 'images/title.jpg');
            //this.load.atlas('playButton', 'images/play_button.png', 'images/play_button.json');
            //this.load.audio('titleMusic', ['audio/main_menu.mp3']);
            //this.load.bitmapFont('caslon', 'fonts/caslon.png', 'fonts/caslon.xml');
            //	+ lots of other required assets here
        },
        create: function () {
            //	Once the load has finished we disable the crop because we're going to sit in the update loop for a short while as the music decodes
            this.preloadBar.cropEnabled = false;

            var logo = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'logo');
            logo.anchor.setTo(0.5, 0.5);

            this.game.add.text(16, 16, 'preloader', {fontSize: '32px', fill: '#fff'});
        },
        update: function () {
            //	You don't actually need to do this, but I find it gives a much smoother game experience.
            //	Basically it will wait for our audio file to be decoded before proceeding to the MainMenu.
            //	You can jump right into the menu if you want and still play the music, but you'll have a few
            //	seconds of delay while the mp3 decodes - so if you need your music to be in-sync with your menu
            //	it's best to wait for it to decode here first, then carry on.

            //	If you don't have any music in your game then put the game.state.start line into the create function and delete
            //	the update function completely.

            if (/*this.cache.isSoundDecoded('titleMusic') && */ this.ready == false)
            {
                this.ready = true;
                this.state.start('Menu');
            }

        }
    };

    return Preloader;
});