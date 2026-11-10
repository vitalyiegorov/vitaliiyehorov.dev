import { WorkCard } from './work-card.component';
import { WorkLink } from './work-link.component';

import { TelemetryLabel } from '@/shared/component/telemetry-label.component';

export function WorkSection() {
    return (
        <section id="work" data-orbit-stage aria-labelledby="work-title" className="relative isolate overflow-x-clip pt-24 pb-28 sm:pb-36">
            <div className="mx-auto max-w-[96rem] px-5 sm:px-8 lg:px-14">
                <div className="reveal max-w-3xl">
                    <TelemetryLabel index="05">Selected work</TelemetryLabel>
                    <h2 id="work-title" className="display readable mt-5 text-[clamp(2.6rem,5.4vw,5.25rem)] font-semibold text-balance">
                        Things I build and maintain.
                    </h2>
                </div>
                <div data-orbit-cover className="mt-10 grid gap-4 lg:grid-cols-12 lg:gap-5">
                    <WorkCard
                        className="lg:col-span-6"
                        index="W.01"
                        kind="Open source · React Native"
                        title="Budgie"
                        links={
                            <>
                                <WorkLink href="https://www.budgie.at" label="budgie.at" />
                                <WorkLink href="https://github.com/budgie-at/budgie" label="GitHub" />
                            </>
                        }
                    >
                        Privacy-first, offline-first money app with an AI chat over your own data.
                    </WorkCard>
                    <WorkCard
                        className="lg:col-span-6"
                        index="W.02"
                        kind="Open source · Expo"
                        title="Suuudokuuu"
                        links={
                            <>
                                <WorkLink href="https://suuudokuuu.com" label="suuudokuuu.com" />
                                <WorkLink href="https://github.com/vitalyiegorov/suuudokuuu" label="GitHub" />
                            </>
                        }
                    >
                        Sudoku for web, iOS and Android from one codebase.
                    </WorkCard>
                    <WorkCard
                        className="lg:col-span-6"
                        index="W.03"
                        kind="Product · Next.js · LLMs"
                        title="JointLens"
                        links={<WorkLink href="https://jointlens.ai" label="jointlens.ai" />}
                    >
                        An AI second opinion on MRI, CT and X‑ray scans of eleven joints. Several models read the scan and agree on one
                        report.
                    </WorkCard>
                    <WorkCard
                        className="lg:col-span-6"
                        index="W.04"
                        kind="Open source · TypeScript"
                        title="rnw-community"
                        links={<WorkLink href="https://github.com/rnw-community/rnw-community" label="GitHub" />}
                    >
                        26 npm packages for NestJS and React Native. The largest gets 325k downloads a month.
                    </WorkCard>
                    <WorkCard
                        className="lg:col-span-6"
                        index="W.05"
                        kind="Open source · Go"
                        title="Tart Runner Fleet"
                        links={<WorkLink href="https://github.com/vitalyiegorov/tart-runner-fleet" label="GitHub" />}
                    >
                        GitHub Actions runners on Apple‑silicon Macs. Every job gets a throwaway VM.
                    </WorkCard>
                    <WorkCard
                        className="lg:col-span-6"
                        index="W.06"
                        kind="Upstream contributions"
                        title="Agent tooling"
                        links={
                            <>
                                <WorkLink
                                    href="https://github.com/pingdotgg/t3code/pulls?q=is%3Apr+author%3Avitalyiegorov"
                                    label="t3code"
                                />
                                <WorkLink href="https://github.com/callstackincubator/simlock" label="simlock" />
                                <WorkLink href="https://github.com/callstack/agent-device" label="agent-device" />
                                <WorkLink href="https://github.com/MobAI-App/simslim" label="simslim" />
                            </>
                        }
                    >
                        30 pull requests opened to t3code, plus fixes to simlock, agent‑device and simslim.
                    </WorkCard>
                </div>
            </div>
        </section>
    );
}
