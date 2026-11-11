import { Camera, Scene, Vector2, Vector4, WebGLRenderer } from 'three';

import { orbitShieldLimit } from '../constant/orbit-shield-limit.constant';

import type { CastSurface } from '../type/cast-surface.type';
import type { IUniform } from 'three';

const compactOverscan = 0.5;
const wideOverscan = 0.25;

/**
 * The cast is drawn on its own canvas that sits in the document flow and is taller than the viewport.
 * The browser scrolls it together with the text on the compositor, so the graphics stay attached to their
 * rows between script frames, whatever rate the page is allowed to animate at.
 */
export const createCastSurface = (
    canvas: HTMLCanvasElement,
    shared: Record<string, IUniform>,
    pixelRatio: number,
    compact: boolean
): CastSurface => {
    const renderer = new WebGLRenderer({ canvas, alpha: true, antialias: pixelRatio < 1.5, powerPreference: 'default' });
    renderer.setPixelRatio(pixelRatio);
    renderer.setClearColor(0x000000, 0);
    const scene = new Scene();
    const camera = new Camera();
    const view = new Vector2(1, 1);
    const shift = { value: 0 };
    const shield = Array.from({ length: orbitShieldLimit }, () => new Vector4(0, 0, -1, -1));
    const guard = new Vector4(0, 0, -1, -1);
    const stage = canvas.parentElement;
    let transform = '';

    const surface: CastSurface = {
        scene,
        uniforms: {
            ...shared,
            uView: { value: view },
            uShift: shift,
            uShield: { value: shield },
            uGuard: { value: guard }
        },
        shield,
        guard,
        margin: 0,
        height: 1,
        shift: 0,
        resize: (width, viewHeight) => {
            surface.margin = Math.round(viewHeight * (compact ? compactOverscan : wideOverscan));
            surface.height = viewHeight + surface.margin * 2;
            canvas.style.height = `${surface.height}px`;
            renderer.setSize(width, surface.height, false);
            view.set(width, surface.height);
        },
        place: (scrollY, pinned) => {
            const ratio = window.devicePixelRatio || 1;
            const top = pinned ? -surface.margin : Math.round((scrollY - surface.margin) * ratio) / ratio;
            surface.shift = pinned ? surface.margin : scrollY - top;
            shift.value = surface.shift;
            const lock = pinned ? 'view' : 'page';
            if (stage && stage.dataset.lock !== lock) {
                stage.dataset.lock = lock;
            }
            const next = `translate3d(0, ${top}px, 0)`;
            if (next !== transform) {
                transform = next;
                canvas.style.transform = next;
            }
        },
        render: () => {
            renderer.render(scene, camera);
        },
        dispose: () => {
            renderer.dispose();
            canvas.style.removeProperty('transform');
            canvas.style.removeProperty('height');
            if (stage) {
                delete stage.dataset.lock;
            }
        }
    };

    return surface;
};
