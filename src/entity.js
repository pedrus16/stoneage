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
		// const lineEnd = toIso(this.x + 1, this.y);
		// this.line = new Phaser.Geom.Line(pos[0], pos[1], lineEnd[0], lineEnd[1]);
		// const graphics = game.add.graphics({ lineStyle: { width: 4, color: 0xaa00aa } });
		// graphics.strokeLineShape(this.line);
	}

	update(delta) {
		const deltaDist = [this.currentDest[0] - this.x, this.currentDest[1] - this.y];
		const dist = Math.sqrt(deltaDist[0] * deltaDist[0] + deltaDist[1] * deltaDist[1]);
		const dir = [deltaDist[0] / dist, deltaDist[1] / dist];
		const speed = 3 * delta / 1000;
		if (dist > speed) {
			this.x += dir[0] * speed;
			this.y += dir[1] * speed;
			// this.angle = Math.atan2(dir[1], dir[0]) % (Math.PI * 2);
		} else {
			this.x = this.currentDest[0];
			this.y = this.currentDest[1];
			// this.currentDest = this.getNextDest();
			// this.angle = Math.atan2(dir[1], dir[0]) % (Math.PI * 2);
		}
		this.angle = this.normalize(this.angle + Math.PI * 0.0005 * delta);
		if (this.angle >= Math.PI * -31/32 || this.angle < (Math.PI * 2) * 33/32) {
			this.sprite.setFrame(4);
		}
		// if (this.angle >= (Math.PI * 2) * 31/32 || this.angle < (Math.PI * 2) * 33/32) {
		// 	this.sprite.setFrame(4);
		// } else if (this.angle >= (Math.PI * 2) * 1/32 && this.angle < (Math.PI * 2) * 3/32) {
		// 	this.sprite.setFrame(3);
		// } else if (this.angle >= (Math.PI * 2) * 3/32 && this.angle < (Math.PI * 2) * 5/32) {
		// 	this.sprite.setFrame(2);
		// } else if (this.angle >= (Math.PI * 2) * 5/32 && this.angle < (Math.PI * 2) * 7/32) {
		// 	this.sprite.setFrame(1);
		// } else if (this.angle >= (Math.PI * 2) * 7/32 && this.angle < (Math.PI * 2) * 9/32) {
		// 	this.sprite.setFrame(0);
		// } else if (this.angle >= (Math.PI * 2) * 9/32 && this.angle < (Math.PI * 2) * 11/32) {
		// 	this.sprite.setFrame(15);
		// } else if (this.angle >= (Math.PI * 2) * 11/32 && this.angle < (Math.PI * 2) * 13/32) {
		// 	this.sprite.setFrame(14);
		// } else if (this.angle >= (Math.PI * 2) * 13/32 && this.angle < (Math.PI * 2) * 15/32) {
		// 	this.sprite.setFrame(13);
		// } else if (this.angle >= (Math.PI * 2) * 15/32 && this.angle < (Math.PI * 2) * 17/32) {
		// 	this.sprite.setFrame(12);
		// } else if (this.angle >= (Math.PI * 2) * 17/32 && this.angle < (Math.PI * 2) * 19/32) {
		// 	this.sprite.setFrame(11);
		// } else if (this.angle >= (Math.PI * 2) * 19/32 && this.angle < (Math.PI * 2) * 21/32) {
		// 	this.sprite.setFrame(10);
		// } else if (this.angle >= (Math.PI * 2) * 21/32 && this.angle < (Math.PI * 2) * 23/32) {
		// 	this.sprite.setFrame(9);
		// } else if (this.angle >= (Math.PI * 2) * 23/32 && this.angle < (Math.PI * 2) * 25/32) {
		// 	this.sprite.setFrame(8);
		// } else if (this.angle >= (Math.PI * 2) * 25/32 && this.angle < (Math.PI * 2) * 27/32) {
		// 	this.sprite.setFrame(7);
		// } else if (this.angle >= (Math.PI * 2) * 27/32 && this.angle < (Math.PI * 2) * 29/32) {
		// 	this.sprite.setFrame(6);
		// } else if (this.angle >= (Math.PI * 2) * 29/32 && this.angle < (Math.PI * 2) * 31/32) {
		// 	this.sprite.setFrame(5);
		// }
		console.log(this.angle);
	}

	updateSprite() {
		if (this.sprite) {
			const pos = toIso(this.x, this.y);
			this.sprite.setPosition(pos[0], pos[1]);
		}
	}

	getNextDest() {
		return [10 + Math.random() * 2, Math.random() * 2];
	}

	normalize(angle) {
		if (angle >= Math.PI) {
			return -angle;
		}
		return angle;
	}

}