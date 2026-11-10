import { at } from './at.util';
import { smoothstep } from './smoothstep.util';

import type { CastDom } from '../type/cast-dom.type';
import type { CastLabelState } from '../type/cast-label-state.type';
import type { CastView } from '../type/cast-view.type';

const gap = 18;

export const updateCastLabel = (
    dom: CastDom,
    view: CastView,
    positions: ArrayLike<number>,
    weight: number,
    state: CastLabelState
): void => {
    const label = dom.label;
    if (!label) {
        return;
    }
    const active = view.workActive;
    const shown = view.workWidth > 0 && active >= 0 && weight > 0;
    const opacity = shown ? Math.round(smoothstep((weight - 0.6) / 0.3) * at(view.workGlow, active) * 100) / 100 : 0;
    if (shown && active !== state.index) {
        state.index = active;
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
    const point = active + 2;
    const nodeY = at(positions, point * 3 + 1);
    const below = at(view.workTitles, active) < nodeY;
    const x = Math.round(at(positions, point * 3) - state.width - gap * 0.5);
    const y = Math.round(below ? nodeY + gap * 0.6 : nodeY - state.height - gap * 0.6);
    if (x !== state.x || y !== state.y) {
        state.x = x;
        state.y = y;
        label.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    }
};
