import { at } from './at.util';
import { smoothstep } from './smoothstep.util';

import type { CastView } from '../type/cast-view.type';

const feather = 14;

export const readCastClearance = (view: CastView, x: number, y: number, pad: number): number => {
    let nearest = Number.POSITIVE_INFINITY;
    for (let index = 0; index < view.textCount; index += 1) {
        const offset = index * 4;
        const dx = Math.max(at(view.text, offset) - x, x - at(view.text, offset + 2), 0);
        const dy = Math.max(at(view.text, offset + 1) - y, y - at(view.text, offset + 3), 0);
        nearest = Math.min(nearest, Math.hypot(dx, dy));
    }

    return smoothstep((nearest - pad) / feather);
};
