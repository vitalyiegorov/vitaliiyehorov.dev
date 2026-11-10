interface StageMix {
    readonly from: number;
    readonly to: number;
    readonly mix: number;
}

export const readStageMix = (stage: number, count: number): StageMix => {
    const index = Math.min(Math.max(Math.floor(stage), 0), Math.max(count - 1, 0));
    const progress = Math.min(Math.max(stage - index, 0), 1);

    return { from: Math.max(index - 1, 0), to: index, mix: progress * progress * (3 - 2 * progress) };
};
