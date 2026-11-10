import { orbitBlendKeys } from '../constant/orbit-blend-keys.constant';
import { orbitFrames } from '../constant/orbit-frames.constant';

import { readStageMix } from './read-stage-mix.util';

import type { OrbitFrame } from '../type/orbit-frame.type';

export const blendFrames = (stage: number, target: OrbitFrame): OrbitFrame => {
    const { from: fromIndex, to: toIndex, mix } = readStageMix(stage, orbitFrames.length);
    const from = orbitFrames[fromIndex] ?? orbitFrames[0];
    const to = orbitFrames[toIndex] ?? from;
    for (const key of orbitBlendKeys) {
        target[key] = from[key] + (to[key] - from[key]) * mix;
    }
    const fromElevation = from.narrowElevation ?? from.elevation;
    const fromSpread = from.narrowSpread ?? from.spread;
    target.narrowElevation = fromElevation + ((to.narrowElevation ?? to.elevation) - fromElevation) * mix;
    target.narrowSpread = fromSpread + ((to.narrowSpread ?? to.spread) - fromSpread) * mix;

    return target;
};
