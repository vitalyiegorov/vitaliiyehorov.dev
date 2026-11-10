import { orbitFrameKeys } from '../constant/orbit-frame-keys.constant';
import { orbitFrames } from '../constant/orbit-frames.constant';

import type { OrbitFrame } from '../type/orbit-frame.type';

const smooth = (value: number): number => value * value * (3 - 2 * value);

export const blendFrames = (stage: number, target: OrbitFrame): OrbitFrame => {
    const last = orbitFrames.length - 1;
    const index = Math.min(Math.max(Math.floor(stage), 0), last);
    const from = orbitFrames[Math.max(index - 1, 0)] ?? orbitFrames[0];
    const to = orbitFrames[index] ?? from;
    const mix = smooth(Math.min(Math.max(stage - index, 0), 1));
    for (const key of orbitFrameKeys) {
        target[key] = from[key] + (to[key] - from[key]) * mix;
    }

    return target;
};
