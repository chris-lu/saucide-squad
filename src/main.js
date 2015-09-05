(function () {
    'use strict';

    requirejs.config({
        baseUrl: "src/",
        paths: {
            //  Edit the below path to point to where-ever you have placed the phaser.min.js file
            phaser: '../node_modules/phaser/dist/phaser.min'
        },
        shim: {
            'phaser': {
                exports: 'Phaser'
            }
        }
    });

    require(['phaser', 'scenes/game', 'scenes/boot', 'scenes/preloader', 'scenes/menu'], function (Phaser, Game, Boot, Preloader, Menu) {
        var game = new Phaser.Game('100', '100', Phaser.AUTO, '');

        game.state.add('Boot', Boot, true);
        game.state.add('Preloader', Preloader, false);
        game.state.add('Menu', Menu, false);
        game.state.add('Game', Game, false);

    });
}());