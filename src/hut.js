import { Entity } from './entity';
import { toIso } from './utils';

export class Hut extends Entity {

	constructor(game, x, y, terrain) {
		super(game, Math.floor(x), Math.floor(y));
		const pos = toIso(this.x, this.y);
		this.sprite.destroy();
		this.sprite = game.phaserGame.add.sprite(pos[0], pos[1], 'hut', 0);
		this.sprite.setOrigin(0.5, 0.875);
		this.sprite.depth = pos[1];
		terrain.grid.setWalkableAt(this.x, this.y, false);
		terrain.grid.setWalkableAt(this.x - 1, this.y, false);
		terrain.grid.setWalkableAt(this.x, this.y - 1, false);
		terrain.grid.setWalkableAt(this.x - 1, this.y - 1, false);
	}

}