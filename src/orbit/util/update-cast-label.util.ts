import { castLineRange } from '../constant/cast-line-range.constant';

import { at } from './at.util';
import { smoothstep } from './smoothstep.util';

import type { CastDom } from '../type/cast-dom.type';
import type { CastLabelState } from '../type/cast-label-state.type';
import type { CastLayer } from '../type/cast-layer.type';
import type { CastView } from '../type/cast-view.type';

const gap = 12;
const nodeRadius = 7;
const pad = 4;
const coreClear = 46;
const sides = [
    [1, 0],
    [1, -1],
    [1, 1],
    [0, -1],
    [0, 1],
    [-1, -1],
    [-1, 1],
    [-1, 0]
] as const;

const inside = (x: number, y: number, left: number, top: number, right: number, bottom: number): boolean =>
    x > left && x < right && y > top && y < bottom;

const crossings = (
    layer: CastLayer,
    start: number,
    end: number,
    left: number,
    top: number,
    right: number,
    bottom: number,
    clear = false
): number => {
    const position = layer.linePosition.array;
    const shade = layer.lineShade.array;
    let hits = 0;
    for (let segment = start; segment < end; segment += 1) {
        const vertex = segment * 2;
        if (at(shade, vertex * 2) < 0.005) {
            continue;
        }
        const fromX = at(position, vertex * 3);
        const fromY = at(position, vertex * 3 + 1);
        const toX = at(position, vertex * 3 + 3);
        const toY = at(position, vertex * 3 + 4);
        const samples = Math.max(Math.ceil(Math.hypot(toX - fromX, toY - fromY) / 6), 1);
        for (let step = 0; step <= samples; step += 1) {
            const t = step / samples;
            if (inside(fromX + (toX - fromX) * t, fromY + (toY - fromY) * t, left, top, right, bottom)) {
                hits += 1;
            }
        }
        if (clear && hits > 0) {
            shade[vertex * 2] = 0;
            shade[vertex * 2 + 2] = 0;
            hits = 0;
        }
    }

    return hits;
};

const clearPoints = (layer: CastLayer, keep: number, left: number, top: number, right: number, bottom: number): void => {
    const position = layer.pointPosition.array;
    const shade = layer.pointShade.array;
    for (let index = 2; index < position.length / 3; index += 1) {
        if (index !== keep && inside(at(position, index * 3), at(position, index * 3 + 1), left, top, right, bottom)) {
            shade[index * 4 + 1] = 0;
        }
    }
};

const placeScore = (
    view: CastView,
    layer: CastLayer,
    active: number,
    distance: number,
    left: number,
    top: number,
    width: number,
    height: number
): number => {
    const right = left + width;
    const bottom = top + height;
    const outside = left < view.workEdge + gap || right > view.width - gap || top < gap || bottom > view.height - gap ? 1000 : 0;
    const rings = crossings(
        layer,
        castLineRange.work,
        castLineRange.work + castLineRange.workSegments * 3,
        left - pad,
        top - pad,
        right + pad,
        bottom + pad
    );
    const leader = castLineRange.leaders + active;
    const crossed = crossings(layer, leader, leader + 1, left - pad, top - pad, right + pad, bottom + pad);
    const nearX = Math.max(left - view.workX, view.workX - right, 0);
    const nearY = Math.max(top - view.workY, view.workY - bottom, 0);
    const core = Math.hypot(nearX, nearY) < coreClear ? 40 : 0;
    const nodeX = left + width / 2;
    const inward = Math.hypot(nodeX - view.workX, top + height / 2 - view.workY) < distance ? 3 : 0;

    return outside + rings + crossed * 50 + core + inward;
};

export const updateCastLabel = (dom: CastDom, view: CastView, layer: CastLayer, weight: number, state: CastLabelState): void => {
    const label = dom.label;
    if (!label) {
        return;
    }
    const active = view.workActive;
    const shown = view.workWidth > 0 && active >= 0 && weight > 0;
    const opacity = shown ? Math.round(smoothstep((weight - 0.6) / 0.3) * at(view.workGlow, active) * 100) / 100 : 0;
    if (shown && active !== state.index) {
        state.index = active;
        state.side = -1;
        label.textContent = dom.workNames[active] ?? '';
        state.width = label.offsetWidth;
        state.height = label.offsetHeight;
    }
    if (opacity !== state.opacity) {
        state.opacity = opacity;
        label.style.opacity = String(opacity);
    }
    if (opacity === 0) {
        return;
    }
    const positions = layer.pointPosition.array;
    const point = active + 2;
    const nodeX = at(positions, point * 3);
    const nodeY = at(positions, point * 3 + 1);
    const offset = nodeRadius + gap;
    const distance = Math.hypot(nodeX - view.workX, nodeY - view.workY);
    let best = -1;
    let bestScore = Number.POSITIVE_INFINITY;
    let bestX = nodeX;
    let bestY = nodeY;
    for (let side = 0; side < sides.length; side += 1) {
        const [dx, dy] = sides[side] ?? [1, 0];
        const diagonal = dx !== 0 && dy !== 0 ? Math.SQRT1_2 : 1;
        const left = dx > 0 ? nodeX + offset * diagonal : dx < 0 ? nodeX - offset * diagonal - state.width : nodeX - state.width / 2;
        const top = dy > 0 ? nodeY + offset * diagonal : dy < 0 ? nodeY - offset * diagonal - state.height : nodeY - state.height / 2;
        const score = placeScore(view, layer, active, distance, left, top, state.width, state.height) - (side === state.side ? 1.5 : 0);
        if (score < bestScore) {
            bestScore = score;
            best = side;
            bestX = left;
            bestY = top;
        }
    }
    state.side = best;
    const x = Math.round(bestX);
    const y = Math.round(bestY);
    const right = x + state.width + pad * 1.5;
    const bottom = y + state.height + pad * 1.5;
    crossings(
        layer,
        castLineRange.work,
        castLineRange.work + castLineRange.workSegments * 3,
        x - pad * 1.5,
        y - pad * 1.5,
        right,
        bottom,
        true
    );
    clearPoints(layer, point, x - pad * 1.5, y - pad * 1.5, right, bottom);
    if (x !== state.x || y !== state.y) {
        state.x = x;
        state.y = y;
        label.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    }
};
