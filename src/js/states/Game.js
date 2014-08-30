// 'use strict';

BasicGame.Game = function(game) {
  this.game = game;
};

BasicGame.Game.prototype = {

  create: function() {
    var that = this;

    // Define movement constants
    this.MAX_SPEED = 500; // pixels/second
    this.ACCELERATION = 1500; // pixels/second/second
    this.DRAG = 600; // pixels/second
    this.GRAVITY = 2600; // pixels/second/second
    this.JUMP_SPEED = -1000; // pixels/second (negative y is up)

    this.game.stage.backgroundColor = '#ffffff';
    // Game init Code here.

    // music
    this.music = this.add.audio('background1');
    this.music2 = this.add.audio('background2');

    // this.music.loop = true;
    this.music.volume = 0.1;
    this.music.onStop.add(function () {
      that.music2.play();
    });

    this.music2.volume = 0.1;
    this.music2.onStop.add(function () {
      that.music.play();
    });

    this.music.play();

    // assets
    this.luBlack   = this.game.add.sprite(200,   0, 'black');
    this.luRainbow = this.game.add.sprite(0  , 400, 'rainbow');
    this.luWolke   = this.game.add.sprite(0  , 50 , 'wolke');
    this.luWolke2  = this.game.add.sprite(500, 30 , 'wolke2');
    this.luWolke22 = this.game.add.sprite(0  , 30 , 'wolke2');

    //  Here we add a new animation called 'run'
    //  We haven't specified any frames because it's using every frame in the texture atlas
    this.luWolke.animations.add('run');
    //  And this starts the animation playing by using its key ("run")
    //  15 is the frame rate (15fps)
    //  true means it will loop when it finishes
    this.luWolke.animations.play('run', 15, true);

    //  Here we add a new animation called 'run'
    //  We haven't specified any frames because it's using every frame in the texture atlas
    this.luWolke2.animations.add('run');
    //  And this starts the animation playing by using its key ("run")
    //  15 is the frame rate (15fps)
    //  true means it will loop when it finishes
    this.luWolke2.animations.play('run', 15, true);
    this.luWolke2.scale.x = 30;

    //  Here we add a new animation called 'run'
    //  We haven't specified any frames because it's using every frame in the texture atlas
    this.luWolke22.animations.add('run');
    //  And this starts the animation playing by using its key ("run")
    //  15 is the frame rate (15fps)
    //  true means it will loop when it finishes
    this.luWolke22.animations.play('run', 15, true);
    this.luWolke22.scale.x = 30;

    this.game.physics.enable(this.luBlack, Phaser.Physics.ARCADE);

    //  Here we add a new animation called 'walk'
    //  Because we didn't give any other parameters it's going to make an animation from all available frames in the 'black' sprite sheet
    this.luBlack.animations.add('walk');
    //  And this starts the animation playing by using its key ("walk")
    //  30 is the frame rate (30fps)
    //  true means it will loop when it finishes
    this.luBlack.animations.play('walk', 6, true);
    // Make player collide with world boundaries so he doesn't leave the stage
    this.luBlack.body.collideWorldBounds = true;
    // Set player minimum and maximum movement speed
    this.luBlack.body.maxVelocity.setTo(this.MAX_SPEED, this.MAX_SPEED); // x, y
    this.luBlack.anchor.setTo(0.5,0.5);

    // Add drag to the player that slows them down when they are not accelerating
    // this.luBlack.body.drag.setTo(this.DRAG, 0); // x, y

    // Since we're jumping we need gravity
    this.game.physics.arcade.gravity.y = this.GRAVITY;

    this.game.physics.enable(this.luRainbow, Phaser.Physics.ARCADE);
    this.luRainbow.body.immovable = true;
    this.luRainbow.body.allowGravity = false;

    // Capture certain keys to prevent their default actions in the browser.
    // This is only necessary because this is an HTML5 game. Games on other
    // platforms may not need code like this.
    this.game.input.keyboard.addKeyCapture([
        Phaser.Keyboard.LEFT,
        Phaser.Keyboard.RIGHT,
        Phaser.Keyboard.UP,
        Phaser.Keyboard.DOWN
    ]);

    // Just for fun, draw some height markers so we can see how high we're jumping
    this.drawHeightMarkers();

    // Show FPS
    this.game.time.advancedTiming = true;
    this.fpsText = this.game.add.text(
        20, 20, '', { font: '16px Arial', fill: '#ffffff' }
    );

  },

  update: function() {
    this.luWolke.x -= 2;

    if (this.luWolke.x < -this.luWolke.width)
    {
        this.luWolke.x = this.game.world.width;
    }

    this.luWolke2.x -= 2;

    if (this.luWolke2.x < -this.luWolke2.width)
    {
        this.luWolke2.x = this.game.world.width;
    }

    this.luWolke22.x -= 2;

    if (this.luWolke22.x < -this.luWolke22.width)
    {
        this.luWolke22.x = this.game.world.width;
    }

    if (this.game.time.fps !== 0) {
        this.fpsText.setText(this.game.time.fps + ' FPS');
    }

    // Collide the luBlack with the ground
    this.game.physics.arcade.collide(this.luBlack, this.luRainbow);

    if (this.leftInputIsActive()) {
        // If the LEFT key is down, set the luBlack velocity to move left
        this.luBlack.body.acceleration.x = -this.ACCELERATION;
        //  And this starts the animation playing by using its key ("walk")
        //  30 is the frame rate (30fps)
        //  true means it will loop when it finishes
        this.luBlack.animations.play('walk', 6, true);
        // Invert scale.x to flip left/right
        this.luBlack.scale.x = -1;
    } else if (this.rightInputIsActive()) {
        // If the RIGHT key is down, set the luBlack velocity to move right
        this.luBlack.body.acceleration.x = this.ACCELERATION;
        //  And this starts the animation playing by using its key ("walk")
        //  30 is the frame rate (30fps)
        //  true means it will loop when it finishes
        this.luBlack.animations.play('walk', 6, true);
        // Invert scale.x to flip left/right
        this.luBlack.scale.x = 1;
    } else {
        this.luBlack.body.acceleration.x = 0;
        this.luBlack.body.velocity.x = 0;
        this.luBlack.animations.stop('walk', true);
    }

    // Set a variable that is true when the luBlack is touching the ground
    var onTheGround = this.luBlack.body.touching.down;

    if (onTheGround && this.upInputIsActive()) {
        // Jump when the luBlack is touching the ground and the up arrow is pressed
        this.luBlack.body.velocity.y = this.JUMP_SPEED;
    }
  },

  // This function draws horizontal lines across the stage
  drawHeightMarkers: function() {
      // Create a bitmap the same size as the stage
      var bitmap = this.game.add.bitmapData(this.game.width, this.game.height);

      // These functions use the canvas context to draw lines using the canvas API
      for(y = this.game.height-32; y >= 64; y -= 32) {
          bitmap.context.beginPath();
          bitmap.context.strokeStyle = 'rgba(255, 255, 255, 0.2)';
          bitmap.context.moveTo(0, y);
          bitmap.context.lineTo(this.game.width, y);
          bitmap.context.stroke();
      }

      this.game.add.image(0, 0, bitmap);
  },

  // This function should return true when the player activates the "go left" control
  // In this case, either holding the right arrow or tapping or clicking on the left
  // side of the screen.
  leftInputIsActive: function() {
      var isActive = false;

      isActive = this.input.keyboard.isDown(Phaser.Keyboard.LEFT);
      isActive |= (this.game.input.activePointer.isDown &&
          this.game.input.activePointer.x < this.game.width/4);

      return isActive;
  },

  // This function should return true when the player activates the "go right" control
  // In this case, either holding the right arrow or tapping or clicking on the right
  // side of the screen.
  rightInputIsActive: function() {
      var isActive = false;

      isActive = this.input.keyboard.isDown(Phaser.Keyboard.RIGHT);
      isActive |= (this.game.input.activePointer.isDown &&
          this.game.input.activePointer.x > this.game.width/2 + this.game.width/4);

      return isActive;
  },

  // This function should return true when the player activates the "jump" control
  // In this case, either holding the up arrow or tapping or clicking on the center
  // part of the screen.
  upInputIsActive: function(duration) {
      var isActive = false;

      isActive = this.input.keyboard.justPressed(Phaser.Keyboard.UP, duration);
      isActive |= (this.game.input.activePointer.justPressed(duration + 1000/60) &&
          this.game.input.activePointer.x > this.game.width/4 &&
          this.game.input.activePointer.x < this.game.width/2 + this.game.width/4);

      return isActive;
  },

  quitGame: function(pointer) {
    //	Stop music, delete sprites, purge caches, free resources, all that good stuff.

    //	Then let's go back to the main menu.
    this.game.state.start('MainMenu');
  }
};
