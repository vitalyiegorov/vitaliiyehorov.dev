export const markCastActive = (elements: readonly HTMLElement[], index: number, previous: number): number => {
    if (index === previous) {
        return previous;
    }
    elements[previous]?.removeAttribute('data-cast-active');
    elements[index]?.setAttribute('data-cast-active', '');

    return index;
};
