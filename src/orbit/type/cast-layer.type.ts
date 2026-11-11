import type { BufferAttribute, LineSegments, Points } from 'three';

export interface CastLayer {
    readonly points: Points;
    readonly lines: LineSegments;
    readonly pointPosition: BufferAttribute;
    readonly pointShade: BufferAttribute;
    readonly pointMark: BufferAttribute;
    readonly linePosition: BufferAttribute;
    readonly lineShade: BufferAttribute;
    readonly seed: Float32Array;
}
