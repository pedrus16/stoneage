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
		this.sprite = game.add.sprite(pos[0], pos[1], 'man');
		this.sprite.setOrigin(0.5, 0.875);

		this.navIndex = 0;
		this.navPoints = [
			[10, 3],
			[12, 1],
			[14, 1],
			[16, 3],
			[16, 5],
			[14, 7],
			[12, 7],
			[10, 5],
		];
		// const lineEnd = toIso(this.x + 1, this.y);
		// this.line = new Phaser.Geom.Line(pos[0], pos[1], lineEnd[0], lineEnd[1]);
		// const graphics = game.add.graphics({ lineStyle: { width: 4, color: 0xaa00aa } });
		// graphics.strokeLineShape(this.line);
	}

	update(delta) {
		const currentDest = this.navPoints[this.navIndex];
		const deltaDist = [currentDest[0] - this.x, currentDest[1] - this.y];
		const dist = Math.sqrt(deltaDist[0] * deltaDist[0] + deltaDist[1] * deltaDist[1]);
		const speed = 3 * delta / 1000;
		if (dist > speed) {
			this.x += deltaDist[0] * (speed / dist);
			this.y += deltaDist[1] * (speed / dist);
		} else {
			this.x = currentDest[0];
			this.y = currentDest[1];
			this.navIndex = (this.navIndex + 1) % this.navPoints.length;
		}
	}

	updateSprite() {
		if (this.sprite) {
			const pos = toIso(this.x, this.y);
			this.sprite.setPosition(pos[0], pos[1]);
		}
	}

}