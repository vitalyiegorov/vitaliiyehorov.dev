'use client';

import { useEffect, useRef, useState } from 'react';

import { supportsWebgl } from '../util/supports-webgl.util';
import { whenIdle } from '../util/when-idle.util';

type StageState = 'idle' | 'live' | 'fallback';

export function OrbitStage() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [state, setState] = useState<StageState>('idle');

    useEffect(() => {
        if (state === 'idle') {
            return undefined;
        }
        const root = document.documentElement;
        root.dataset.scene = state === 'live' ? 'live' : 'off';

        return () => {
            delete root.dataset.scene;
        };
    }, [state]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) {
            return undefined;
        }
        let dispose: (() => void) | undefined;
        let cancelled = false;
        const start = async (): Promise<void> => {
            const { startOrbitScene } = await import('../util/start-orbit-scene.util');
            if (!cancelled) {
                dispose = startOrbitScene(canvas, {
                    onReady: () => setState('live'),
                    onLost: () => setState('fallback')
                });
            }
        };
        const cancelIdle = whenIdle(() => {
            if (supportsWebgl()) {
                start().catch(() => setState('fallback'));
            } else {
                setState('fallback');
            }
        });

        return () => {
            cancelled = true;
            cancelIdle();
            dispose?.();
        };
    }, []);

    return (
        <div className="orbit-stage" data-state={state} aria-hidden="true">
            <div className="orbit-fallback" />
            <canvas ref={canvasRef} className="orbit-canvas" />
            <div className="orbit-scrim" />
        </div>
    );
}
