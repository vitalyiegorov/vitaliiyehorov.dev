import { Stat } from './stat.component';

import { SectionNumeral } from '@/shared/component/section-numeral.component';
import { TelemetryLabel } from '@/shared/component/telemetry-label.component';

export function StatsSection() {
    return (
        <section
            id="numbers"
            data-orbit-stage
            aria-labelledby="numbers-title"
            className="relative isolate overflow-x-clip py-20 sm:py-24 lg:py-24"
        >
            <SectionNumeral value="02" className="top-24 right-10" />
            <div className="mx-auto max-w-[96rem] px-5 sm:px-8 lg:px-14">
                <div className="reveal max-w-3xl">
                    <TelemetryLabel index="02">Telemetry · as of Nov 2026</TelemetryLabel>
                    <h2 id="numbers-title" className="display readable mt-6 text-[clamp(2.6rem,6.2vw,6rem)] font-semibold text-balance">
                        A year of shipping, counted.
                    </h2>
                </div>
                <dl className="mt-14 grid grid-cols-2 gap-x-6 gap-y-10 sm:mt-16 lg:grid-cols-4">
                    <Stat value={35058} label="GitHub contributions · 12 months" />
                    <Stat value={2301} label="Pull requests · 12 months" />
                    <Stat value={3727} label="Agent sessions orchestrated" />
                    <Stat value={26} label="Open-source npm packages">
                        The largest gets 325k downloads a month.
                    </Stat>
                </dl>
            </div>
        </section>
    );
}
