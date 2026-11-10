import type { StageBox } from '../type/stage-box.type';

export const measureStages = (): StageBox[] =>
    Array.from(document.querySelectorAll<HTMLElement>('[data-orbit-stage]'), element => {
        const rect = element.getBoundingClientRect();

        return { top: rect.top + window.scrollY, height: Math.max(rect.height, 1) };
    });
