import { castLineRange } from '../constant/cast-line-range.constant';

import { at } from './at.util';
import { readCareerPathX } from './read-career-path-x.util';
import { setCastPoint } from './set-cast-point.util';
import { smoothstep } from './smoothstep.util';
import { writeCastSegment } from './write-cast-segment.util';
import { writeHiddenPose } from './write-hidden-pose.util';

import type { CastLayer } from '../type/cast-layer.type';
import type { CastPose } from '../type/cast-pose.type';
import type { CastView } from '../type/cast-view.type';

const lead = 90;
const merge = 24;

const fadeAt = (y: number, start: number, lastY: number, tail: number): number =>
    smoothstep((y - start) / lead) * (1 - smoothstep((y - lastY) / tail) * 0.9);

export const writeCareerPose = (pose: CastPose, view: CastView, layer: CastLayer, weight: number): void => {
    const count = view.careerCount;
    if (count === 0) {
        writeHiddenPose(pose, view);

        return;
    }
    const nodes = view.careerNodes;
    const firstY = at(nodes, 1);
    const lastY = at(nodes, count * 2 - 1);
    const start = firstY - lead;
    const end = Math.max(view.careerEnd, lastY + 60);
    const tail = Math.max(end - lastY, 1);
    const reading = view.height * 0.64;
    const head = Math.min(Math.max(reading, firstY), end);
    const visible = view.career ? 1 : 0;
    const scale = view.narrow ? 0.78 : 1;
    let gap = Number.POSITIVE_INFINITY;
    for (let index = 0; index < count; index += 1) {
        gap = Math.min(gap, Math.abs(head - at(nodes, index * 2 + 1)));
    }
    const free = smoothstep((gap - merge) / merge);

    setCastPoint(pose, 0, readCareerPathX(view, head), head, 40 * scale, 0.7 * visible * free * fadeAt(head, start, lastY, tail), 1);
    setCastPoint(pose, 1, readCareerPathX(view, head), head, 4, 0, 1);

    for (let index = 0; index < pose.majors; index += 1) {
        const point = index + 2;
        if (index < count) {
            const y = at(nodes, index * 2 + 1);
            const reached = reading - y;
            const lit = smoothstep((reached + 8) / 36);
            const flash = lit * Math.exp(-Math.max(reached, 0) / 160);
            setCastPoint(
                pose,
                point,
                at(nodes, index * 2),
                y,
                14 + (21 * scale * (1.5 + 0.8 * flash) - 14) * lit,
                (0.4 + 0.6 * lit) * visible,
                1
            );
            pose.hollow[point] = 1 - lit;
        } else {
            setCastPoint(pose, point, readCareerPathX(view, lastY), lastY, 4, 0, 1);
        }
    }

    for (let index = 0; index < pose.dust; index += 1) {
        const point = index + 2 + pose.majors;
        const seed = at(layer.seed, point * 2);
        const spin = at(layer.seed, point * 2 + 1);
        const y = start + ((seed + view.time * 0.012) % 1) * (end - start);
        const lit = smoothstep((head - y) / 20 + 0.5);
        const near = Math.exp(-(((y - head) / 55) ** 2)) * free;
        setCastPoint(
            pose,
            point,
            readCareerPathX(view, y) + (spin - 0.5) * 3.5,
            y,
            (2.6 + 2.6 * near) * scale,
            (0.18 + 0.42 * lit + 0.7 * near) * fadeAt(y, start, lastY, tail) * visible,
            0.25 + 0.75 * lit
        );
    }

    const segments = castLineRange.careerSegments;
    let lastX = readCareerPathX(view, start);
    let lastSegmentY = start;
    for (let index = 0; index < segments; index += 1) {
        const y = start + ((index + 1) / segments) * (end - start);
        const x = readCareerPathX(view, y);
        const middle = (y + lastSegmentY) / 2;
        const lit = smoothstep((head - middle) / 12 + 0.5);
        const alpha = (0.16 + 0.5 * lit) * fadeAt(middle, start, lastY, tail) * weight * visible;
        writeCastSegment(layer, castLineRange.career + index, lastX, lastSegmentY, x, y, alpha, lit);
        lastX = x;
        lastSegmentY = y;
    }
};
