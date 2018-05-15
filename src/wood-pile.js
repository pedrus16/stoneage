import { Entity } from './entity';
import { toIso }  from './utils';

export class WoodPile extends Entity {

	set amount(amount) {
		this._amount = amount;
		this.sprite.setFrame((this._amount - 1) % 16);
	}
	get amount() { return this._amount; }

	constructor(game, x, y, amount =  1) {
		super(game, x + 0.5 , y + 0.5);
		const pos = toIso(this.x, this.y);
		this.sprite.destroy();
		this.sprite = game.phaserGame.add.sprite(pos[0], pos[1], 'logPile', 0);
		this.sprite.setOrigin(0.5, 0.875);
		this.sprite.depth = pos[1];
		this.amount = amount;
		this.type = 'woodPile';
	}

	isFull() {
		return this.amount >= 16;
	}

}