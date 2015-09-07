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

    require(['phaser', 'scenes/game', 'scenes/boot', 'scenes/preloader', 'scenes/menu', 'scenes/credit'], function (Phaser, Game, Boot, Preloader, Menu, Credit) {
        var SAFE_ZONE_WIDTH = 640;
        var SAFE_ZONE_HEIGHT = 1136;
        var game = new Phaser.Game(SAFE_ZONE_WIDTH / 2, SAFE_ZONE_HEIGHT / 2, Phaser.AUTO, 'saucisse');

        game.state.add('Boot', Boot, true);
        game.state.add('Preloader', Preloader, false);
        game.state.add('Menu', Menu, false);
        game.state.add('Credit', Credit, false);
        game.state.add('Game', Game, false);

    });
}());