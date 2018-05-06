import { Entity } from './entity.js';

export class Game {

	constructor() {
		this.entities = [];
		this.entities.push(new Entity(10, 0))
	}

	update() {
		// this.entities[0].x += 0.1;
		// this.entities[0].y += 0.1;
	}

}