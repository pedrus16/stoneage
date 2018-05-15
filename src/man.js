import { Entity } from './entity';
import { toIso } from './utils';
import { WoodPile } from './wood-pile';

const GATHER_SPEED = 1000;

export class Man extends Entity {

	set angle(angle) {
		this._angle = angle;
		if (!this.sprite) { return; }
		this.sprite.setFrame(getFrameFromAngle(this.angle));
	}
	get angle() { return this._angle; }

	constructor(game, x, y, terrain) {
		super(game, x, y);
		const pos = toIso(this.x, this.y);
		this.sprite.destroy();
		this.sprite = game.phaserGame.add.sprite(pos[0], pos[1], 'man', 0);
		this.sprite.setOrigin(0.5, 0.875);
		this.sprite.depth = pos[1];
		this.terrain = terrain;
		this.gatherTime = 0;
		this.type = 'man';
		this.target = null;
	}

	update(delta) {
		if (this.resource) {
			this.dropResourceAt(this.x + 1, this.y);
		}
		if (this.target) {
			this.moveToTarget(delta);
			const deltaDist = [this.target.x - this.x, this.target.y - this.y];
			const dist = Math.sqrt(deltaDist[0] * deltaDist[0] + deltaDist[1] * deltaDist[1]);
			if (dist <= 1 && !this.resource) {
				this.cutTree(this.target, delta);
			}
		} else {
			this.findNextTree();
		}
	}

	findNextTree() {
		this.target = this.game.findClosestEntity(this.x, this.y, 'tree');
	}

	moveTo(x, y, delta) {
		const deltaDist = [x - this.x, y - this.y];
		const dist = Math.sqrt(deltaDist[0] * deltaDist[0] + deltaDist[1] * deltaDist[1]);
		const dir = [deltaDist[0] / dist, deltaDist[1] / dist];
		const speed = 3 * delta * 0.001;
		if (dist > speed) {
			this.x += dir[0] * speed;
			this.y += dir[1] * speed;
			this.angle = Math.atan2(dir[1], dir[0]);
		} else {
			this.x = x;
			this.y = y;
		}
	}

	moveToTarget(delta) {
		const deltaDist = [this.target.x - this.x, this.target.y - this.y];
		const dist = Math.sqrt(deltaDist[0] * deltaDist[0] + deltaDist[1] * deltaDist[1]);
		const dir = [deltaDist[0] / dist, deltaDist[1] / dist];
		this.moveTo(this.x + dir[0] * (dist - 0.9), this.y + dir[1] * (dist - 0.9), delta);
		return dist;
	}

	cutTree(tree, delta) {
		if (tree.wood <= 0) {
			this.target = null;
			return;
		}
		this.gatherTime += delta;
		if (this.gatherTime >= GATHER_SPEED) {
			tree.wood -= 1;
			this.resource = 'wood';
			this.gatherTime = 0;
		}
	}

	dropResourceAt(x, y) {
		x = Math.floor(x);
		y = Math.floor(y);
		const pile = this.game.findEntityAt(x, y, 'woodPile');
		if (pile) {
			pile.amount += 1;
		} else {
			this.game.entities.push(new WoodPile(this.game, x, y));
		}
		this.resource = null;
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