import 'phaser';
import { Matrix } from 'transformation-matrix-js';

import { Game } from './game.js';

var config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 800,
    height: 600,
    scene: {
        preload: preload,
        create: create,
        update: update
    },
    transparent: true
};

var phaserGame = new Phaser.Game(config);
var game = new Game();

function preload() {
    this.load.spritesheet('man', 'assets/man.png', {
        frameWidth: 64,
        frameHeight: 64,
        endFrame: 15
    });
}

function create() {
    this.anims.create({
        key: 'spin',
        frames: this.anims.generateFrameNumbers('man', { start: 0, end: 15, first: 0 }),
        frameRate: 15,
        repeat: -1
    });
    let man;

    game.entities.forEach((entity) => {
        const m = Matrix.from(entity.x, 0, entity.y, 0, 0, 0);
        m.scale(64, 64);
        m.rotate(Math.PI * -0.25);
        m.scaleY(0.5);
        man = this.add.sprite(Math.floor(m.a), Math.floor(m.c), entity.sprite);
    });

    man.anims.play('spin');
}

function update() {

}
