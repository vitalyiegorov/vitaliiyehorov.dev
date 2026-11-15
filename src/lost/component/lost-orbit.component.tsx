import { LostRing } from './lost-ring.component';

export function LostOrbit() {
    return (
        <div
            className="lost-system pointer-events-none absolute top-6 left-1/2 size-[min(36rem,128vw)] -translate-x-1/2 sm:top-16 sm:size-[min(46rem,100vw)] lg:top-1/2 lg:right-[-6rem] lg:left-auto lg:size-[min(60rem,68vw)] lg:translate-x-0 lg:-translate-y-1/2"
            aria-hidden="true"
        >
            <div className="lost-plane">
                <span className="lost-core" />
                <LostRing className="[--ring:34%] [--t:24s] [--start:20deg]">
                    <span className="lost-node lost-node-accent top-0" />
                    <span className="lost-node top-full" />
                </LostRing>
                <LostRing className="[--ring:56%] [--t:42s] [--start:140deg]">
                    <span className="lost-node top-0" />
                    <span className="lost-node top-full" />
                </LostRing>
                <LostRing className="[--ring:78%] [--t:68s] [--start:250deg]">
                    <span className="lost-node top-0" />
                    <span className="lost-node lost-node-accent top-full" />
                </LostRing>
                <LostRing className="lost-ring-broken [--ring:100%] [--t:140s] [--start:0deg]" />
            </div>
            <div className="lost-stray-track">
                <span className="lost-trail" />
                <span className="lost-stray">
                    <span className="lost-stray-dot" />
                    <span className="lost-stray-label telemetry">/404 · no signal</span>
                </span>
            </div>
        </div>
    );
}
