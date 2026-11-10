'use client';

import { useState } from 'react';

export function MotionToggle() {
    const [paused, setPaused] = useState(false);

    const toggle = (): void => {
        const next = !paused;
        setPaused(next);
        document.documentElement.dataset.motion = next ? 'paused' : 'running';
    };

    return (
        <button
            type="button"
            className="telemetry pointer-events-auto flex motion-reduce:hidden min-h-11 cursor-pointer items-center gap-2 px-1 text-muted transition-colors duration-300 hover:text-fg"
            aria-pressed={paused}
            onClick={toggle}
        >
            {paused ? 'Resume motion' : 'Pause motion'}
        </button>
    );
}
