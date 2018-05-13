import 'phaser';

import { toIso } from './utils';

export class Entity {

	set x(x) {
		this._x = x;
		this.updateSprite();
	}
	get x() { return this._x; }

	set y(y) {
		this._y = y;
		this.updateSprite();
	}
	get y() { return this._y; }

	constructor(game, x, y) {
		this.x = x;
		this.y = y;
		this.angle = 0;
		const pos = toIso(this.x, this.y);
		this.sprite = game.add.sprite(pos[0], pos[1]);
		// this.sprite.setOrigin(0.5, 0.875);
		this.sprite.depth = pos[1];
		this.health = 1;
	}

	update(delta) {
	}

	updateSprite() {
		if (this.sprite) {
			const pos = toIso(this.x, this.y);
			this.sprite.setPosition(pos[0], pos[1]);
			this.sprite.depth = pos[1];
		}
	}

}
