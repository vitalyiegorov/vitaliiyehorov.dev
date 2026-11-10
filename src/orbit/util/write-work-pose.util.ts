import { castLineRange } from '../constant/cast-line-range.constant';

import { at } from './at.util';
import { setCastPoint } from './set-cast-point.util';
import { smoothstep } from './smoothstep.util';
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
const stripInset = 25;
const stripReach = 28;

const orbitX = (cx: number, radius: number, angle: number, tilt: number): number =>
    cx + Math.cos(angle) * radius * Math.cos(tilt) - Math.sin(angle) * radius * orbitSquash * Math.sin(tilt);

const orbitY = (cy: number, radius: number, angle: number, tilt: number): number =>
    cy + Math.cos(angle) * radius * Math.sin(tilt) + Math.sin(angle) * radius * orbitSquash * Math.cos(tilt);

const writeFleet = (pose: CastPose, view: CastView, layer: CastLayer, weight: number): void => {
    const { workX: cx, workY: cy, time } = view;
    const reach = Math.min(view.workWidth * 0.535, view.workHeight * 1.25);
    const active = view.workActive;
    setCastPoint(pose, 0, cx, cy, 170, 1, 1);

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
                20 * (0.9 + 0.15 * depth) * (1 + 0.8 * glow),
                Math.min(0.85 + 0.1 * depth + 0.4 * glow, 1),
                0.1 + 0.9 * glow
            );
            pose.focus[point] = smoothstep((at(pose.lit, point) - 0.55) / 0.45);
            const normalX = Math.cos(angle) * orbitSquash * Math.cos(tilt) - Math.sin(angle) * Math.sin(tilt);
            const normalY = Math.cos(angle) * orbitSquash * Math.sin(tilt) + Math.sin(angle) * Math.cos(tilt);
            const normal = Math.hypot(normalX, normalY) || 1;
            view.workNormals[index * 2] = normalX / normal;
            view.workNormals[index * 2 + 1] = normalY / normal;
        } else {
            const orbit = index % 3;
            const angle = at(layer.seed, point * 2) * tau + time * 0.04;
            const radius = (orbitRadius[orbit] ?? 1) * reach;
            const tilt = orbitTilt[orbit] ?? 0;
            setCastPoint(pose, point, orbitX(cx, radius, angle, tilt), orbitY(cy, radius, angle, tilt), 8, 0.42, 0.3);
        }
    }

    for (let index = 0; index < pose.dust; index += 1) {
        const point = index + 2 + pose.majors;
        const orbit = index % 3;
        const angle = at(layer.seed, point * 2) * tau + time * (0.05 + orbit * 0.02);
        const radius = ((orbitRadius[orbit] ?? 1) + (at(layer.seed, point * 2 + 1) - 0.5) * 0.04) * reach;
        const tilt = orbitTilt[orbit] ?? 0;
        setCastPoint(pose, point, orbitX(cx, radius, angle, tilt), orbitY(cy, radius, angle, tilt), 2.6, 0.26, 0.35);
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
            (0.12 + lift) * weight,
            0.3 + lift * 6
        );
    }

    const tipY = active >= 0 ? at(view.workTitles, active) : cy;
    const tipX = view.workEdge;
    setCastPoint(pose, 1, tipX, tipY, 12, active >= 0 ? at(view.workGlow, active) : 0, 1);
    for (let index = 0; index < castLineRange.ghost - castLineRange.leaders; index += 1) {
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
    const x = view.workEdge - stripInset;
    const count = Math.min(view.workCount, pose.majors);
    const firstY = count > 0 ? at(view.workTitles, 0) : view.height * 0.5;
    const lastY = count > 0 ? at(view.workTitles, count - 1) : firstY;
    setCastPoint(pose, 0, x, firstY, 50, 0, 1);
    setCastPoint(pose, 1, x, firstY, 4, 0, 1);

    for (let index = 0; index < pose.majors; index += 1) {
        const point = index + 2;
        if (index < count) {
            const glow = at(view.workGlow, index);
            setCastPoint(pose, point, x, at(view.workTitles, index), 10 + 12 * glow, 0.7 + 0.3 * glow, 0.2 + 0.8 * glow);
            pose.focus[point] = glow;
        } else {
            setCastPoint(pose, point, x, lastY, 4, 0, 0.3);
        }
    }

    for (let index = 0; index < pose.dust; index += 1) {
        setCastPoint(pose, index + 2 + pose.majors, x, firstY + (lastY - firstY) * at(layer.seed, index), 2, 0, 0.3);
    }

    const segments = castLineRange.workSegments;
    const top = firstY - stripReach;
    const span = lastY + stripReach - top;
    for (let index = 0; index < segments; index += 1) {
        const fromY = top + (index / segments) * span;
        const toY = top + ((index + 1) / segments) * span;
        const edge = Math.min(index + 0.5, segments - index - 0.5) / 3;
        writeCastSegment(layer, castLineRange.work + index, x, fromY, x, toY, 0.26 * Math.min(edge, 1) * weight, 0.25);
    }
};

export const writeWorkPose = (pose: CastPose, view: CastView, layer: CastLayer, weight: number): void => {
    if (view.workWidth > 0) {
        writeFleet(pose, view, layer, weight);
    } else {
        writeStrip(pose, view, layer, weight);
    }
};
