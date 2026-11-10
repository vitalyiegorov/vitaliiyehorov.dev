import { at } from './at.util';
import { readCastClearance } from './read-cast-clearance.util';
import { smoothstep } from './smoothstep.util';
import { writeCareerPose } from './write-career-pose.util';
import { writeHiddenPose } from './write-hidden-pose.util';
import { writeMethodPose } from './write-method-pose.util';
import { writeWorkPose } from './write-work-pose.util';

import type { CastDom } from '../type/cast-dom.type';
import type { CastLayer } from '../type/cast-layer.type';
import type { CastPose } from '../type/cast-pose.type';
import type { CastView } from '../type/cast-view.type';

const stagger = 0.35;

const onScreen = (view: CastView, y: number): boolean => y > 0 && y < view.height;

const writeStage = (stage: number, pose: CastPose, view: CastView, dom: CastDom, layer: CastLayer, weight: number): void => {
    const lines = weight ** 3;
    pose.hollow.fill(0);
    if (stage === dom.methodStage) {
        writeMethodPose(pose, view, layer, lines);
    } else if (stage === dom.careerStage) {
        writeCareerPose(pose, view, layer, lines);
    } else if (stage === dom.workStage) {
        writeWorkPose(pose, view, layer, lines);
    } else {
        writeHiddenPose(pose, view);
    }
};

export const updateCast = (
    layer: CastLayer,
    poses: readonly [CastPose, CastPose],
    view: CastView,
    dom: CastDom,
    from: number,
    to: number,
    mix: number
): void => {
    const [start, end] = poses;
    layer.lineShade.array.fill(0);
    writeStage(from, start, view, dom, layer, from === to ? 1 : 1 - mix);
    if (to !== from) {
        writeStage(to, end, view, dom, layer, mix);
    }
    const target = to === from ? start : end;
    const blend = to === from ? 0 : mix;
    const position = layer.pointPosition.array;
    const shade = layer.pointShade.array;
    for (let index = 0; index < start.count; index += 1) {
        const delay = index < 2 ? 0 : at(layer.seed, index * 2 + 1) * stagger;
        let t = smoothstep((blend - delay) / (1 - stagger));
        if (to === dom.careerStage && onScreen(view, at(target.y, index))) {
            t = Math.max(t, smoothstep(blend / 0.25));
        }
        if (from === dom.careerStage && onScreen(view, at(start.y, index))) {
            t = Math.min(t, smoothstep((blend - 0.6) / 0.4));
        }
        const x = at(start.x, index) + (at(target.x, index) - at(start.x, index)) * t;
        const y = at(start.y, index) + (at(target.y, index) - at(start.y, index)) * t;
        const size = at(start.size, index) + (at(target.size, index) - at(start.size, index)) * t;
        const lit = at(start.lit, index) + (at(target.lit, index) - at(start.lit, index)) * t;
        const hollow = at(start.hollow, index) + (at(target.hollow, index) - at(start.hollow, index)) * t;
        let alpha = at(start.alpha, index) + (at(target.alpha, index) - at(start.alpha, index)) * t;
        if (alpha > 0.002 && index !== 1) {
            alpha *= readCastClearance(view, x, y, size * 0.16 + 2);
        }
        position[index * 3] = x;
        position[index * 3 + 1] = y;
        shade[index * 4] = size;
        shade[index * 4 + 1] = alpha;
        shade[index * 4 + 2] = lit;
        shade[index * 4 + 3] = hollow;
    }
    layer.pointPosition.needsUpdate = true;
    layer.pointShade.needsUpdate = true;
    layer.linePosition.needsUpdate = true;
    layer.lineShade.needsUpdate = true;
};
