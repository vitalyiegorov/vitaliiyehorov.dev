import { Stat } from './stat.component';

import { TelemetryLabel } from '@/shared/component/telemetry-label.component';

export function StatsSection() {
    return (
        <section
            id="numbers"
            data-orbit-stage
            aria-labelledby="numbers-title"
            className="relative isolate overflow-x-clip pt-20 pb-12 sm:pt-24 sm:pb-16 lg:pt-28 lg:pb-16"
        >
            <div className="mx-auto max-w-[96rem] px-5 sm:px-8 lg:px-14">
                <div className="reveal max-w-3xl">
                    <TelemetryLabel index="02">Telemetry · 12 months to Nov 2026</TelemetryLabel>
                    <h2 id="numbers-title" className="display readable mt-6 text-[clamp(2.6rem,6.2vw,6rem)] font-semibold text-balance">
                        A year of shipping, counted.
                    </h2>
                </div>
                <dl className="mt-14 grid grid-cols-2 gap-x-6 gap-y-8 sm:mt-16 lg:mt-20 lg:grid-cols-4 lg:gap-y-0">
                    <Stat value={35058} label="GitHub contributions" />
                    <Stat value={2301} label="Pull requests" />
                    <Stat value={3727} label="Agent sessions" />
                    <Stat value={26} label="npm packages" />
                </dl>
            </div>
        </section>
    );
}
