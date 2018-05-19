import * as PF from 'pathfinding';

import { toIso }  from './utils';
import { Tree } from './tree';

export class Terrain {

	constructor(game, width, height) {
		this.game = game;
		for (let x = 0; x < width; x++) {
			for (let y = 0; y < height; y ++) {
				let pos = toIso(x, y);
			    const sprite = game.phaserGame.add.sprite(pos[0], pos[1], 'grass');
			    sprite.setOrigin(0.5, 0);
			}	
		}

		this.grid = new PF.Grid(width, height); 

		this.trees = [];
		this.createTree(27, 20);
		this.createTree(20, 20);
		this.createTree(23, 20);

		this.createTree(20, 17);
		this.createTree(21, 17);
		this.createTree(22, 17);
		this.createTree(23, 17);
		this.createTree(24, 17);
		this.createTree(25, 17);
		this.createTree(26, 17);
		this.createTree(27, 17);

		this.finder = new PF.AStarFinder({
			allowDiagonal: true,
			// dontCrossCorners: true
		});
	}

	findPath(startX, startY, endX, endY) {
		let path = [];
		const nearbyTiles = [
			{ x: endX + 1, y: endY },
			{ x: endX - 1, y: endY },
			{ x: endX, y: endY + 1 },
			{ x: endX, y: endY - 1 },
		];
		for (let i = 0; i < nearbyTiles.length; i++) {
			const gridBackup = this.grid.clone();
			const path = this.finder.findPath(startX, startY, nearbyTiles[i].x, nearbyTiles[i].y, this.grid);
			this.grid = gridBackup;
			if (path.length) {
				return path;
				// return PF.Util.smoothenPath(this.grid, path);
			}
		}
		return [];
	}

	findEmptyTileNextTo(x, y) {
		const N = this.grid.isWalkableAt(x, y - 1);
		const S = this.grid.isWalkableAt(x, y + 1);
		const E = this.grid.isWalkableAt(x + 1, y);
		const W = this.grid.isWalkableAt(x - 1, y);
		if (N) {
			return { x: x, y: y - 1 };
		}
		if (S) {
			return { x: x, y: y + 1 };
		}
		if (E) {
			return { x: x + 1, y: y };
		}
		if (W) {
			return { x: x - 1, y: y };
		}
		return null;
	}

	update() {	}

	createTree(x, y) {
		const tree = new Tree(this.game, x, y);
		tree.onDestroy = () => { this.grid.setWalkableAt(x, y, true); };
		this.trees.push(tree);
		this.grid.setWalkableAt(x, y, false);
	}

}