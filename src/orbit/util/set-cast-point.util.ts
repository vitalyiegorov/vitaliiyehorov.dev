import type { CastPose } from '../type/cast-pose.type';

export const setCastPoint = (pose: CastPose, index: number, x: number, y: number, size: number, alpha: number, lit: number): void => {
    pose.x[index] = x;
    pose.y[index] = y;
    pose.size[index] = size;
    pose.alpha[index] = alpha;
    pose.lit[index] = lit;
};
