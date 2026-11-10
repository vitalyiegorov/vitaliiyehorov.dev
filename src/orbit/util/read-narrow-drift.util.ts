import { orbitFrames } from '../constant/orbit-frames.constant';

import { readStageMix } from './read-stage-mix.util';

import type { StageBox } from '../type/stage-box.type';

const driftFor = (index: number, stages: readonly StageBox[], scrollY: number, viewportHeight: number): number => {
    const box = stages[index];
    const drift = orbitFrames[index]?.narrowDrift ?? 0;
    if (!box || drift === 0) {
        return 0;
    }

    return (Math.min(Math.max((scrollY + viewportHeight * 0.5 - box.top) / box.height, 0), 1) - 0.5) * drift;
};

export const readNarrowDrift = (stages: readonly StageBox[], stage: number, scrollY: number, viewportHeight: number): number => {
    const { from, to, mix } = readStageMix(stage, stages.length);
    const start = driftFor(from, stages, scrollY, viewportHeight);

    return start + (driftFor(to, stages, scrollY, viewportHeight) - start) * mix;
};
