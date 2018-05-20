import 'phaser';

import { Game } from './game';

var config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: window.innerWidth,
    height: window.innerHeight,
    scene: {
        preload: preload,
        create: create,
        update: update
    },
    transparent: false
};

var phaserGame = new Phaser.Game(config);
var game;
var controls;

function preload() {
    this.load.spritesheet('man', 'assets/man.png', {
        frameWidth: 64,
        frameHeight: 64,
        endFrame: 7
    });
    this.load.image('grass', 'assets/grass.png');
    this.load.image('tree', 'assets/tree.png');
    this.load.image('stock', 'assets/stock.png');
    this.load.spritesheet('logPile', 'assets/log-pile.png', {
        frameWidth: 128,
        frameHeight: 128,
        endFrame: 15
    });
    this.load.image('hut', 'assets/hut.png');
}

function create() {
    game = new Game(this);
    this.cameras.main.setBounds(-1600, 0, 3200, 1600);
    //  Camera controls
    var cursors = this.input.keyboard.createCursorKeys();

    var controlConfig = {
        camera: this.cameras.main,
        left: cursors.left,
        right: cursors.right,
        up: cursors.up,
        down: cursors.down,
        acceleration: 0.5,
        drag: 0.01,
        maxSpeed: 1.0
    };

    controls = new Phaser.Cameras.Controls.Smoothed(controlConfig);
}

function update(time, delta) {
    controls.update(delta);
    game.update(delta);
}
