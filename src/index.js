/**
 * Import Phaser dependencies using `expose-loader`.
 * This makes then available globally and it's something required by Phaser.
 * The order matters since Phaser needs them available before it is imported.
 */

import PIXI from 'expose-loader?PIXI!phaser-ce/build/custom/pixi.js';
import p2 from 'expose-loader?p2!phaser-ce/build/custom/p2.js';
import Phaser from 'expose-loader?Phaser!phaser-ce/build/custom/phaser-split.js';

/**
 * Create a new Phaser game instance.
 * And render a single sprite so we make sure it works.
 */
var logo;
var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });
var map;
var layer;
var player;
var testObj;
var cursors;

function preload() {
  //game.load.image('logo', './assets/images/phaser.png');
  game.load.tilemap('test', './assets/maps/test.json', null, Phaser.Tilemap.TILED_JSON);
  game.load.image('tiles', './assets/images/terrain_atlas.png');
  game.load.spritesheet('testChar', './assets/images/char0.png', 64, 64);
}

function create() {
  cursors = game.input.keyboard.createCursorKeys();
  //logo = game.add.sprite(game.world.centerX, game.world.centerY, 'logo');
  //logo.anchor.setTo(0.5, 0.5);
  game.physics.startSystem(Phaser.Physics.ARCADE);
  testObj = game.add.group();
  testObj.enableBody = true;
  game.stage.backgroundColor = '#787878';
  map = game.add.tilemap('test');
  map.addTilesetImage('terrain_atlas', 'tiles');
  layer = map.createLayer('Kachelebene 1');
  map.createLayer('Kachelebene 2').resizeWorld();
  layer.resizeWorld();
  console.log(game.world.height);
  console.log(game.world.width);
  player = game.add.sprite(132, 150, 'testChar', 151);
  //player.fixedToCamera = true;
  game.physics.arcade.enable(player);
  player.body.collideWorldBounds = true;
  player.animations.add('castUp', [0,1,2,3,4,5,6], 10, true);
  player.animations.add('castLeft', [13,14,15,16,17,18], 10, true);
  player.animations.add('castDown', [25,26,27,28,29,30], 10, true);
  player.animations.add('castRight', [37,38,39,40,41,42], 10, true);
  player.animations.add('walkUp', [104,105,106,107,108,109,110,111,112], 10, true);
  player.animations.add('walkLeft', [117,118,119,120,121,122,123,124,125], 10, true);
  player.animations.add('walkDown', [130,131,132,133,134,135,136,137,138], 10, true);
  player.animations.add('walkRight', [143,144,145,146,147,148,149,150,151], 10, true);
};
var facing = 'up';
function update() {
  //game.world.setBounds(player.x - game.width/2, player.y - game.height/2, game.width, game.height);
  game.camera.x = player.x - game.width/2.2;
  game.camera.y = player.y - game.height/2.2;
  player.body.velocity.x = 0;
  player.body.velocity.y = 0;

  if (cursors.up.isDown && cursors.left.isDown)
  {
    player.body.velocity.y = -100;
    player.body.velocity.x = -100;
    if (facing == 'up')
    {
      player.animations.play('walkUp');
    }
    else if (facing == 'left')
    {
      player.animations.play('walkLeft');
    }

  }
  else if (cursors.up.isDown && cursors.right.isDown)
  {
    player.body.velocity.y = -100;
    player.body.velocity.x = 100;
    if (facing == 'up')
    {
      player.animations.play('walkUp');
    }
    else if (facing == 'right')
    {
      player.animations.play('walkRight');
    }

  }
  if (cursors.down.isDown && cursors.left.isDown)
  {
    player.body.velocity.y = 100;
    player.body.velocity.x = -100;
    if (facing == 'down')
    {
      player.animations.play('walkDown');
    }
    else if (facing == 'left')
    {
      player.animations.play('walkLeft');
    }

  }
  else if (cursors.down.isDown && cursors.right.isDown)
  {
    player.body.velocity.y = 100;
    player.body.velocity.x = 100;
    if (facing == 'down')
    {
      player.animations.play('walkDown');
    }
    else if (facing == 'right')
    {
      player.animations.play('walkRight');
    }

  }
  else if (cursors.left.isDown)
  {
    player.body.velocity.x = -150;
    player.animations.play('walkLeft');
    facing = 'left';
  }
  else if (cursors.right.isDown)
  {
    player.body.velocity.x = 150;
    player.animations.play('walkRight');
    facing = 'right';
  }
  else if (cursors.down.isDown)
  {
    player.body.velocity.y = 150;
    player.animations.play('walkDown');
    facing = 'down';
  }
  else if (cursors.up.isDown)
  {
    player.body.velocity.y = -150;
    player.animations.play('walkUp');
    facing = 'up';
  }


  else
  {
    console.log(facing);
    player.animations.stop();
    switch(facing)
    {
      case 'up':
      player.frame = 104;
      break;
      case 'left':
      player.frame = 117;
      break;
      case 'down':
      player.frame = 130;
      break;
      case 'right':
      player.frame = 143;
      break;
      default:
      console.log('wat');
      break;
    }
  }
  // Disco Disco
  //logo.visible = !logo.visible;
}
