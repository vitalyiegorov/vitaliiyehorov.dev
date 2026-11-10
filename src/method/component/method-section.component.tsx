import { MethodStep } from './method-step.component';
import { ModelFamily } from './model-family.component';

import { TelemetryLabel } from '@/shared/component/telemetry-label.component';

export function MethodSection() {
    return (
        <section id="method" data-orbit-stage aria-labelledby="method-title" className="relative py-28 sm:py-36">
            <div className="mx-auto grid max-w-[96rem] gap-10 px-5 sm:px-8 lg:grid-cols-12 lg:gap-8 lg:px-14">
                <div className="lg:sticky lg:top-[16vh] lg:col-span-5 lg:self-start">
                    <div>
                        <TelemetryLabel index="03">Method · how I work with agents</TelemetryLabel>
                        <h2
                            id="method-title"
                            className="display readable mt-6 text-[clamp(2.6rem,5.4vw,5.5rem)] font-semibold text-balance"
                        >
                            One orchestrator. Many agents. Nothing merges unreviewed.
                        </h2>
                        <p className="readable mt-6 max-w-md text-lg leading-relaxed text-muted text-pretty">
                            Every task runs through one orchestrator session that plans the work, splits it and sends it to agents working
                            in parallel. I set the rules, review the result and own the merge.
                        </p>
                        <p className="telemetry mt-10 text-muted">Model families in rotation</p>
                        <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Model families">
                            <ModelFamily name="Claude" />
                            <ModelFamily name="GPT / Codex" />
                            <ModelFamily name="Gemini" />
                            <ModelFamily name="DeepSeek" />
                            <ModelFamily name="GLM" />
                            <ModelFamily name="Kimi" />
                            <ModelFamily name="Grok" />
                        </ul>
                    </div>
                </div>
                <ol className="lg:col-span-6 lg:col-start-7 lg:-m-6 lg:rounded-2xl lg:bg-bg-deep/35 lg:p-6">
                    <MethodStep index="01 / Plan" title="Plan once">
                        One session owns the task. It reads the code, writes the plan and cuts it into briefs narrow enough to hand off.
                    </MethodStep>
                    <MethodStep index="02 / Delegate" title="Fan out">
                        Briefs go to agents running in parallel across model families. Bulk work and research go to one family, judgment and
                        UI to another.
                    </MethodStep>
                    <MethodStep index="03 / Council" title="Review by council">
                        Before merge, one reviewer from each model family reads the diff on its own. Different models catch different
                        mistakes.
                    </MethodStep>
                    <MethodStep index="04 / Blind vote" title="Earn every pixel">
                        A UI change stays only if vision models prefer it in a blind before-and-after vote on real screenshots.
                    </MethodStep>
                    <MethodStep index="05 / Own" title="Own it to merge">
                        One session, one pull request, owned until it merges. Checks are never weakened to go faster.
                    </MethodStep>
                </ol>
            </div>
        </section>
    );
}
