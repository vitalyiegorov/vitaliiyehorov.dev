import { at } from './at.util';

import type { CastView } from '../type/cast-view.type';

export const readCareerPathX = (view: CastView, y: number): number => {
    const nodes = view.careerNodes;
    const last = view.careerCount - 1;
    if (y <= at(nodes, 1)) {
        return at(nodes, 0);
    }
    for (let index = 0; index < last; index += 1) {
        const fromY = at(nodes, index * 2 + 1);
        const toY = at(nodes, index * 2 + 3);
        if (y <= toY) {
            const t = (y - fromY) / Math.max(toY - fromY, 1);
            const fromX = at(nodes, index * 2);
            const bend = view.narrow ? 0 : Math.sin(Math.PI * t) * 5 * (index % 2 === 0 ? -1 : 1);

            return fromX + (at(nodes, index * 2 + 2) - fromX) * t + bend;
        }
    }

    return at(nodes, last * 2);
};
