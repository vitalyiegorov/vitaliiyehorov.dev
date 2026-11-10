import { writeCastSegment } from './write-cast-segment.util';

import type { CastLayer } from '../type/cast-layer.type';

export const writeCastEllipse = (
    layer: CastLayer,
    start: number,
    segments: number,
    centerX: number,
    centerY: number,
    radiusX: number,
    radiusY: number,
    tilt: number,
    alpha: number,
    lit: number
): void => {
    const cos = Math.cos(tilt);
    const sin = Math.sin(tilt);
    let lastX = centerX + radiusX * cos;
    let lastY = centerY + radiusX * sin;
    for (let index = 0; index < segments; index += 1) {
        const angle = ((index + 1) / segments) * Math.PI * 2;
        const ex = Math.cos(angle) * radiusX;
        const ey = Math.sin(angle) * radiusY;
        const x = centerX + ex * cos - ey * sin;
        const y = centerY + ex * sin + ey * cos;
        const depth = 0.65 + 0.35 * Math.sin(angle - Math.PI / segments);
        writeCastSegment(layer, start + index, lastX, lastY, x, y, alpha * depth, lit);
        lastX = x;
        lastY = y;
    }
};
