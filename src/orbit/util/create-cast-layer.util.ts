import { AdditiveBlending, BufferAttribute, BufferGeometry, DynamicDrawUsage, LineSegments, Points, ShaderMaterial } from 'three';

import { castLineRange } from '../constant/cast-line-range.constant';
import { castLineFragmentShader } from '../shader/cast-line-fragment.shader';
import { castLineVertexShader } from '../shader/cast-line-vertex.shader';
import { castPointFragmentShader } from '../shader/cast-point-fragment.shader';
import { castPointVertexShader } from '../shader/cast-point-vertex.shader';

import { createRandom } from './create-random.util';

import type { CastLayer } from '../type/cast-layer.type';
import type { IUniform } from 'three';

const dynamic = (size: number, itemSize: number): BufferAttribute =>
    new BufferAttribute(new Float32Array(size * itemSize), itemSize).setUsage(DynamicDrawUsage);

export const createCastLayer = (majors: number, dust: number, uniforms: Record<string, IUniform>): CastLayer => {
    const count = 2 + majors + dust;
    const random = createRandom(20260511);
    const seed = new Float32Array(count * 2).map(() => random());
    const kind = new Float32Array(count).fill(0);
    kind[0] = 1;
    kind.fill(2, 2 + majors);

    const pointPosition = dynamic(count, 3);
    const pointShade = dynamic(count, 4);
    const pointGeometry = new BufferGeometry();
    pointGeometry.setAttribute('position', pointPosition);
    pointGeometry.setAttribute('aCast', pointShade);
    pointGeometry.setAttribute('aKind', new BufferAttribute(kind, 1));

    const vertices = castLineRange.total * 2;
    const linePosition = dynamic(vertices, 3);
    const lineShade = dynamic(vertices, 2);
    const lineGeometry = new BufferGeometry();
    lineGeometry.setAttribute('position', linePosition);
    lineGeometry.setAttribute('aShade', lineShade);

    const material = (vertexShader: string, fragmentShader: string): ShaderMaterial =>
        new ShaderMaterial({
            uniforms,
            vertexShader,
            fragmentShader,
            transparent: true,
            depthTest: false,
            depthWrite: false,
            blending: AdditiveBlending
        });
    const lines = new LineSegments(lineGeometry, material(castLineVertexShader, castLineFragmentShader));
    const points = new Points(pointGeometry, material(castPointVertexShader, castPointFragmentShader));
    lines.frustumCulled = false;
    points.frustumCulled = false;
    lines.renderOrder = 1;
    points.renderOrder = 2;

    return { points, lines, pointPosition, pointShade, linePosition, lineShade, seed };
};
