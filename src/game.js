import { Entity } from './entity.js';
import { Terrain } from './terrain';

export class Game {

	constructor(game) {
		new Terrain(game, 100, 100);
		this.entities = [];
		this.entities.push(new Entity(game, 10, 5))
	}

	update(delta) {
		// this.entities[0].angle += Math.PI * 0.125;
		// this.entities[0].x += 0.1;
		// this.entities[0].y += 0.1;
		this.entities.forEach((entity) => entity.update(delta));
	}

}