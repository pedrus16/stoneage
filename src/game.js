import { Entity } from './entity';
import { Terrain } from './terrain';
import { Tree } from './tree';

export class Game {

	constructor(game) {
		const terrainSize = 100;
		new Terrain(game, terrainSize, terrainSize);
		this.entities = [];
		for (let i = 0; i < 100; i++) {
			this.entities.push(new Entity(game, Math.random() * terrainSize, Math.random() * terrainSize));
		}
		for (let i = 0; i < 100; i++) {
			this.entities.push(new Tree(game, Math.floor(Math.random() * terrainSize) + 0.5, Math.floor(Math.random() * terrainSize) + 0.5));
		}
	}

	update(delta) {
		this.entities.forEach((entity) => {
			entity.update(delta);
		});
	}

}