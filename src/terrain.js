import { toIso }  from './utils';
import { Tree } from './tree';

export class Terrain {

	constructor(game, width, height) {
		for (let x = 0; x < width; x++) {
			for (let y = 0; y < height; y ++) {
				let pos = toIso(x, y);
			    const sprite = game.add.sprite(pos[0], pos[1], 'grass');
			    sprite.setOrigin(0.5, 0);
			}	
		}

		this.trees = [];
		for (let i = 0; i < 10; i++) {
			this.trees.push(new Tree(game, Math.floor(Math.random() * width), Math.floor(Math.random() * height)));
		}
	}

}