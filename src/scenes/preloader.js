define([
    'phaser'
], function (Phaser) {
    'use strict';

    function Preloader(game) {
        this.background = null;
        this.preloadBar = null;
        this.ready = false;
        this.game = game;
                
        this.images = [
            ['logo', 'assets/images/title.png'],
            ['bg', 'assets/images/fond.png'],
            ['building', 'assets/images/immeuble-vide.png'],
            ['rescue', 'assets/images/rescue.png'],
            ['arbres', 'assets/images/arbres-premierplan.png'],
            ['nuage1', 'assets/images/nuage1.png'],
            ['nuage2', 'assets/images/nuage2.png'],
            ['game-over', 'assets/images/game-over.png'],
            ['logo-bandeau', 'assets/images/logo-bandeau.png'],
            ['filter-alpha', 'assets/images/filter-alpha.png'],
            ['credits-img', 'assets/images/credits.png'],
            ['credits-txt', 'assets/images/credits-txt.png']
        ];
        
        this.sprites = [
            ['bbq', 'assets/images/bbq-sprites.png', 90, 130, 6],
            ['splash', 'assets/images/taches.png', 80, 30, 2],
            ['sausage', 'assets/images/so6.png', 64, 192, 4],
            ['human', 'assets/images/humans.png', 64, 219, 5],
            ['window', 'assets/images/fenetres.png', 120, 120, 7],
            ['play-spritesheet', 'assets/images/play-spritesheet.png', 210,140,2],
            ['vie-humaine', 'assets/images/icone-mort-humain.png', 50,60,2],
            ['vie-saucisse', 'assets/images/icone-saucisse-ratee.png', 30,60,2],
        ];
        
        this.scripts = [
        ]
        
        this.audio = [
            ['zik-intro', 'assets/sounds/sausage_squad_intro_master.mp3'],
            ['zik', 'assets/sounds/sausage_squad_master.mp3'],
            ['clic', 'assets/sounds/clic_menu_1.wav'],
            ['cri_wilhelm', 'assets/sounds/cri_wilhelm.wav'],
            ['cri_saucisse', 'assets/sounds/cri_2.wav'],
            ['cri_saucisse_sol', 'assets/sounds/cri_3.wav'],
        ];
    }

    Preloader.prototype = {
        constructor: Preloader,
        preload: function () {
            //	These are the assets we loaded in Boot.js
            //	A nice sparkly background and a loading progress bar
            this.preloadBar = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'preloaderBar');
            this.preloadBar.anchor.setTo(0.5, 0.5);

            //	This sets the preloadBar sprite as a loader sprite.
            //	What that does is automatically crop the sprite from 0 to full-width
            //	as the files below are loaded in.
            this.load.setPreloadSprite(this.preloadBar);

            //	Here we load the rest of the assets our game needs.
            //	As this is just a Project Template I've not provided these assets, swap them for your own.
            for(var key in this.images) {
                this.game.load.image(this.images[key][0], this.images[key][1]);
            }
            
            for(var key in this.sprites) {
                this.game.load.spritesheet(this.sprites[key][0], this.sprites[key][1], this.sprites[key][2], this.sprites[key][3], this.sprites[key][4]);
            }
            
            for(var key in this.scripts) {
                this.game.load.script(this.scripts[key][0], this.scripts[key][1], this.scripts[key][2], this.scripts[key][3], this.sprites[key][4]);
            }
            
            for(var key in this.audio) {
                this.game.load.audio(this.audio[key][0], this.audio[key][1], this.audio[key][2], this.audio[key][3], this.audio[key][4]);
            }
            
        },
        create: function () {
            //	Once the load has finished we disable the crop because we're going to sit in the update loop for a short while as the music decodes
            var logo = this.game.add.sprite(0, 10, 'logo-bandeau');
            logo.scale.setTo(0.5, 0.5);
            
            this.preloadBar.cropEnabled = false;
        },
        update: function () {
            //	You don't actually need to do this, but I find it gives a much smoother game experience.
            //	Basically it will wait for our audio file to be decoded before proceeding to the MainMenu.
            //	You can jump right into the menu if you want and still play the music, but you'll have a few
            //	seconds of delay while the mp3 decodes - so if you need your music to be in-sync with your menu
            //	it's best to wait for it to decode here first, then carry on.

            //	If you don't have any music in your game then put the game.state.start line into the create function and delete
            //	the update function completely.

            if (this.cache.isSoundDecoded('zik') && this.ready == false)
            {
                this.ready = true;
                this.state.start('Menu');
            }

        }
    };

    return Preloader;
});