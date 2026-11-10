import { smoothstep } from './smoothstep.util';

import type { CastDom } from '../type/cast-dom.type';
import type { CastView } from '../type/cast-view.type';

const reach = 80;

const readText = (elements: readonly HTMLElement[] | undefined, view: CastView): void => {
    if (!elements) {
        return;
    }
    const limit = view.text.length / 4;
    for (let index = 0; index < elements.length && view.textCount < limit; index += 1) {
        const rect = elements[index]?.getBoundingClientRect();
        if (rect && rect.width > 0 && rect.bottom > -reach && rect.top < view.height + reach) {
            const offset = view.textCount * 4;
            view.text[offset] = rect.left;
            view.text[offset + 1] = rect.top;
            view.text[offset + 2] = rect.right;
            view.text[offset + 3] = rect.bottom;
            view.textCount += 1;
        }
    }
};

const readMethod = (dom: CastDom, view: CastView, still: boolean): void => {
    const box = dom.methodBox?.getBoundingClientRect();
    const boxed = Boolean(box && box.width > 0);
    const lift = box && boxed ? Math.max((box.top + box.bottom) / 2 - view.height * 0.5, 0) * 0.85 : 0;
    const reading = view.height * 0.5 - lift;
    const steps = boxed ? dom.methodTitles : dom.methodSlots;
    let progress = 0;
    let previous = 0;
    for (let index = 0; index < steps.length; index += 1) {
        const rect = steps[index]?.getBoundingClientRect();
        const center = rect ? (rect.top + rect.bottom) / 2 : 0;
        if (index > 0 && reading > previous) {
            progress = index - 1 + Math.min((reading - previous) / Math.max(center - previous, 1), 1);
        }
        previous = center;
    }
    view.methodProgress = still ? Math.round(progress) : progress;
    view.methodFade = 1;
    if (box && boxed) {
        view.method = true;
        view.methodSlotCount = 0;
        view.methodX = (box.left + box.right) / 2;
        view.methodY = (box.top + box.bottom) / 2;
        view.methodWidth = box.width;
        view.methodHeight = box.height;

        return;
    }
    view.methodSlotCount = 0;
    const limit = view.methodSlots.length / 4;
    for (let index = 0; index < dom.methodSlots.length && index < limit; index += 1) {
        const rect = dom.methodSlots[index]?.getBoundingClientRect();
        if (rect && rect.width > 0) {
            view.methodSlots[index * 4] = (rect.left + rect.right) / 2;
            view.methodSlots[index * 4 + 1] = (rect.top + rect.bottom) / 2;
            view.methodSlots[index * 4 + 2] = rect.width;
            view.methodSlots[index * 4 + 3] = rect.height;
            view.methodSlotCount = index + 1;
        }
    }
    const slot = dom.methodSlots[Math.min(Math.round(view.methodProgress), dom.methodSlots.length - 1)]?.getBoundingClientRect();
    if (!slot || slot.width === 0) {
        view.method = false;

        return;
    }
    const turn = view.methodProgress - Math.floor(view.methodProgress);
    view.method = true;
    view.methodFade = view.methodProgress >= dom.methodSlots.length - 1 ? 1 : smoothstep(Math.abs(turn - 0.5) / 0.3);
    view.methodX = (slot.left + slot.right) / 2;
    view.methodY = (slot.top + slot.bottom) / 2;
    view.methodWidth = slot.width;
    view.methodHeight = slot.height;
};

const readCareer = (dom: CastDom, view: CastView): void => {
    const limit = view.careerNodes.length / 2;
    let count = 0;
    for (let index = 0; index < dom.careerNodes.length && count < limit; index += 1) {
        const rect = dom.careerNodes[index]?.getBoundingClientRect();
        const date = dom.careerDates[index]?.getBoundingClientRect() ?? rect;
        if (rect && date && rect.height > 0) {
            view.careerNodes[count * 2] = (rect.left + rect.right) / 2;
            view.careerNodes[count * 2 + 1] = (date.top + date.bottom) / 2;
            count += 1;
        }
    }
    view.careerCount = count;
    view.careerEnd = (dom.careerSection?.getBoundingClientRect().bottom ?? 0) - 24;
};

const readWork = (dom: CastDom, view: CastView): void => {
    const box = dom.workBox?.getBoundingClientRect();
    if (box && box.width > 0) {
        view.workX = (box.left + box.right) / 2;
        view.workY = (box.top + box.bottom) / 2;
        view.workWidth = box.width;
        view.workHeight = box.height;
    } else {
        view.workWidth = 0;
    }
    view.workEdge = dom.workList?.getBoundingClientRect().right ?? view.width;
    const reading = view.height * 0.5;
    const limit = view.workTitles.length;
    let active = -1;
    let nearest = Number.POSITIVE_INFINITY;
    let count = 0;
    for (let index = 0; index < dom.workRows.length && index < limit; index += 1) {
        const rect = dom.workRows[index]?.getBoundingClientRect();
        const title = dom.workTitles[index]?.getBoundingClientRect();
        if (rect && title) {
            const distance = reading < rect.top ? rect.top - reading : Math.max(reading - rect.bottom, 0);
            if (distance < nearest) {
                nearest = distance;
                active = index;
            }
            view.workTitles[index] = (title.top + title.bottom) / 2;
            count += 1;
        }
    }
    view.workCount = count;
    view.workActive = view.hover >= 0 && view.hover < count ? view.hover : active;
    for (let index = 0; index < view.workGlow.length; index += 1) {
        const glow = view.workGlow[index] ?? 0;
        view.workGlow[index] = glow + ((index === view.workActive ? 1 : 0) - glow) * view.ease;
    }
};

export const readCastRects = (dom: CastDom, view: CastView, from: number, to: number, still: boolean): void => {
    view.textCount = 0;
    for (let pass = 0; pass < 2; pass += 1) {
        const stage = pass === 0 ? from : to;
        if (pass === 1 && to === from) {
            break;
        }
        readText(dom.text[stage], view);
        if (stage === dom.methodStage) {
            readMethod(dom, view, still);
        } else if (stage === dom.careerStage) {
            readCareer(dom, view);
        } else if (stage === dom.workStage) {
            readWork(dom, view);
        }
    }
};
