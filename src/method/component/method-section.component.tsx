import { MethodStep } from './method-step.component';
import { ModelFamily } from './model-family.component';

import { TelemetryLabel } from '@/shared/component/telemetry-label.component';

export function MethodSection() {
    return (
        <section id="method" data-orbit-stage aria-labelledby="method-title" className="relative pt-20 pb-24 sm:pt-24 sm:pb-32 lg:pt-14">
            <div className="mx-auto grid max-w-[96rem] gap-10 px-5 sm:px-8 lg:grid-cols-12 lg:gap-8 lg:px-14">
                <div className="lg:col-span-5 lg:flex lg:flex-col lg:pt-10 lg:pb-10">
                    <div className="lg:flex-1">
                        <div className="lg:sticky lg:top-24">
                            <TelemetryLabel index="03">Method · how I work with agents</TelemetryLabel>
                            <h2
                                id="method-title"
                                className="display readable mt-6 text-[clamp(2.6rem,5.4vw,5.5rem)] font-semibold text-balance"
                            >
                                One orchestrator. Many agents. Nothing merges unreviewed.
                            </h2>
                            <p className="readable mt-6 max-w-md text-lg leading-relaxed text-muted text-pretty lg:text-balance">
                                I plan the work, agents build it in parallel, and I own the merge.
                            </p>
                        </div>
                    </div>
                    <div className="mt-10 lg:mt-12">
                        <p className="telemetry text-muted">Model families in rotation</p>
                        <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Model families">
                            <ModelFamily name="Claude" />
                            <ModelFamily name="GPT" />
                            <ModelFamily name="Gemini" />
                            <ModelFamily name="DeepSeek" />
                        </ul>
                    </div>
                </div>
                <ol className="lg:col-span-6 lg:col-start-7 lg:-m-6 lg:rounded-2xl lg:bg-linear-to-r lg:from-bg-deep/90 lg:via-bg-deep/70 lg:via-78% lg:to-transparent lg:p-6">
                    <MethodStep index="01 / Plan" title="Plan once">
                        One session reads the code, writes the plan and splits it into narrow briefs.
                    </MethodStep>
                    <MethodStep index="02 / Delegate" title="Fan out">
                        Agents from different model families build in parallel.
                    </MethodStep>
                    <MethodStep index="03 / Review" title="Review by council">
                        One reviewer per model family reads the diff. A UI change stays only if it wins a blind before-and-after vote.
                    </MethodStep>
                </ol>
            </div>
        </section>
    );
}
