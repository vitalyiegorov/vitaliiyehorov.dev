import Link from 'next/link';

import { LostOrbit } from './lost-orbit.component';

import { ArrowIcon } from '@/shared/component/arrow-icon.component';

export function LostSection() {
    return (
        <section id="top" aria-labelledby="lost-title" className="relative isolate flex min-h-svh flex-col justify-end overflow-clip">
            <LostOrbit />
            <div className="relative mx-auto grid w-full max-w-[96rem] gap-10 px-5 pt-[max(24rem,47svh)] pb-14 sm:px-8 sm:pt-[max(34rem,56svh)] lg:grid-cols-12 lg:gap-8 lg:px-14 lg:pt-36 lg:pb-20">
                <div className="lg:col-span-7 min-[87.5rem]:col-span-6">
                    <p className="rise [--rise:0] telemetry mb-6 flex items-center gap-3">
                        <span className="signal-dot lost-blink" aria-hidden="true" />
                        <span className="text-accent">Err 404</span>
                        <span>Signal lost</span>
                    </p>
                    <h1
                        id="lost-title"
                        className="display readable rise [--rise:1] text-[clamp(4.2rem,22vw,13rem)] font-bold text-fg lg:text-[clamp(6rem,11vw,13rem)]"
                    >
                        Signal
                        <br />
                        <span className="text-accent">lost.</span>
                    </h1>
                    <p className="rise [--rise:2] readable mt-8 max-w-lg text-lg leading-relaxed text-muted text-pretty sm:text-xl">
                        Nothing orbits at this address. The link may be out of date, or the page never existed. The rest of the system is
                        still running.
                    </p>
                    <ul className="rise [--rise:3] mt-10 grid grid-cols-2 gap-2.5 sm:flex sm:flex-wrap">
                        <li>
                            <Link
                                className="group inline-flex min-h-12 items-center gap-3 rounded-full bg-accent px-5 text-[0.95rem] font-medium text-bg-deep transition-colors duration-300 hover:bg-fg max-sm:w-full max-sm:justify-between max-sm:tracking-[-0.01em] lg:min-h-14 lg:px-7 lg:text-lg"
                                href="/"
                            >
                                Back to orbit
                                <ArrowIcon className="link-arrow" />
                            </Link>
                        </li>
                        <li>
                            <Link
                                className="group inline-flex min-h-12 items-center gap-3 rounded-full border border-fg/30 bg-fg/5 px-5 text-[0.95rem] font-medium text-fg transition-colors duration-300 hover:border-accent hover:bg-accent/15 hover:text-accent max-sm:w-full max-sm:justify-between max-sm:tracking-[-0.01em] lg:min-h-14 lg:px-7 lg:text-lg"
                                href="/#contact"
                            >
                                Report it
                                <ArrowIcon className="link-arrow" />
                            </Link>
                        </li>
                    </ul>
                </div>
                <dl className="rise [--rise:4] grid grid-cols-2 gap-x-6 gap-y-5 self-end sm:grid-cols-4 lg:col-span-5 lg:col-start-8 lg:grid-cols-2 lg:gap-x-8 min-[87.5rem]:col-span-4 min-[87.5rem]:col-start-9">
                    <div className="flex flex-col gap-2 border-t border-line-strong pt-4">
                        <dt className="telemetry text-muted">Status</dt>
                        <dd className="readable m-0 font-mono text-sm tracking-wider text-fg uppercase">404 · Not found</dd>
                    </div>
                    <div className="flex flex-col gap-2 border-t border-line-strong pt-4">
                        <dt className="telemetry text-muted">Route</dt>
                        <dd className="readable m-0 font-mono text-sm tracking-wider text-fg uppercase">Unknown</dd>
                    </div>
                    <div className="flex flex-col gap-2 border-t border-line-strong pt-4">
                        <dt className="telemetry text-muted">Core</dt>
                        <dd className="readable m-0 flex items-center gap-2 font-mono text-sm tracking-wider text-accent uppercase">
                            <span className="signal-dot" aria-hidden="true" />
                            Online
                        </dd>
                    </div>
                    <div className="flex flex-col gap-2 border-t border-line-strong pt-4">
                        <dt className="telemetry text-muted">Fleet</dt>
                        <dd className="readable m-0 font-mono text-sm tracking-wider text-fg uppercase">6 in orbit · 1 lost</dd>
                    </div>
                </dl>
            </div>
        </section>
    );
}
