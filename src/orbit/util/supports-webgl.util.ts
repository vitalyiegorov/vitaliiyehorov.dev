export const supportsWebgl = (): boolean => {
    try {
        const probe = document.createElement('canvas');

        return Boolean(probe.getContext('webgl2') ?? probe.getContext('webgl'));
    } catch {
        return false;
    }
};
