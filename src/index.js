import 'phaser';

var config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 800,
    height: 600,
    scene: {
        preload: preload,
        create: create
    }
};

var game = new Phaser.Game(config);

function preload()
{
    this.load.spritesheet('man', 'assets/man.png', {
        frameWidth: 64,
        frameHeight: 64,
        endFrame: 15
    });
}

function create()
{
    this.anims.create({
        key: 'spin',
        frames: this.anims.generateFrameNumbers('man', { start: 0, end: 15, first: 0 }),
        frameRate: 15,
        repeat: -1
    });

    var man = this.add.sprite(400, 300, 'man');
    man.anims.play('spin');
}
