import { LostOrbitLines } from './lost-orbit-lines.component';
import { LostRing } from './lost-ring.component';

export function LostOrbit() {
    return (
        <div
            className="lost-system pointer-events-none absolute top-6 left-1/2 size-[min(36rem,128vw,88svh)] -translate-x-1/2 sm:top-16 sm:size-[min(40rem,90vw)] lg:top-1/2 lg:right-[2vw] lg:left-auto lg:size-[min(56rem,60vw)] lg:translate-x-0 lg:-translate-y-1/2"
            aria-hidden="true"
        >
            <LostOrbitLines side="back" />
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
            </div>
            <LostOrbitLines side="front" />
            <div className="lost-stray-track">
                <span className="lost-slot" />
                <span className="lost-stray">
                    <span className="lost-trail" />
                    <span className="lost-stray-dot" />
                    <span className="lost-stray-label telemetry">
                        /404<span className="max-[24rem]:hidden"> · no signal</span>
                    </span>
                </span>
            </div>
        </div>
    );
}
