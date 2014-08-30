// 'use strict';

BasicGame.MainMenu = function(game) {
  this.game = game;
  this.music = null;
  this.playButton = null;
};

BasicGame.MainMenu.prototype = {
  create: function() {
    // set up music
    this.music = this.add.audio('background1');
    this.music.loop = true;
    this.music.volume = 0.2;
    this.music.play();

    // background
    this.add.sprite(0, 0, 'titlepage');
    this.playButton = this.add.button(200, 400, 'playButton', this.startGame, this, 'over', 'out', 'over');


		this.game.stage.backgroundColor = '#000042';

    var floor = this.game.add.image(0, this.game.height, 'floor');
    floor.width = 800;
    floor.anchor.y = 1;

    var effect = this.game.make.bitmapData();
    // effect.load('playButton');

    var image = this.game.add.image(this.game.world.centerX, this.game.world.centerY, effect);
    image.anchor.set(0.5);
    image.smoothed = false;

    // this.mask.setTo(0, 0, effect.width, this.game.cache.getImage('raster').height);

    //  Tween the rasters
    // this.game.add.tween(this.mask).to( { y: -(this.mask.height - effect.height) }, 3000, Phaser.Easing.Sinusoidal.InOut, true, 0, 100, true);

    //  Tween the image
    // this.game.add.tween(image.scale).to( { x: 4, y: 4 }, 3000, Phaser.Easing.Quartic.InOut, true, 0, 100, true);
  },

  update: function() {
    // debugger;
    this.playButton.rotation += 0.01;
    // this.music.volume += 0.0001;
  },

  startGame: function(pointer) {
    //this.music.stop();
    this.game.state.start('Game');
  }
};
