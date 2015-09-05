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
 
    require(['phaser', 'gamescene', 'boot', 'preloader','menu'], function (Phaser, GameScene, Boot, Preloader, Menu) {
        var game = new Phaser.Game('100', '100', Phaser.AUTO, '');
        
        game.state.add('Boot', Boot);
		game.state.add('Preloader', Preloader);
		game.state.add('Menu', Menu);
		game.state.add('GameScene', GameScene);
		
        game.state.start('Boot');
    });
}());