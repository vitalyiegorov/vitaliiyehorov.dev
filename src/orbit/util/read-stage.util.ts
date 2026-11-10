import type { StageBox } from '../type/stage-box.type';

export const readStage = (stages: readonly StageBox[], scrollY: number, viewportHeight: number): number => {
    const focus = scrollY + viewportHeight * 0.5;
    for (const [index, stage] of stages.entries()) {
        if (focus < stage.top + stage.height) {
            return index + Math.max(0, (focus - stage.top) / stage.height);
        }
    }

    return stages.length;
};
