import { orbitFrameKeys } from './orbit-frame-keys.constant';

import type { OrbitFrame } from '../type/orbit-frame.type';

export const orbitBlendKeys: readonly Exclude<keyof OrbitFrame, 'narrowElevation' | 'narrowSpread' | 'mute'>[] = [
    ...orbitFrameKeys,
    'shortX',
    'shortY',
    'shortDistance',
    'narrowX',
    'narrowY',
    'narrowDistance',
    'narrowDim'
];
