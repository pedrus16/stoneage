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
		this.sprite.depth = pos[1];
		this.waiting = false;

		this.currentDest = this.getNextDest();
	}

	update(delta) {
		const deltaDist = [this.currentDest[0] - this.x, this.currentDest[1] - this.y];
		const dist = Math.sqrt(deltaDist[0] * deltaDist[0] + deltaDist[1] * deltaDist[1]);
		const dir = [deltaDist[0] / dist, deltaDist[1] / dist];
		const speed = 3 * delta / 1000;
		this.angle = Math.atan2(dir[1], dir[0]);
		if (dist > speed) {
			this.x += dir[0] * speed;
			this.y += dir[1] * speed;
			this.sprite.setFrame(getFrameFromAngle(this.angle));
		} else {
			this.x = this.currentDest[0];
			this.y = this.currentDest[1];
			if (!this.waiting) {
				this.waiting = true;
				setTimeout(() => {
					this.currentDest = this.getNextDest();	
					this.waiting = false;
				}, 1000 + Math.random() * 1000);	
			}
		}
	}

	updateSprite() {
		if (this.sprite) {
			const pos = toIso(this.x, this.y);
			this.sprite.setPosition(pos[0], pos[1]);
			this.sprite.depth = pos[1];
			// console.log(this.sprite.depth);
		}
	}

	getNextDest() {
		return [Math.random() * 100, Math.random() * 100];
	}

}

function getFrameFromAngle(angle, slices = 8) {
	if (angle >= 0 && angle <= Math.PI) {
		for (let i = 0; i <= slices; i += 2) {
			if ((angle >= i * Math.PI / slices && angle <= (i + 1) * Math.PI / slices) || (angle <= i * Math.PI / slices && angle >= (i - 1) * Math.PI / slices)) {
				return i * 0.5;
			}
		}	
	} else {
		for (let i = -slices; i <= 0; i += 2) {
			if ((angle >= i * Math.PI / slices && angle <= (i + 1) * Math.PI / slices) || (angle <= i * Math.PI / slices && angle >= (i - 1) * Math.PI / slices)) {
				return (i + slices * 2) * 0.5 % slices;
			}
		}	
	}
}