import type { StageBox } from '../type/stage-box.type';

export const measureStages = (wide: boolean): StageBox[] => {
    const elements = Array.from(document.querySelectorAll<HTMLElement>('[data-orbit-stage]'));

    return elements.map((element, index) => {
        const rect = element.getBoundingClientRect();
        const next = wide && element.hasAttribute('data-orbit-cover-next') ? (elements[index + 1] ?? null) : null;

        return {
            top: rect.top + window.scrollY,
            height: Math.max(rect.height, 1),
            cover: element.querySelector<HTMLElement>('[data-orbit-cover]') ?? next
        };
    });
};
