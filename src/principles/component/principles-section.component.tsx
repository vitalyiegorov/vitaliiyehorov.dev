import { Principle } from './principle.component';

import { TelemetryLabel } from '@/shared/component/telemetry-label.component';

export function PrinciplesSection() {
    return (
        <section id="principles" data-orbit-stage aria-labelledby="principles-title" className="relative py-28 sm:py-36">
            <div className="mx-auto max-w-[96rem] px-5 sm:px-8 lg:px-14">
                <div className="reveal">
                    <TelemetryLabel index="06">Principles</TelemetryLabel>
                    <h2 id="principles-title" className="sr-only">
                        Principles
                    </h2>
                </div>
                <ol className="mt-10">
                    <Principle index="P.01" title="Teams own their technical decisions.">
                        I hire for judgment and then trust it. The people closest to the code make the calls about it.
                    </Principle>
                    <Principle index="P.02" title="Direct feedback, real ownership, clear plans.">
                        Everyone knows where they stand, what we are building next and who owns each piece of it.
                    </Principle>
                    <Principle index="P.03" title="I still write code.">
                        Most days, as the commit count above shows. It keeps my estimates honest and my reviews useful.
                    </Principle>
                </ol>
                <div className="reveal mt-6 border-t border-line pt-10">
                    <p className="telemetry">Stack</p>
                    <p className="readable mt-5 text-[clamp(1.35rem,2.4vw,2.1rem)] leading-snug font-medium text-balance">
                        TypeScript · Node.js / NestJS · React · React Native · Next.js · Go
                        <span className="text-muted"> · CI/CD · monorepos · microservices</span>
                    </p>
                </div>
            </div>
        </section>
    );
}
