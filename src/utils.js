import { Matrix } from 'transformation-matrix-js';

export function toIso(x, y) {
    const m = Matrix.from(x, 0, y, 0, 0, 0);
    m.scale(32, 32);
    m.skewDeg(45, -45);
    m.scaleY(0.5);

    return [Math.round(m.a), Math.round(m.c)];
}