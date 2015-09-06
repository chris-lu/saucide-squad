define([
    'phaser', 'sprites/building', 'sprites/ground', 'sprites/bbq', 'sprites/rescue', 'sprites/jumpers', 'sprites/splash'
], function (Phaser, Building, Ground, Bbq, Rescue, Jumpers, Splash) {
    'use strict';

    function Game(game) {
        var bg, building, arbres, saucisse, platforms, score, scoreText, bbq, sausage, jumpers;
        var windowsArray;
        var nuage1, nuage2;
        var viesHumaines, viesSaucisses;
        var countViesHumaines, countViesSaucisses;
        var firstSwitch = true;
    }

    Game.prototype = {
        constructor: Game,
        create: function () {
            //  We're going to be using physics, so enable the Arcade Physics system
            this.game.physics.startSystem(Phaser.Physics.ARCADE);

            this.setupBackground();
            this.setupActors();
            this.setupForeground();

            this.score = 0;
            this.scoreText = this.game.add.text(10, this.game.height - 46, 'Score: 0', {font: '32px slkscr', fill: '#fff'});

            if (this.game.device.desktop) {
                this.firstSwitch = false;
            }

            this.game.input.onDown.add(this.switchControl, this);

//            var saucisses;

            //  Finally some stars to collect
//            saucisses = this.game.add.group();

            //  We will enable physics for any star that is created in this group
//            saucisses.enableBody = true;

            //  Create a star inside of the 'stars' group
//            this.saucisse = saucisses.create(0, 0, 'saucisse');

            //  This just gives each star a slightly random bounce value
//            this.saucisse.body.bounce.y = 0.7 + Math.random() * 0.2;
//            this.saucisse.body.bounce.x = 0.7 + Math.random() * 0.2;

            /*
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
             
             balcon.inputEnabled = true;
             balcon.events.onInputDown.add(function () {
             balcon.kill();
             }, this);
             
             // Apparition du score
             this.scoreText = this.game.add.text(16, 16, 'score: 0', {fontSize: '32px', fill: '#fff'});
             
             
             //this.game.physics.arcade.collide(this.saucisse, barbecue, this.incrementScore, null, this);
             */
        },
        update: function () {
            //  Collide the player and the stars with the platforms
            this.game.physics.arcade.collide(this.jumpers, this.bbq, this.burn, null, this);
            this.game.physics.arcade.collide(this.jumpers, this.trampoline, this.rescue, null, this);
            this.game.physics.arcade.collide(this.jumpers, this.building.windows, null, this.swwuuiiii);
            this.game.physics.arcade.collide(this.jumpers, this.ground, this.splash, null, this);
            this.updateNuagesPosition();

            /*
             if (this.game.input.activePointer.isDown) {
             if (!this.pointerDown) {
             console.log('is down alors qu on ne l était pas avant');
             this.pointerDown=true;
             if (this.firstSwitch) {
             this.firstSwitch=false;
             } else {
             console.log('SWITCH!');
             this.switchControl();
             }
             }
             } else if (this.pointerDown) {
             console.log('is pas down alors qu on l était avant');
             this.pointerDown=false;
             }
             */
        },
        switchControl: function () {
            if (this.firstSwitch) {
                this.firstSwitch = false;
            } else {
                this.trampoline.active = !this.trampoline.active;
                this.bbq.active = !this.trampoline.active;
            }
        },
        incrementScore: function () {
            //  Add and update the score
            score += 10;
            scoreText.text = 'Score: ' + score;
        },
        setupBackground: function () {
            this.music = this.game.add.audio('zik');
            this.music.loop = true;
            this.music.play();
            this.music.volume = 0.25;

            // background
            this.bg = this.game.add.sprite(0, 0, 'bg');
            this.bg.scale.setTo(0.5, 0.5);

            // nuages
            this.nuage1 = this.game.add.sprite(10, 175, 'nuage1');
            this.nuage1.scale.setTo(0.5, 0.5);
            this.nuage2 = this.game.add.sprite(290, 220, 'nuage2');
            this.nuage2.scale.setTo(0.5, 0.5);

            this.building = new Building(this.game);
            this.ground = new Ground(this.game);
        },
        setupForeground: function () {
            // arbres de devant
            this.arbres = this.game.add.sprite(0, 481, 'arbres');
            this.arbres.scale.setTo(0.5, 0.5);

            // vies
            // 1. on setup les sprites qui affichent les vies
            var scene = this;
            scene.viesHumaines = [];
            var vie1 = this.game.add.sprite(10, 10, 'vie-humaine', 0);
            vie1.scale.setTo(0.5, 0.5);
            scene.viesHumaines.push(vie1);
            var vie2 = this.game.add.sprite(40, 10, 'vie-humaine', 0);
            vie2.scale.setTo(0.5, 0.5);
            scene.viesHumaines.push(vie2);
            var vie3 = this.game.add.sprite(70, 10, 'vie-humaine', 0);
            vie3.scale.setTo(0.5, 0.5);
            scene.viesHumaines.push(vie3);
            scene.viesSaucisses = [];
            var vie4 = this.game.add.sprite(300 - 10, 10, 'vie-saucisse', 0);
            vie4.scale.setTo(0.5, 0.5);
            scene.viesSaucisses.push(vie4);
            var vie5 = this.game.add.sprite(300 - 35, 10, 'vie-saucisse', 0);
            vie5.scale.setTo(0.5, 0.5);
            scene.viesSaucisses.push(vie5);
            var vie6 = this.game.add.sprite(300 - 60, 10, 'vie-saucisse', 0);
            vie6.scale.setTo(0.5, 0.5);
            scene.viesSaucisses.push(vie6);

            // 2. on setup les compteurs de vies
            scene.countViesSaucisses = 3;
            scene.countViesHumaines = 3;

            // 3. on setup les fonctions de désincrémentation des scores sur l'objet Phaser.game qui est accessible de partout et qui possédera une référence vers la scène game dans la fonction.
            this.game.loseSausage = function () {
                if (scene.countViesSaucisses > 0) {
                    scene.countViesSaucisses--;
                    scene.viesSaucisses[scene.countViesSaucisses].frame = 1;
                }
                if (scene.countViesSaucisses == 0) {
                    scene.gameOver();
                }
            };
            this.game.loseHuman = function () {
                if (scene.countViesHumaines > 0) {
                    scene.countViesHumaines--;
                    scene.viesHumaines[scene.countViesHumaines].frame = 1;
                }
                if (scene.countViesHumaines == 0) {
                    scene.gameOver();
                }
            };
        },
        setupActors: function () {
            this.jumpers = new Jumpers(this.game);
            this.bbq = new Bbq(this.game);
            this.trampoline = new Rescue(this.game);
            this.bbq.active = true;
            //this.sausage = new Sausage(this.game, this.building.y);
        },
        gameOver: function () {
            console.log('GAME OVER !');
            this.jumpers.kill();
            var haze = this.add.sprite(0, 0, 'filter-alpha');
            haze.width = this.game.width;
            haze.height = this.game.height;

            var bandeau = this.add.sprite(0, 166, 'game-over');
            bandeau.scale.setTo(0.5, 0.5);
            this.game.add.tween(haze).to({alpha: 1}, 1000, "Quart.easeIn", true);
            this.game.add.tween(bandeau).to({alpha: 1}, 1000, "Quart.easeIn", true);
            this.game.time.events.add(Phaser.Timer.SECOND * 6, this.end, this);
        },
        end: function () {
            this.state.start('Menu');
        },
        updateNuagesPosition: function () {
            this.nuage1.x -= 0.30;
            this.nuage2.x -= 0.42;
            if (this.nuage1.x < -this.nuage1.width)
            {
                this.nuage1.x = this.game.world.width;
            }
            if (this.nuage2.x < -this.nuage2.width)
            {
                this.nuage2.x = this.game.world.width;
            }
        },
        burn: function (bbq, jumper) {
            if (jumper.key == "human") {
                jumper.kill();
                bbq.play('burn', 20);
                bbq.game.loseHuman();
                this.score -= 42;
                this.scoreText.text = 'Score: ' + this.score;

                var cri_human = this.game.add.audio('cri_wilhelm');
                cri_human.play();
            }
            else {
                jumper.stop();
                this.score += 75;

                var cri_saucisse = this.game.add.audio('cri_saucisse');
                cri_saucisse.play();

                this.scoreText.text = 'Score: ' + this.score;

            }
        },
        rescue: function (bbq, jumper) {
            if (jumper.key == "human") {
                jumper.stop();
                this.score += 57;
                this.scoreText.text = 'Score: ' + this.score;
            }
            else {
                jumper.bump();
                this.score -= 1;
                this.scoreText.text = 'Score: ' + this.score;
            }
        },
        swwuuiiii: function (jumper, obj) {
            if (jumper.latestWindow != obj.winType) {
                jumper.changeWindow(obj.winType);
            }
            //console.log(obj);
            return false;
        },
        splash: function (ground, jumper) {
            jumper.kill();
            if (jumper.key == "human") {
                ground.game.loseHuman();
                this.score -= 31;
                this.scoreText.text = 'Score: ' + this.score;
            } else {
                ground.game.loseSausage();
                this.score -= 28;
                this.scoreText.text = 'Score: ' + this.score;
            }
            this.jumpers.add(new Splash(ground.game, jumper.x, ground.y - 10, jumper.key == "human" ? 0 : 1));
        }
    };

    return Game;
});