import type { OrbitRing } from '../type/orbit-ring.type';

export const orbitRings: readonly OrbitRing[] = [
    { radius: 1.45, tiltX: 0.32, tiltZ: -0.18, speed: 0.16, nodes: 7, mobileNodes: 7, scale: 1.7, jitter: 0 },
    { radius: 2.3, tiltX: -0.42, tiltZ: 0.36, speed: -0.1, nodes: 5, mobileNodes: 5, scale: 2.2, jitter: 0 },
    { radius: 3.25, tiltX: 0.18, tiltZ: 0.1, speed: 0.065, nodes: 44, mobileNodes: 20, scale: 0.85, jitter: 0.22 },
    { radius: 4.35, tiltX: -0.12, tiltZ: -0.3, speed: -0.042, nodes: 68, mobileNodes: 28, scale: 0.7, jitter: 0.34 }
];
