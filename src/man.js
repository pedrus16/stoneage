import { Entity } from './entity';
import { toIso } from './utils';

export class Man extends Entity {

	constructor(game, x, y, terrain) {
		super(game, x, y);
		const pos = toIso(this.x, this.y);
		this.sprite.destroy();
		this.sprite = game.add.sprite(pos[0], pos[1], 'man', 0);
		this.sprite.setOrigin(0.5, 0.875);
		this.sprite.depth = pos[1];
		this.waiting = false;
		this.terrain = terrain;
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
		}
	}

	getNextDest() {
		const tree = this.terrain.trees[0];
		const delta = [tree.x - this.x, tree.y - this.y];
		const dist = Math.sqrt(delta[0] * delta[0] + delta[1] * delta[1]);
		const dir = [delta[0] / dist, delta[1] / dist];

		return [this.x + dir[0] * (dist - 1), this.y + dir[1] * (dist - 1)];
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