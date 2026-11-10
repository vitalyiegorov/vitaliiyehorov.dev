import { orbitFrameKeys } from '../constant/orbit-frame-keys.constant';
import { orbitFrames } from '../constant/orbit-frames.constant';

import type { OrbitFrame } from '../type/orbit-frame.type';

const smooth = (value: number): number => value * value * (3 - 2 * value);

export const blendFrames = (stage: number, target: OrbitFrame): OrbitFrame => {
    const last = orbitFrames.length - 1;
    const position = Math.min(Math.max(stage - 0.5, 0), last);
    const index = Math.min(Math.floor(position), last);
    const from = orbitFrames[index] ?? orbitFrames[0];
    const to = orbitFrames[Math.min(index + 1, last)] ?? from;
    const local = Math.min(Math.max((position - index - 0.12) / 0.76, 0), 1);
    const mix = smooth(local);
    for (const key of orbitFrameKeys) {
        target[key] = from[key] + (to[key] - from[key]) * mix;
    }

    return target;
};
