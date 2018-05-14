import { Man } from './man';
import { Terrain } from './terrain';
import { Tree } from './tree';
import { Stock } from './stock';
import { WoodPile } from './wood-pile';

export class Game {

	constructor(game) {
		const terrainSize = 40;
		this.terrain = new Terrain(game, terrainSize, terrainSize);
		this.entities = [];
		// for (let i = 0; i < 10; i++) {
		// 	this.entities.push(new Man(game, Math.random() * terrainSize, Math.random() * terrainSize, this.terrain));
		// }
		this.entities.push(new Man(game, 20, 15, this.terrain));
		// this.entities.push(new Stock(game, 10, 10));
	}

	update(delta) {
		this.entities.forEach((entity) => {
			entity.update(delta);
		});
	}

}