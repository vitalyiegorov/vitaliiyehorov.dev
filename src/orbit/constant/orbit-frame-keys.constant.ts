import type { OrbitFrame } from '../type/orbit-frame.type';

export const orbitFrameKeys: readonly Exclude<keyof OrbitFrame, 'narrowElevation' | 'narrowSpread'>[] = [
    'x',
    'y',
    'distance',
    'elevation',
    'yaw',
    'spread',
    'line',
    'core',
    'lit',
    'pulse',
    'rings',
    'links',
    'coreGlow',
    'coreScale',
    'dim'
];
