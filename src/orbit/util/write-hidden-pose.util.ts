import { setCastPoint } from './set-cast-point.util';

import type { CastPose } from '../type/cast-pose.type';
import type { CastView } from '../type/cast-view.type';

export const writeHiddenPose = (pose: CastPose, view: CastView): void => {
    setCastPoint(pose, 0, view.coreX, view.coreY, view.narrow ? 70 : 120, 0, 1);
    for (let index = 1; index < pose.count; index += 1) {
        setCastPoint(pose, index, view.coreX, view.coreY, 6, 0, 1);
    }
};
