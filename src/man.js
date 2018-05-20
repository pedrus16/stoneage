import { Entity } from './entity';
import { toIso } from './utils';
import { WoodPile } from './wood-pile';

const WALK_SPEED = 2;
const GATHER_TIME = 200;

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
		this.navNode = null;
		this.moving = false;
	}

	update(delta) {
		if (this.resource) {
			this.dropResourceNextTo(this.x, this.y);
		}
		if (this.navNode) {
			this.moving = true;
			this.moveTo(this.navNode.x + 0.5, this.navNode.y + 0.5, delta);
			if (this.x === this.navNode.x  + 0.5 && this.y === this.navNode.y + 0.5) {
				this.findPath(this.target);
			}
		} else {
			this.moving = false;
		}
		if (this.target) {
			if (!this.moving) {
				const deltaDist = [this.target.x - this.x, this.target.y - this.y];
				const dist = Math.sqrt(deltaDist[0] * deltaDist[0] + deltaDist[1] * deltaDist[1]);
				if (dist <= 1 && !this.resource) {
					this.cutTree(this.target, delta);
				}
			}
		} else {
			this.findNextTree();
		}
	}

	findNextTree() {
		this.target = this.game.findClosestEntity(this.x, this.y, 'tree');
		if (this.target) {
			this.findPath(this.target);
		}
	}

	findPath(target) {
		if (!target) { return; }
		const tile = { x: Math.floor(target.x), y: Math.floor(target.y) };
		const path = this.terrain.findPath(Math.floor(this.x), Math.floor(this.y), tile.x, tile.y);
		this.navNode = path.length >= 2 ? { x: path[1][0], y: path[1][1] } : null;
	}

	moveTo(x, y, delta) {
		const deltaDist = [x - this.x, y - this.y];
		const dist = Math.sqrt(deltaDist[0] * deltaDist[0] + deltaDist[1] * deltaDist[1]);
		const dir = [deltaDist[0] / dist, deltaDist[1] / dist];
		const speed = WALK_SPEED * delta * 0.001;
		if (dist > speed) {
			this.x += dir[0] * speed;
			this.y += dir[1] * speed;
			this.angle = Math.atan2(dir[1], dir[0]);
		} else {
			this.x = x;
			this.y = y;
		}
	}

	cutTree(tree, delta) {
		if (tree.wood <= 0) {
			this.target = null;
			return;
		}
		this.gatherTime += delta;
		if (this.gatherTime >= GATHER_TIME) {
			tree.wood -= 1;
			this.resource = 'wood';
			this.gatherTime = 0;
		}
	}

	dropResourceNextTo(x, y) {
		x = Math.floor(x);
		y = Math.floor(y);
		const pileE = this.game.findEntityAt(x + 1, y, 'woodPile');
		const pileW = this.game.findEntityAt(x - 1, y, 'woodPile');
		const pileS = this.game.findEntityAt(x, y + 1, 'woodPile');
		const pileN = this.game.findEntityAt(x, y - 1, 'woodPile');
		let pile = null;
		if (pileE) {
			pile = pileE;
		}
		if (pileW) {
			pile = pileW;
		}
		if (pileS) {
			pile = pileS;
		}
		if (pileN) {
			pile = pileN;
		}
		if (pile) {
			pile.amount += 1;
		} else {
			const emptyTile = this.terrain.findEmptyTileNextTo(x, y);
			if (emptyTile) {
				this.game.entities.push(new WoodPile(this.game, emptyTile.x, emptyTile.y));
				this.terrain.grid.setWalkableAt(emptyTile.x, emptyTile.y, false);
			}
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