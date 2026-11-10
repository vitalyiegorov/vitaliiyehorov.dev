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
const cometTail = 34;

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
    const finish = smoothstep((view.height * 1.2 - view.careerEnd) / (view.height * 0.2));
    const base = view.height * 0.62;
    const reading = base + Math.max(lastY + 44 - base, 0) * finish;
    const head = Math.min(Math.max(reading, firstY), end);
    const visible = view.career ? 1 : 0;
    const scale = view.narrow ? 0.78 : 1;
    let gap = Number.POSITIVE_INFINITY;
    for (let index = 0; index < count; index += 1) {
        gap = Math.min(gap, Math.abs(head - at(nodes, index * 2 + 1)));
    }
    const free = smoothstep((gap - merge) / merge) * (1 - finish);
    const comet = visible * free * fadeAt(head, start, lastY, tail);
    const headX = readCareerPathX(view, head);

    setCastPoint(pose, 0, headX, head, 40 * scale, 0, 1);
    setCastPoint(pose, 1, headX, head, 8, comet, 1);

    for (let index = 0; index < pose.majors; index += 1) {
        const point = index + 2;
        if (index < count) {
            const y = at(nodes, index * 2 + 1);
            const lit = smoothstep((reading - y + 8) / 36);
            const next = index + 1 < count ? smoothstep((reading - at(nodes, index * 2 + 3) + 8) / 36) : 0;
            const focus = lit * (1 - next);
            const crown = index === count - 1 ? lit : 0;
            const body = 21 * scale * (1.45 + 0.3 * focus) * (1 + 0.3 * crown);
            setCastPoint(pose, point, at(nodes, index * 2), y, 14 + (body * (1 + 0.5 * crown) - 14) * lit, (0.4 + 0.6 * lit) * visible, 1);
            pose.hollow[point] = 1 - lit;
            pose.focus[point] = focus;
            pose.crown[point] = crown;
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
        const near = Math.exp(-(((y - head) / 40) ** 2)) * free;
        setCastPoint(
            pose,
            point,
            readCareerPathX(view, y) + (spin - 0.5) * 3.5,
            y,
            (2.4 + 0.6 * near) * scale,
            (0.18 + 0.42 * lit + 0.2 * near) * fadeAt(y, start, lastY, tail) * visible,
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

    const pieces = castLineRange.ghost - castLineRange.leaders;
    let tipY = head;
    let tipX = headX;
    for (let index = 0; index < pieces; index += 1) {
        const y = head - ((index + 1) / pieces) * cometTail;
        const x = readCareerPathX(view, y);
        writeCastSegment(layer, castLineRange.leaders + index, tipX, tipY, x, y, 0.85 * (1 - index / pieces) * comet * weight, 1);
        tipX = x;
        tipY = y;
    }
};
