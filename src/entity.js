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
		this.sprite = game.add.sprite(pos[0], pos[1], 'man', 0);
		this.sprite.setOrigin(0.5, 0.875);

		this.currentDest = this.getNextDest();
	}

	update(delta) {
		const deltaDist = [this.currentDest[0] - this.x, this.currentDest[1] - this.y];
		const dist = Math.sqrt(deltaDist[0] * deltaDist[0] + deltaDist[1] * deltaDist[1]);
		const dir = [deltaDist[0] / dist, deltaDist[1] / dist];
		const speed = 3 * delta / 1000;
		this.angle = Math.atan2(dir[1], dir[0]) % (Math.PI * 2);
		if (dist > speed) {
			this.x += dir[0] * speed;
			this.y += dir[1] * speed;
		} else {
			this.x = this.currentDest[0];
			this.y = this.currentDest[1];
			this.currentDest = this.getNextDest();
		}
		if (this.angle >= Math.PI) {
			this.sprite.setFrame(4);
		}
	}

	updateSprite() {
		if (this.sprite) {
			const pos = toIso(this.x, this.y);
			this.sprite.setPosition(pos[0], pos[1]);
		}
	}

	getNextDest() {
		return [Math.random() * 20, Math.random() * 20];
	}

}