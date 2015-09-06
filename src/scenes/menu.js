define([
    'phaser','sprites/window'
], function (Phaser, Window) {
    'use strict';

    function Menu(game) {
        this.music = null;
        this.clic = null;
        this.playButton = null;
    }

    Menu.prototype = {
        constructor: Menu,
        create: function () {
            //	We've already preloaded our assets, so let's kick right into the Main Menu itself.
            
            // background
            var bg = this.game.add.sprite(0, 0, 'bg');
            bg.scale.setTo(0.5, 0.5);
            
            // nuages
            var nuage1 = this.game.add.sprite(10, 175, 'nuage1');
            nuage1.scale.setTo(0.5, 0.5);
            var nuage2 = this.game.add.sprite(290, 220, 'nuage2');
            nuage2.scale.setTo(0.5, 0.5);
            
            // immeuble
            var building = this.game.add.sprite(73,155,'building');
            building.scale.setTo(0.5, 0.5);
            
            // fenetres de l'immeuble
            var wType = [
                [4,6,7],
                [2,3,2],
                [2,3,1],
                [2,5,2],
                [4,0,7],
            ];
            
            for (var i=0; i < 5; i++) {
                for (var j=0; j < 3; j++) {
                    if (!(i==4 && j==1)) {
                        new Window(this.game,112 + j*60, 200 + i*60, wType[i][j]);
                    }
                }
            }

            
            
            

            this.music = this.game.add.audio('zik-intro');
            this.music.loop=true;
            this.music.play();
            this.music.volume=0.25;
            
            this.clic = this.game.add.audio('clic');
            
            
            var so = this.add.sprite(128, 60, 'sausage',3);
            so.scale.setTo(0.5, 0.5)
            
            var bob = this.add.sprite(172, 46, 'human',0);
            bob.scale.setTo(0.5, 0.5)
            
            // arbres de devant
            var arbres = this.game.add.sprite(0,481,'arbres');
            arbres.scale.setTo(0.5, 0.5);

            var haze = this.add.sprite(0, 0, 'filter-alpha');
            haze.width = this.game.width;
            haze.height = this.game.height;
            
            var bandeau = this.add.sprite(0, 166, 'logo-bandeau');
            bandeau.scale.setTo(0.5, 0.5)

            //this.playButton = this.add.button(400, 600, 'logo', this.startGame, this);
            this.playButton = this.add.button(114, 416, 'play-spritesheet', this.startGame, this, 0, 0, 1);
            this.playButton.scale.setTo(0.5, 0.5);
            
        },
        update: function () {
            // à virer quand on voudra vraiment le menu du cul
            // this.state.start('Game');
        },
        startGame: function (pointer) {
            //	Ok, the Play Button has been clicked or touched, so let's stop the music (otherwise it'll carry on playing)
            this.music.stop();
            this.clic.play();

            //	And start the actual game
            this.state.start('Game');

        }
    };

    return Menu;
});