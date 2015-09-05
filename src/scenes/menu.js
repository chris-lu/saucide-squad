define([
    'phaser'
], function (Phaser) {
    'use strict';

    function Menu(game) {
        this.music = null;
        this.playButton = null;
    }

    Menu.prototype = {
        constructor: Menu,
        create: function () {
            //	We've already preloaded our assets, so let's kick right into the Main Menu itself.
            //	Here all we're doing is playing some music and adding a picture and button
            //	Naturally I expect you to do something significantly better :)

            //this.music = this.add.audio('titleMusic');
            //this.music.play();

            //this.add.sprite(0, 0, 'logo');

            //this.playButton = this.add.button(400, 600, 'logo', this.startGame, this);
            this.playButton = this.add.button('30', 80, 'plateforme', this.startGame, this);

            var test;
            //  The score
            test = this.game.add.text(16, 16, 'menu', {fontSize: '32px', fill: '#fff'});
        },
        update: function () {

        },
        startGame: function (pointer) {
            //	Ok, the Play Button has been clicked or touched, so let's stop the music (otherwise it'll carry on playing)
            //this.music.stop();

            //	And start the actual game
            this.state.start('Game');

        }
    };

    return Menu;
});