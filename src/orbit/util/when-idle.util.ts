export const whenIdle = (task: () => void): (() => void) => {
    if ('requestIdleCallback' in window) {
        const handle = window.requestIdleCallback(task, { timeout: 1200 });

        return () => window.cancelIdleCallback(handle);
    }
    const handle = globalThis.setTimeout(task, 300);

    return () => globalThis.clearTimeout(handle);
};
