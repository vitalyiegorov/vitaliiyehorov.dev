export function ScrollProgress() {
    return (
        <div
            data-orbit-guard
            className="pointer-events-none fixed top-1/2 right-5 z-30 hidden h-48 -translate-y-1/2 flex-col items-center gap-3 lg:flex"
            aria-hidden="true"
        >
            <span className="rail-now telemetry grid">
                <span>01</span>
                <span>02</span>
                <span>03</span>
                <span>04</span>
                <span>05</span>
                <span>06</span>
            </span>
            <span className="relative block w-0.5 flex-1 rounded-full bg-line">
                <span className="scroll-progress absolute inset-0 block rounded-full bg-accent shadow-[0_0_12px_var(--accent)]" />
            </span>
            <span className="telemetry">06</span>
        </div>
    );
}
