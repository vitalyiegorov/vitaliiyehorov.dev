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
const planCount = 6;
const ringTilt = 0.42;
const fanTilt = 0.62;

const settle = (value: number): number => smoothstep((Math.min(Math.max(value, 0), 1) - 0.2) / 0.6);

export const writeMethodPose = (pose: CastPose, view: CastView, layer: CastLayer, weight: number): void => {
    const { methodX: cx, methodY: cy, time } = view;
    const radius = view.methodHeight * 0.45;
    const stretch = Math.min((view.methodWidth * 0.47) / Math.max(radius, 1), 1.75);
    const fan = settle(view.methodProgress);
    const council = settle(view.methodProgress - 1);
    const scale = view.narrow ? 0.78 : 1;
    const rays = view.narrow ? 7 : 6;
    const layers = Math.ceil(pose.majors / rays);
    const visible = view.method ? view.methodFade : 0;

    setCastPoint(pose, 0, cx, cy, (250 - 120 * fan + 30 * council) * scale, visible, 1);
    setCastPoint(pose, 1, cx, cy, 4, 0, 1);

    for (let index = 0; index < pose.majors; index += 1) {
        const point = index + 2;
        const planAngle = (index / planCount) * tau + time * 0.35;
        const planDepth = Math.sin(planAngle);
        const resting = index < planCount;
        const planX = resting ? cx + Math.cos(planAngle) * radius * 0.38 * stretch : cx;
        const planY = resting ? cy + planDepth * radius * 0.38 * ringTilt : cy;
        const planSize = resting ? 17 * scale * (0.85 + 0.25 * planDepth) : 4;
        const planAlpha = resting ? 1 : 0;

        const ray = index % rays;
        const shell = Math.floor(index / rays);
        const rayAngle = (ray / rays) * tau + 0.35 + 0.05 * Math.sin(time * 0.5 + index);
        const reach = radius * (0.36 + (0.64 * (shell + 1)) / layers) * (1 + 0.03 * Math.sin(time * 1.2 + index * 1.7));
        const fanX = cx + Math.cos(rayAngle) * reach * stretch;
        const fanY = cy + Math.sin(rayAngle) * reach * fanTilt;
        const fanSize = 16 * scale * (1.12 - 0.14 * shell);
        const fanLit = 0.7 + (0.3 * shell) / Math.max(layers - 1, 1);

        const ringAngle = (index / pose.majors) * tau + time * 0.05;
        const ringDepth = Math.sin(ringAngle);
        const ringX = cx + Math.cos(ringAngle) * radius * 0.92 * stretch;
        const ringY = cy + ringDepth * radius * 0.92 * ringTilt;
        const ringSize = 17 * scale * (0.82 + 0.3 * ringDepth);
        const ringAlpha = 0.74 + 0.26 * ringDepth;

        const x = planX + (fanX - planX) * fan;
        const y = planY + (fanY - planY) * fan;
        const size = planSize + (fanSize - planSize) * fan;
        const alpha = planAlpha + (1 - planAlpha) * fan;
        const lit = 0.55 + (fanLit - 0.55) * fan;
        setCastPoint(
            pose,
            point,
            x + (ringX - x) * council,
            y + (ringY - y) * council,
            size + (ringSize - size) * council,
            (alpha + (ringAlpha - alpha) * council) * visible,
            lit + (1 - lit) * council
        );
    }

    for (let index = 0; index < pose.dust; index += 1) {
        const point = index + 2 + pose.majors;
        const seed = at(layer.seed, point * 2);
        const spin = at(layer.seed, point * 2 + 1);
        const cloudAngle = seed * tau + time * (0.25 + spin * 0.35);
        const cloud = radius * (0.12 + 0.3 * spin);
        const cloudX = cx + Math.cos(cloudAngle) * cloud * 1.25;
        const cloudY = cy + Math.sin(cloudAngle) * cloud * 0.5;

        const ray = index % rays;
        const flow = (spin + time * 0.2) % 1;
        const rayAngle = (ray / rays) * tau + 0.35 + 0.05 * Math.sin(time * 0.5 + ray);
        const rayX = cx + Math.cos(rayAngle) * radius * (0.1 + 0.95 * flow) * stretch;
        const rayY = cy + Math.sin(rayAngle) * radius * (0.1 + 0.95 * flow) * fanTilt;
        const rayAlpha = 0.7 * Math.sin(Math.PI * flow);

        const ringAngle = (index / pose.dust) * tau + time * 0.05;
        const ringX = cx + Math.cos(ringAngle) * radius * 0.92 * stretch;
        const ringY = cy + Math.sin(ringAngle) * radius * 0.92 * ringTilt + (seed - 0.5) * 2;
        const ringAlpha = 0.24 * (0.7 + 0.3 * Math.sin(ringAngle));

        const x = cloudX + (rayX - cloudX) * fan;
        const y = cloudY + (rayY - cloudY) * fan;
        const alpha = 0.32 + (rayAlpha - 0.32) * fan;
        setCastPoint(
            pose,
            point,
            x + (ringX - x) * council,
            y + (ringY - y) * council,
            (3 - 0.6 * council) * scale,
            (alpha + (ringAlpha - alpha) * council) * visible,
            0.6 + 0.3 * fan
        );
    }

    const rayAlpha = 0.3 * weight * fan * (1 - council) * visible;
    for (let ray = 0; ray < castLineRange.ring - castLineRange.rays; ray += 1) {
        const outer = Math.min(ray + (layers - 1) * rays, pose.majors - 1) + 2;
        const live = ray < rays ? rayAlpha : 0;
        writeCastSegment(layer, castLineRange.rays + ray, cx, cy, at(pose.x, outer), at(pose.y, outer), live, 0.7);
    }
    writeCastEllipse(
        layer,
        castLineRange.ring,
        castLineRange.ringSegments,
        cx,
        cy,
        radius * 0.92 * stretch,
        radius * 0.92 * ringTilt,
        0,
        0.22 * weight * council * visible,
        0.85
    );
};
