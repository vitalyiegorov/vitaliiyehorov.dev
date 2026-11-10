import { CareerEntry } from './career-entry.component';

import { SectionNumeral } from '@/shared/component/section-numeral.component';
import { TelemetryLabel } from '@/shared/component/telemetry-label.component';

export function CareerSection() {
    return (
        <section id="career" data-orbit-stage aria-labelledby="career-title" className="relative isolate overflow-x-clip py-28 sm:py-36">
            <SectionNumeral value="04" className="top-40 left-6" />
            <div className="mx-auto grid max-w-[96rem] gap-14 px-5 sm:px-8 lg:grid-cols-12 lg:gap-8 lg:px-14">
                <div className="lg:col-span-5 lg:sticky lg:top-[16vh] lg:self-start">
                    <TelemetryLabel index="04">Trajectory · 2010 to now</TelemetryLabel>
                    <h2 id="career-title" className="display readable mt-6 text-[clamp(2.6rem,6vw,6rem)] font-semibold text-balance">
                        Fifteen years of building teams that ship.
                    </h2>
                </div>
                <div className="rail relative ml-1.5 border-l border-line lg:col-span-6 lg:col-start-7">
                    <span className="rail-fill absolute top-0 -left-px block h-full w-px bg-accent" aria-hidden="true" />
                    <ol>
                        <CareerEntry years="2010 – 2017" title="Founder & CEO" company="SamsonOS · Kyiv">
                            Built a software company that shipped 40+ projects for startups in Europe and the US, and grew the team past 20
                            engineers.
                        </CareerEntry>
                        <CareerEntry years="2017 – 2019" title="CTO" company="Omnivalor · Kyiv / Stockholm">
                            Ran two agile teams on an e-commerce SaaS, on fault-tolerant AWS infrastructure with Stripe, Klarna, DHL, UPS
                            and FedEx integrations.
                        </CareerEntry>
                        <CareerEntry years="2019 – 2021" title="VP of Engineering" company="Clearmove · Kyiv / London / UAE">
                            Built the R&D organisation of a relocation-management SaaS from scratch: hired and led 20+ engineers, set up the
                            processes and the career paths.
                        </CareerEntry>
                        <CareerEntry years="2021 – 2023" title="CTO" company="OnTheWay · Nürnberg">
                            Took a logistics marketplace from MVP to production with a team of five: React Native apps on iOS and Android,
                            NestJS microservices in a monorepo.
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
                            Lead product engineering on a B2B SaaS asset operations platform. Reworked the SDLC and CI/CD end to end, moved
                            the core backend from Express to NestJS and made AI-native engineering part of the team&apos;s daily work.
                        </CareerEntry>
                    </ol>
                </div>
            </div>
        </section>
    );
}
