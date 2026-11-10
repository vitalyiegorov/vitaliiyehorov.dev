import { CareerEntry } from './career-entry.component';

import { TelemetryLabel } from '@/shared/component/telemetry-label.component';

export function CareerSection() {
    return (
        <section id="career" data-orbit-stage aria-labelledby="career-title" className="relative isolate overflow-x-clip py-28 sm:py-36">
            <div className="mx-auto grid max-w-[96rem] gap-14 px-5 sm:px-8 lg:grid-cols-12 lg:gap-8 lg:px-14">
                <div data-orbit-anchor className="lg:col-span-5 lg:sticky lg:top-[16vh] lg:self-start">
                    <TelemetryLabel index="04">Trajectory · 2010 to now</TelemetryLabel>
                    <h2 id="career-title" className="display readable mt-6 text-[clamp(2.6rem,6vw,6rem)] font-semibold text-balance">
                        Fifteen years of building teams that ship.
                    </h2>
                </div>
                <div className="rail relative ml-1.5 border-l border-line lg:col-span-6 lg:col-start-7">
                    <span className="rail-fill absolute top-0 -left-px block h-full w-px bg-accent" aria-hidden="true" />
                    <ol>
                        <CareerEntry years="2010 – 2017" title="Founder & CEO" company="SamsonOS · Kyiv">
                            40+ projects for startups in Europe and the US. A team of 20+ engineers.
                        </CareerEntry>
                        <CareerEntry years="2017 – 2019" title="CTO" company="Omnivalor · Kyiv / Stockholm">
                            Two teams, one e‑commerce SaaS.
                        </CareerEntry>
                        <CareerEntry years="2019 – 2021" title="VP of Engineering" company="Clearmove · Kyiv / London">
                            Built R&amp;D from zero to 20+ engineers.
                        </CareerEntry>
                        <CareerEntry years="2021 – 2023" title="CTO" company="OnTheWay · Nürnberg">
                            A logistics marketplace from MVP to production, with a team of five.
                        </CareerEntry>
                        <CareerEntry
                            years="2023 – now"
                            title="Engineering Manager"
                            company={
                                <>
                                    <a
                                        className="inline-block py-4 -my-4 text-fg underline decoration-line-strong underline-offset-4 hover:text-accent"
                                        href="https://toolsense.io"
                                    >
                                        ToolSense
                                    </a>{' '}
                                    · Vienna
                                </>
                            }
                        >
                            Product engineering for a B2B asset operations platform. AI-native engineering is the team&apos;s daily work.
                        </CareerEntry>
                    </ol>
                </div>
            </div>
        </section>
    );
}
