import { Stat } from './stat.component';

import { SectionNumeral } from '@/shared/component/section-numeral.component';
import { TelemetryLabel } from '@/shared/component/telemetry-label.component';

export function StatsSection() {
    return (
        <section
            id="numbers"
            data-orbit-stage
            aria-labelledby="numbers-title"
            className="relative isolate overflow-x-clip py-28 sm:py-36 lg:py-44"
        >
            <SectionNumeral value="02" className="top-24 right-10" />
            <div className="mx-auto max-w-[96rem] px-5 sm:px-8 lg:px-14">
                <div className="reveal max-w-3xl">
                    <TelemetryLabel index="02">Telemetry · as of Nov 2026</TelemetryLabel>
                    <h2 id="numbers-title" className="display readable mt-6 text-[clamp(2.6rem,6.2vw,6rem)] font-semibold text-balance">
                        A year of shipping, counted.
                    </h2>
                    <p className="readable mt-6 max-w-xl text-lg leading-relaxed text-muted text-pretty">
                        The last 12 months on GitHub, plus the agent fleet and the open-source packages behind them.
                    </p>
                </div>
                <p className="telemetry mt-16 text-muted sm:mt-20">GitHub · last 12 months</p>
                <dl className="mt-5 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
                    <Stat value={35058} label="Contributions" />
                    <Stat value={16715} label="Commits" />
                    <Stat value={2301} label="Pull requests" />
                </dl>
                <p className="telemetry mt-16 text-muted sm:mt-20">Fleet and open source</p>
                <dl className="mt-5 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
                    <Stat value={3727} label="Agent sessions orchestrated" />
                    <Stat value={5} label="Machines in the fleet" />
                    <Stat value={26} label="Open-source npm packages">
                        Published as rnw-community. The largest, @rnw-community/shared, gets about 325k downloads a month.
                    </Stat>
                </dl>
            </div>
        </section>
    );
}
