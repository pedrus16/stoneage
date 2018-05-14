import { Entity } from './entity';
import { toIso } from './utils';
import { WoodPile } from './wood-pile';

export class Stock extends Entity {

	constructor(game, x, y) {
		super(game, x , y);
		const pos = toIso(this.x, this.y);
		this.sprite.destroy();
		this.sprite = game.add.sprite(pos[0], pos[1], 'stock', 0);
		this.sprite.setOrigin(0.5, 0);
		this.sprite.depth = pos[1];
		this.slots = [null, null, null, null, null, null, null, null, null];
	}

}