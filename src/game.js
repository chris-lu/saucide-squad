define([
    'phaser'
], function (Phaser) { 
    'use strict';

    function Game() {
		var saucisse, platforms;
    }
    
    Game.prototype = {
        constructor: Game,

        start: function() {
            this.game = new Phaser.Game('100', '100', Phaser.AUTO, '', { 
                preload: this.preload, 
                create: this.create ,
				update: this.update 
            });
        },

        preload: function() {
            this.game.load.image('logo', 'assets/title.png');
            this.game.load.image('saucisse', 'assets/saucisse.png');
			this.game.load.image('sol', 'assets/plateforme.png');
        },
        
        create: function() {
			//  We're going to be using physics, so enable the Arcade Physics system
			this.game.physics.startSystem(Phaser.Physics.ARCADE);			
			
            var logo = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'logo');
            logo.anchor.setTo(0.5, 0.5);
			
			var saucisses;
			//  Finally some stars to collect
			saucisses = this.game.add.group();

			//  We will enable physics for any star that is created in this group
			saucisses.enableBody = true;
			
			//  Create a star inside of the 'stars' group
			this.saucisse = saucisses.create(0, 0, 'saucisse');

			//  Let gravity do its thing
			this.saucisse.body.gravity.y = 300;

			//  This just gives each star a slightly random bounce value
			this.saucisse.body.bounce.y = 0.7 + Math.random() * 0.2;
			
			// SOL ET BALCONS
			
			//  The platforms group contains the ground and the 2 ledges we can jump on
			this.platforms = this.game.add.group();
			
			//  We will enable physics for any object that is created in this group
			this.platforms.enableBody = true;
			
		   // Here we create the ground.
			var sol = this.platforms.create(0, this.game.world.height - 32, 'sol');

			//  Scale it to fit the width of the game (the original sprite is 400x32 in size)
			sol.scale.setTo(100, 1);

			//  This stops it from falling away when you jump on it
			sol.body.immovable = true;
			
			//  Now let's create two ledges
			var balcon = this.platforms.create(100, 400, 'sol');
			balcon.body.immovable = true;

			balcon = this.platforms.create(-150, 250, 'sol');
			balcon.body.immovable = true;
			
			var score;
			//  The score
			score = this.game.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#fff' });
			
			// Affichage nouvelle saucise toutes les 5 secondes
			setInterval(this.saucisse, 5000 );
        },
		
		update: function() {
			//  Collide the player and the stars with the platforms
			this.game.physics.arcade.collide(this.saucisse, this.platforms);
		}
    };
    
    return Game;
});