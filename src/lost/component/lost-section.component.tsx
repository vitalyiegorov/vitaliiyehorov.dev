import Link from 'next/link';

import { LostOrbit } from './lost-orbit.component';

import { ArrowIcon } from '@/shared/component/arrow-icon.component';

export function LostSection() {
    return (
        <section id="top" aria-labelledby="lost-title" className="relative isolate flex min-h-svh flex-col overflow-clip lg:justify-center">
            <LostOrbit />
            <div className="relative mx-auto grid w-full max-w-[96rem] gap-12 px-5 pt-[clamp(8.5rem,calc(100svh-26rem),24rem)] pb-14 sm:px-8 sm:pt-[clamp(14rem,calc(100svh-34rem),30rem)] lg:grid-cols-12 lg:gap-8 lg:px-14 lg:pt-28 lg:pb-16">
                <div className="lg:col-span-7 min-[87.5rem]:col-span-6">
                    <p className="rise [--rise:0] telemetry mb-5 flex items-center gap-3 sm:mb-6">
                        <span className="signal-dot lost-blink" aria-hidden="true" />
                        <span className="text-accent">Err 404</span>
                        <span>Signal lost</span>
                    </p>
                    <h1
                        id="lost-title"
                        className="display readable rise [--rise:1] text-[clamp(4.2rem,22vw,6.5rem)] font-bold text-fg sm:text-[clamp(6rem,14vw,9rem)] lg:text-[clamp(6rem,11vw,13rem)]"
                    >
                        Signal
                        <br />
                        <span className="text-accent">lost.</span>
                    </h1>
                    <p className="rise [--rise:2] readable mt-6 max-w-lg text-lg leading-relaxed text-muted text-pretty sm:mt-8 sm:text-xl">
                        Nothing orbits at this address. The link may be out of date, or the page never existed. The rest of the site is
                        still running.
                    </p>
                    <ul className="rise [--rise:3] mt-7 grid grid-cols-2 gap-2.5 sm:mt-10 sm:flex sm:flex-wrap">
                        <li>
                            <Link
                                className="group inline-flex min-h-12 items-center gap-2 rounded-full bg-accent px-4 text-[0.95rem] font-medium whitespace-nowrap text-bg-deep transition-colors duration-300 hover:bg-fg max-sm:w-full max-sm:justify-center max-sm:tracking-[-0.01em] sm:gap-3 sm:px-5 lg:min-h-14 lg:px-7 lg:text-lg"
                                href="/"
                            >
                                <ArrowIcon className="lost-back-arrow shrink-0" />
                                Back to orbit
                            </Link>
                        </li>
                        <li>
                            <Link
                                className="group inline-flex min-h-12 items-center gap-2 rounded-full border border-fg/30 bg-fg/5 px-4 text-[0.95rem] font-medium whitespace-nowrap text-fg transition-colors duration-300 hover:border-accent hover:bg-accent/15 hover:text-accent max-sm:w-full max-sm:justify-center max-sm:tracking-[-0.01em] sm:gap-3 sm:px-5 lg:min-h-14 lg:px-7 lg:text-lg"
                                href="/#contact"
                            >
                                Contact me
                                <ArrowIcon className="link-arrow shrink-0" />
                            </Link>
                        </li>
                    </ul>
                </div>
                <nav
                    aria-label="Sections of the home page"
                    className="rise [--rise:4] self-end lg:col-span-4 lg:-m-5 lg:rounded-xl lg:bg-bg-deep/70 lg:p-5 lg:backdrop-blur-sm lg:col-start-9 min-[87.5rem]:col-span-3 min-[87.5rem]:col-start-10"
                >
                    <p className="telemetry text-muted">Or jump to a known orbit</p>
                    <ul className="mt-4 border-b border-line-strong">
                        <li>
                            <Link
                                className="group flex min-h-12 items-center gap-4 border-t border-line-strong font-mono text-sm tracking-wider text-fg uppercase transition-colors duration-300 hover:text-accent"
                                href="/#method"
                            >
                                <span className="text-accent">03</span>
                                <span className="flex-1">Method</span>
                                <ArrowIcon className="link-arrow shrink-0" />
                            </Link>
                        </li>
                        <li>
                            <Link
                                className="group flex min-h-12 items-center gap-4 border-t border-line-strong font-mono text-sm tracking-wider text-fg uppercase transition-colors duration-300 hover:text-accent"
                                href="/#career"
                            >
                                <span className="text-accent">04</span>
                                <span className="flex-1">Career</span>
                                <ArrowIcon className="link-arrow shrink-0" />
                            </Link>
                        </li>
                        <li>
                            <Link
                                className="group flex min-h-12 items-center gap-4 border-t border-line-strong font-mono text-sm tracking-wider text-fg uppercase transition-colors duration-300 hover:text-accent"
                                href="/#work"
                            >
                                <span className="text-accent">05</span>
                                <span className="flex-1">Selected work</span>
                                <ArrowIcon className="link-arrow shrink-0" />
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </section>
    );
}
