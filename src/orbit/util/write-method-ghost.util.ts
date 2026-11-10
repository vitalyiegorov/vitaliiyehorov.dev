import { castLineRange } from '../constant/cast-line-range.constant';

import { at } from './at.util';
import { setCastPoint } from './set-cast-point.util';
import { writeCastEllipse } from './write-cast-ellipse.util';
import { writeCastSegment } from './write-cast-segment.util';

import type { CastLayer } from '../type/cast-layer.type';
import type { CastPose } from '../type/cast-pose.type';
import type { CastView } from '../type/cast-view.type';

const tau = Math.PI * 2;
const dots = 8;
const shape = 24;
const ghostAlpha = 0.3;

export const writeMethodGhost = (pose: CastPose, view: CastView, layer: CastLayer, weight: number, tilt: number, cap: number): void => {
    const slots = Math.min(view.methodSlotCount, 3);
    const active = Math.min(Math.round(view.methodProgress), slots - 1);
    const firstDot = 2 + pose.majors + pose.dust - slots * dots;
    for (let slot = 0; slot < 3; slot += 1) {
        const start = castLineRange.ghost + slot * castLineRange.ghostSegments;
        const shown = slot < slots && view.method ? ghostAlpha * (slot === active ? 1 - view.methodFade : 1) : 0;
        const cx = at(view.methodSlots, slot * 4);
        const cy = at(view.methodSlots, slot * 4 + 1);
        const radius = at(view.methodSlots, slot * 4 + 3) * 0.45;
        const stretch = Math.min((at(view.methodSlots, slot * 4 + 2) * 0.47) / Math.max(radius, 1), cap);
        const reach = slot === 0 ? 0.86 : 0.92;
        const rx = radius * (slot === 1 ? 1 : reach) * stretch;
        const ry = radius * (slot === 1 ? 0.62 : reach * tilt);
        if (slot === 1) {
            for (let ray = 0; ray < shape; ray += 1) {
                const angle = (ray / dots) * tau + 0.35;
                const live = ray < dots - 1 ? shown * weight : 0;
                writeCastSegment(layer, start + ray, cx, cy, cx + Math.cos(angle) * rx, cy + Math.sin(angle) * ry, live, 0.7);
            }
        } else {
            writeCastEllipse(layer, start, shape, cx, cy, rx, ry, 0, shown * weight * 1.4, 0.85);
        }
        writeCastEllipse(layer, start + shape, castLineRange.ghostSegments - shape, cx, cy, 9, 9, 0, shown * weight * 1.6, 1);
        if (slot >= slots) {
            continue;
        }
        for (let index = 0; index < dots; index += 1) {
            const angle = slot === 1 ? (index / dots) * tau + 0.35 : (index / dots) * tau + view.time * 0.05;
            const live = slot === 1 && index === dots - 1 ? 0 : shown;
            setCastPoint(
                pose,
                firstDot + slot * dots + index,
                cx + Math.cos(angle) * rx,
                cy + Math.sin(angle) * ry,
                view.narrow ? 11 : 13,
                live * 3,
                0.8
            );
        }
    }
};
