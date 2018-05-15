import { Entity } from './entity';
import { toIso } from './utils';

export class Tree extends Entity {

	set wood(wood) {
		this._wood = wood;
		if (this._wood <= 0) {
			this.destroy();
		}
	}
	get wood() { return this._wood; }

	constructor(game, x, y) {
		super(game, x + 0.5 , y + 0.5);
		const pos = toIso(this.x, this.y);
		this.sprite.destroy();
		this.sprite = game.phaserGame.add.sprite(pos[0], pos[1], 'tree', 0);
		this.sprite.setOrigin(0.5, 0.875);
		this.sprite.depth = pos[1];
		this._wood = 4;
		this.type = 'tree';
	}

}