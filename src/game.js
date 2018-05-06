import { Entity } from './entity.js';
import { Terrain } from './terrain';

export class Game {

	constructor(game) {
		new Terrain(game, 20, 20);
		this.entities = [];
		for (let i = 0; i < 10; i++) {
			this.entities.push(new Entity(game, Math.floor(Math.random() * 20), Math.floor(Math.random() * 20)));
		}
	}

	update(delta) {
		// this.entities[0].angle += Math.PI * 0.125;
		// this.entities[0].x += 0.1;
		// this.entities[0].y += 0.1;
		this.entities.forEach((entity) => {
			entity.update(delta);
		});
	}

}