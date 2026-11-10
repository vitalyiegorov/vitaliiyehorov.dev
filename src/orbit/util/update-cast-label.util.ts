import { castLineRange } from '../constant/cast-line-range.constant';

import { at } from './at.util';
import { smoothstep } from './smoothstep.util';

import type { CastDom } from '../type/cast-dom.type';
import type { CastLabelState } from '../type/cast-label-state.type';
import type { CastLayer } from '../type/cast-layer.type';
import type { CastView } from '../type/cast-view.type';

const gap = 12;
const offset = 24;
const pad = 4;
const railClear = 64;
const coreClear = 56;
const turns = [0, 0.6, -0.6, 1.2, -1.2, 1.8, -1.8] as const;

const inside = (x: number, y: number, left: number, top: number, right: number, bottom: number): boolean =>
    x > left && x < right && y > top && y < bottom;

const crossings = (layer: CastLayer, segment: number, left: number, top: number, right: number, bottom: number): number => {
    const position = layer.linePosition.array;
    const shade = layer.lineShade.array;
    const vertex = segment * 2;
    if (at(shade, vertex * 2) < 0.005) {
        return 0;
    }
    const fromX = at(position, vertex * 3);
    const fromY = at(position, vertex * 3 + 1);
    const toX = at(position, vertex * 3 + 3);
    const toY = at(position, vertex * 3 + 4);
    const samples = Math.max(Math.ceil(Math.hypot(toX - fromX, toY - fromY) / 6), 1);
    let hits = 0;
    for (let step = 0; step <= samples; step += 1) {
        const t = step / samples;
        if (inside(fromX + (toX - fromX) * t, fromY + (toY - fromY) * t, left, top, right, bottom)) {
            hits += 1;
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

const clamp = (value: number, low: number, high: number): number => Math.min(Math.max(value, low), Math.max(low, high));

const placeAlong = (
    view: CastView,
    state: CastLabelState,
    nodeX: number,
    nodeY: number,
    normalX: number,
    normalY: number
): [number, number] => {
    const reach = offset + (Math.abs(normalX) * state.width) / 2 + (Math.abs(normalY) * state.height) / 2;
    const left = nodeX + normalX * reach - state.width / 2;
    const top = nodeY + normalY * reach - state.height / 2;

    return [clamp(left, view.workEdge + gap, view.width - railClear - state.width), clamp(top, gap, view.height - gap - state.height)];
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
    const normalX = at(view.workNormals, active * 2);
    const normalY = at(view.workNormals, active * 2 + 1);
    const leader = castLineRange.leaders + active;
    let best = 0;
    let bestScore = Number.POSITIVE_INFINITY;
    let bestX = nodeX;
    let bestY = nodeY;
    for (let side = 0; side < turns.length; side += 1) {
        const turn = turns[side] ?? 0;
        const cos = Math.cos(turn);
        const sin = Math.sin(turn);
        const [left, top] = placeAlong(view, state, nodeX, nodeY, normalX * cos - normalY * sin, normalX * sin + normalY * cos);
        const right = left + state.width;
        const bottom = top + state.height;
        const crossed = crossings(layer, leader, left - pad, top - pad, right + pad, bottom + pad);
        const core = Math.hypot(Math.max(left - view.workX, view.workX - right, 0), Math.max(top - view.workY, view.workY - bottom, 0));
        const score = crossed * 50 + (core < coreClear ? 40 : 0) + Math.abs(turn) * 4 - (side === state.side ? 1.5 : 0);
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
    clearPoints(layer, point, x - pad, y - pad, x + state.width + pad, y + state.height + pad);
    if (x !== state.x || y !== state.y) {
        state.x = x;
        state.y = y;
        label.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    }
};
