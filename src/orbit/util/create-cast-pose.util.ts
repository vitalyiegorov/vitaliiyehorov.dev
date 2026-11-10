import type { CastPose } from '../type/cast-pose.type';

export const createCastPose = (majors: number, dust: number): CastPose => {
    const count = 2 + majors + dust;

    return {
        majors,
        dust,
        count,
        x: new Float32Array(count),
        y: new Float32Array(count),
        size: new Float32Array(count),
        alpha: new Float32Array(count),
        lit: new Float32Array(count)
    };
};
