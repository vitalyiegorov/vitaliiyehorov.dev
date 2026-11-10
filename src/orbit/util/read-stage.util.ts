import type { StageBox } from '../type/stage-box.type';

export const readStage = (stages: readonly StageBox[], scrollY: number, viewportHeight: number, maxScroll: number): number => {
    let stage = 0;
    let previousTop = Number.NEGATIVE_INFINITY;
    for (const [index, box] of stages.entries()) {
        const start = Math.max(box.top - viewportHeight * 0.62, previousTop);
        const end = Math.min(box.top - viewportHeight * 0.05, maxScroll);
        if (scrollY >= start) {
            stage = index + Math.min((scrollY - start) / Math.max(end - start, 1), 1);
        }
        previousTop = box.top;
    }

    return stage;
};
