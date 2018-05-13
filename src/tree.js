import { toIso } from './utils';

import { Entity } from './entity';

export class Tree extends Entity {

	constructor(game, x, y) {
		super(game, x , y);
		const pos = toIso(this.x, this.y);
		this.sprite.destroy();
		this.sprite = game.add.sprite(pos[0], pos[1], 'tree', 0);
		this.sprite.setOrigin(0.5, 0.875);
	}

	update() {

	}

}