import { readStageMix } from './read-stage-mix.util';

import type { StageBox } from '../type/stage-box.type';

const coverRange = 0.11;

const fadeFor = (box: StageBox | undefined, coreY: number, viewportHeight: number): number => {
    if (!box?.cover) {
        return 1;
    }
    const top = box.cover.getBoundingClientRect().top;
    const value = Math.min(Math.max((top - coreY) / (viewportHeight * coverRange), 0), 1);

    return value * value * (3 - 2 * value);
};

export const readCoverFade = (stages: readonly StageBox[], stage: number, coreY: number, viewportHeight: number): number => {
    const { from, to, mix } = readStageMix(stage, stages.length);
    const start = fadeFor(stages[from], coreY, viewportHeight);

    return start + (fadeFor(stages[to], coreY, viewportHeight) - start) * mix;
};
