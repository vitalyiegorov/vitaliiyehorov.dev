export function ScrollProgress() {
    return (
        <div
            className="pointer-events-none fixed top-1/2 right-5 z-30 hidden h-40 -translate-y-1/2 flex-col items-center gap-3 lg:flex"
            aria-hidden="true"
        >
            <span className="telemetry text-[0.6rem]">00</span>
            <span className="relative block w-px flex-1 bg-line">
                <span className="scroll-progress absolute inset-0 block bg-accent" />
            </span>
            <span className="telemetry text-[0.6rem]">06</span>
        </div>
    );
}
