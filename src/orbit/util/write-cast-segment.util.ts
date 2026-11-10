import type { CastLayer } from '../type/cast-layer.type';

export const writeCastSegment = (
    layer: CastLayer,
    index: number,
    fromX: number,
    fromY: number,
    toX: number,
    toY: number,
    alpha: number,
    lit: number
): void => {
    const position = layer.linePosition.array;
    const shade = layer.lineShade.array;
    const vertex = index * 2;
    position[vertex * 3] = fromX;
    position[vertex * 3 + 1] = fromY;
    position[vertex * 3 + 3] = toX;
    position[vertex * 3 + 4] = toY;
    shade[vertex * 2] = alpha;
    shade[vertex * 2 + 1] = lit;
    shade[vertex * 2 + 2] = alpha;
    shade[vertex * 2 + 3] = lit;
};
