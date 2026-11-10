import { castLineRange } from '../constant/cast-line-range.constant';

import { at } from './at.util';
import { setCastPoint } from './set-cast-point.util';
import { writeCastEllipse } from './write-cast-ellipse.util';
import { writeCastSegment } from './write-cast-segment.util';

import type { CastLayer } from '../type/cast-layer.type';
import type { CastPose } from '../type/cast-pose.type';
import type { CastView } from '../type/cast-view.type';

const tau = Math.PI * 2;
const orbitRadius = [0.4, 0.69, 0.97] as const;
const orbitTilt = [-0.2, 0.13, -0.06] as const;
const orbitSquash = 0.42;
const projectOrbit = [2, 1, 0, 2, 1, 2] as const;
const projectPhase = [4.3, 3.78, 3.25, 2.92, 2.4, 1.95] as const;

const orbitX = (cx: number, radius: number, angle: number, tilt: number): number =>
    cx + Math.cos(angle) * radius * Math.cos(tilt) - Math.sin(angle) * radius * orbitSquash * Math.sin(tilt);

const orbitY = (cy: number, radius: number, angle: number, tilt: number): number =>
    cy + Math.cos(angle) * radius * Math.sin(tilt) + Math.sin(angle) * radius * orbitSquash * Math.cos(tilt);

const writeFleet = (pose: CastPose, view: CastView, layer: CastLayer, weight: number): void => {
    const { workX: cx, workY: cy, time } = view;
    const reach = Math.min(view.workWidth * 0.46, view.workHeight * 1.1);
    const active = view.workActive;
    setCastPoint(pose, 0, cx, cy, 150, 0.95, 1);

    for (let index = 0; index < pose.majors; index += 1) {
        const point = index + 2;
        if (index < view.workCount) {
            const orbit = projectOrbit[index % projectOrbit.length] ?? 0;
            const angle = (projectPhase[index % projectPhase.length] ?? 0) + Math.sin(time * 0.22 + index * 1.3) * 0.05;
            const radius = (orbitRadius[orbit] ?? 1) * reach;
            const tilt = orbitTilt[orbit] ?? 0;
            const depth = Math.sin(angle);
            const glow = at(view.workGlow, index);
            setCastPoint(
                pose,
                point,
                orbitX(cx, radius, angle, tilt),
                orbitY(cy, radius, angle, tilt),
                18 * (0.9 + 0.15 * depth) * (1 + 0.8 * glow),
                Math.min(0.72 + 0.1 * depth + 0.4 * glow, 1),
                0.1 + 0.9 * glow
            );
        } else {
            const orbit = index % 3;
            const angle = at(layer.seed, point * 2) * tau + time * 0.04;
            const radius = (orbitRadius[orbit] ?? 1) * reach;
            const tilt = orbitTilt[orbit] ?? 0;
            setCastPoint(pose, point, orbitX(cx, radius, angle, tilt), orbitY(cy, radius, angle, tilt), 7, 0.32, 0.3);
        }
    }

    for (let index = 0; index < pose.dust; index += 1) {
        const point = index + 2 + pose.majors;
        const orbit = index % 3;
        const angle = at(layer.seed, point * 2) * tau + time * (0.05 + orbit * 0.02);
        const radius = ((orbitRadius[orbit] ?? 1) + (at(layer.seed, point * 2 + 1) - 0.5) * 0.04) * reach;
        const tilt = orbitTilt[orbit] ?? 0;
        setCastPoint(pose, point, orbitX(cx, radius, angle, tilt), orbitY(cy, radius, angle, tilt), 2.4, 0.2, 0.35);
    }

    const activeOrbit = active >= 0 ? (projectOrbit[active % projectOrbit.length] ?? -1) : -1;
    for (let orbit = 0; orbit < orbitRadius.length; orbit += 1) {
        const radius = (orbitRadius[orbit] ?? 1) * reach;
        const lift = orbit === activeOrbit ? 0.08 * at(view.workGlow, active) : 0;
        writeCastEllipse(
            layer,
            castLineRange.work + orbit * castLineRange.workSegments,
            castLineRange.workSegments,
            cx,
            cy,
            radius,
            radius * orbitSquash,
            orbitTilt[orbit] ?? 0,
            (0.09 + lift) * weight,
            0.3 + lift * 6
        );
    }

    const tipY = active >= 0 ? at(view.workTitles, active) : cy;
    const tipX = view.workEdge + 22;
    setCastPoint(pose, 1, tipX, tipY, 9, active >= 0 ? 0.95 * at(view.workGlow, active) : 0, 1);
    for (let index = 0; index < castLineRange.total - castLineRange.leaders; index += 1) {
        const point = index + 2;
        const glow = index < view.workCount ? at(view.workGlow, index) : 0;
        writeCastSegment(
            layer,
            castLineRange.leaders + index,
            at(pose.x, point),
            at(pose.y, point),
            tipX,
            at(view.workTitles, index),
            0.55 * glow * weight,
            1
        );
    }
};

const writeStrip = (pose: CastPose, view: CastView, layer: CastLayer, weight: number): void => {
    const x = view.workEdge - 24;
    const cy = view.height * 0.5;
    const spanY = view.height * 0.3;
    const spanX = 9;
    const { time } = view;
    setCastPoint(pose, 0, x, cy, 50, 0.75, 1);
    setCastPoint(pose, 1, x, cy, 4, 0, 1);

    for (let index = 0; index < pose.majors; index += 1) {
        const point = index + 2;
        if (index < view.workCount) {
            const slot = -0.8 + (index * 1.6) / Math.max(view.workCount - 1, 1);
            const glow = at(view.workGlow, index);
            setCastPoint(
                pose,
                point,
                x + (index % 2 === 0 ? -1 : 1) * spanX * Math.sqrt(1 - slot * slot),
                cy + slot * spanY,
                14 * (1 + 0.9 * glow),
                0.7 + 0.3 * glow,
                0.15 + 0.85 * glow
            );
        } else {
            const angle = at(layer.seed, point * 2) * tau + time * 0.04;
            setCastPoint(pose, point, x + Math.cos(angle) * spanX * 1.7, cy + Math.sin(angle) * spanY * 1.12, 5, 0.22, 0.3);
        }
    }

    for (let index = 0; index < pose.dust; index += 1) {
        const point = index + 2 + pose.majors;
        const angle = at(layer.seed, point * 2) * tau + time * 0.06;
        setCastPoint(pose, point, x + Math.cos(angle) * spanX, cy + Math.sin(angle) * spanY * 1.04, 2.2, 0.2, 0.35);
    }

    writeCastEllipse(layer, castLineRange.work, castLineRange.workSegments, x, cy, spanX, spanY * 1.04, 0, 0.12 * weight, 0.3);
};

export const writeWorkPose = (pose: CastPose, view: CastView, layer: CastLayer, weight: number): void => {
    if (view.workWidth > 0) {
        writeFleet(pose, view, layer, weight);
    } else {
        writeStrip(pose, view, layer, weight);
    }
};
