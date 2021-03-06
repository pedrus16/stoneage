import { Man } from './man';
import { Terrain } from './terrain';
import { Tree } from './tree';
import { Stock } from './stock';
import { WoodPile } from './wood-pile';
import { Hut } from './hut';

export class Game {

	constructor(phaserGame) {
		this.phaserGame = phaserGame;
		const terrainSize = 40;
		this.terrain = new Terrain(this, terrainSize, terrainSize);
		this.entities = [];
		// for (let i = 0; i < 10; i++) {
		// 	this.entities.push(new Man(this, Math.random() * terrainSize, Math.random() * terrainSize, this.terrain));
		// }
		this.entities.push(new Man(this, 20.5, 5.5, this.terrain));
		this.entities.push(new Hut(this, 17, 8, this.terrain));
		this.entities.push(new Hut(this, 19, 8, this.terrain));
		this.entities.push(new Hut(this, 21, 8, this.terrain));
		this.entities.push(new Hut(this, 23, 8, this.terrain));
		this.entities.push(new Hut(this, 25, 8, this.terrain));
		// this.entities.push(new Man(this, 25.5, 25.5, this.terrain));
		// this.entities.push(new Man(this, 5.5, 15.5, this.terrain));
		// this.entities.push(new Man(this, 5.5, 16.5, this.terrain));
		// this.entities.push(new Man(this, 7.5, 15.5, this.terrain));
		this.entities = this.entities.concat(this.terrain.trees);
		// this.entities.push(new Stock(this, 10, 10));
	}

	update(delta) {
		this.terrain.update();
		this.entities = this.entities.filter((entity) => !entity.destroyed);
		this.entities.forEach((entity) => {
			entity.update(delta);
		});
	}

	findEntityAt(x, y, type) {
		return this.entities.filter((entity) => !type || entity.type === type)
			.find((entity) => {
				return entity.x >= x && entity.x <= x + 1 && entity.y >= y && entity.y <= y + 1;
			});
	}

	findClosestEntity(x, y, type) {
		return this.entities.filter((entity) => !type || entity.type === type)
			.find((entity) => true);
	}

}