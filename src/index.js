import 'phaser';

import { Game } from './game';

var config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 800,
    height: 640,
    scene: {
        preload: preload,
        create: create,
        update: update
    },
    transparent: true
};

var phaserGame = new Phaser.Game(config);
var game;

function preload() {
    this.load.spritesheet('man', 'assets/man.png', {
        frameWidth: 64,
        frameHeight: 64,
        endFrame: 15
    });
    this.load.image('grass', 'assets/grass.png');
}

function create() {
    game = new Game(this);
}

function update(time, delta) {
    game.update(delta);
}
