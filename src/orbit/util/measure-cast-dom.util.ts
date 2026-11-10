import type { CastDom } from '../type/cast-dom.type';

const textSelector = 'h2, h3, p, a, ul[aria-label] > li';

const all = (selector: string): HTMLElement[] => Array.from(document.querySelectorAll<HTMLElement>(selector));

export const measureCastDom = (): CastDom => {
    const sections = all('[data-orbit-stage]');
    const workRows = all('[data-cast-row]');
    const workTitles = workRows.map(row => row.querySelector<HTMLElement>('h3') ?? row);
    const careerNodes = all('[data-cast-node]');
    const methodSteps = all('[data-cast-step]');

    return {
        methodStage: sections.findIndex(section => section.id === 'method'),
        careerStage: sections.findIndex(section => section.id === 'career'),
        workStage: sections.findIndex(section => section.id === 'work'),
        text: sections.map(section => Array.from(section.querySelectorAll<HTMLElement>(textSelector))),
        methodSection: document.querySelector<HTMLElement>('#method'),
        methodBox: document.querySelector<HTMLElement>('[data-cast-slot="method"]'),
        methodSlots: all('[data-cast-slot="method-step"]'),
        methodSteps,
        methodTitles: methodSteps.map(step => step.querySelector<HTMLElement>('h3') ?? step),
        careerNodes,
        careerDates: careerNodes.map(node => node.parentElement?.querySelector<HTMLElement>('p') ?? node),
        careerSection: document.querySelector<HTMLElement>('#career'),
        workBox: document.querySelector<HTMLElement>('[data-cast-slot="work"]'),
        workList: document.querySelector<HTMLElement>('[data-cast-list]'),
        workRows,
        workTitles,
        workNames: workRows.map(
            (row, index) => `${row.querySelector('[data-cast-index]')?.textContent ?? ''} ${workTitles[index]?.textContent ?? ''}`
        ),
        label: document.querySelector<HTMLElement>('[data-cast-label]')
    };
};
