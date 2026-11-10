import { WorkCard } from './work-card.component';
import { WorkLink } from './work-link.component';

import { TelemetryLabel } from '@/shared/component/telemetry-label.component';

export function WorkSection() {
    return (
        <section id="work" data-orbit-stage aria-labelledby="work-title" className="relative py-28 sm:py-36">
            <div className="mx-auto max-w-[96rem] px-5 sm:px-8 lg:px-14">
                <div className="reveal max-w-3xl">
                    <TelemetryLabel index="05">Selected work</TelemetryLabel>
                    <h2 id="work-title" className="display readable mt-6 text-[clamp(2.6rem,6vw,6rem)] font-semibold text-balance">
                        Things I build, ship and maintain.
                    </h2>
                </div>
                <div className="mt-14 grid gap-4 sm:mt-20 lg:grid-cols-12 lg:gap-5">
                    <WorkCard
                        className="lg:col-span-7"
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
                        A privacy-first, offline-first money app: expenses, bank sync, portfolio tracking and an AI chat over your own data.
                        Built with React Native and Expo.
                    </WorkCard>
                    <WorkCard
                        className="lg:col-span-5"
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
                        Sudoku on the web, iOS and Android from one Expo and React Native codebase.
                    </WorkCard>
                    <WorkCard
                        className="lg:col-span-5"
                        index="W.03"
                        kind="Open source · TypeScript"
                        title="rnw-community"
                        links={<WorkLink href="https://github.com/rnw-community/rnw-community" label="GitHub" />}
                    >
                        26 npm packages for NestJS, React Native and ESLint. The most used one is downloaded about 325k times a month.
                    </WorkCard>
                    <WorkCard
                        className="lg:col-span-7"
                        index="W.04"
                        kind="Open source · Go"
                        title="Tart Runner Fleet"
                        links={<WorkLink href="https://github.com/vitalyiegorov/tart-runner-fleet" label="GitHub" />}
                    >
                        A fail-closed control plane for GitHub Actions runners on Apple-silicon Macs. Every job gets a throwaway VM, a
                        deterministic scheduler decides where it runs, and admission stays bounded.
                    </WorkCard>
                    <WorkCard
                        className="lg:col-span-7"
                        index="W.05"
                        kind="Product · Next.js · LLMs"
                        title="Analyze Your Knee"
                        links={<WorkLink href="https://analyzeyourknee.com" label="analyzeyourknee.com" />}
                    >
                        Knee MRI and X-ray analysis. DICOM files are parsed in the browser, and a consortium of language models from
                        different providers agrees on a consensus read.
                    </WorkCard>
                    <WorkCard
                        className="lg:col-span-5"
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
                        30 pull requests opened to t3code, plus pull requests to simlock, agent-device and simslim: the tools that let many
                        agents share machines, simulators and devices.
                    </WorkCard>
                </div>
            </div>
        </section>
    );
}
