import { ContactLinks } from '@/shared/component/contact-links.component';

export function HeroSection() {
    return (
        <section
            id="top"
            data-orbit-stage
            aria-labelledby="hero-title"
            className="relative flex min-h-svh flex-col justify-end overflow-clip"
        >
            <div className="mx-auto grid w-full max-w-[96rem] gap-10 px-5 pt-32 pb-10 sm:px-8 sm:pb-14 lg:grid-cols-12 lg:items-end lg:gap-8 lg:px-14 lg:pb-16">
                <div data-orbit-shield="narrow" className="hero-exit-slow lg:col-span-6 min-[87.5rem]:col-span-7">
                    <p className="rise [--rise:0] telemetry mb-6 flex items-center gap-3">
                        <span className="signal-dot" aria-hidden="true" />
                        <span className="text-accent">01</span>
                        <span>Orchestrator online</span>
                    </p>
                    <h1
                        translate="no"
                        id="hero-title"
                        className="display readable text-[clamp(4.6rem,29vw,14.5rem)] font-bold text-fg lg:text-[clamp(6rem,12.4vw,14.5rem)]"
                    >
                        Vitalii
                        <br />
                        Yehorov
                    </h1>
                </div>
                <div data-orbit-shield className="hero-exit flex flex-col gap-7 lg:col-span-6 lg:pb-3 min-[87.5rem]:col-span-5">
                    <p className="rise [--rise:1] readable text-[clamp(1.75rem,3.1vw,2.9rem)] leading-[1.02] font-semibold tracking-[-0.03em] text-balance">
                        I lead engineers and a <span className="text-accent">fleet of AI agents</span>. Both ship to production.
                    </p>
                    <p className="rise [--rise:2] readable max-w-md text-base leading-relaxed text-muted text-pretty">
                        <span className="block whitespace-nowrap">
                            Engineering Manager at{' '}
                            <a
                                className="inline-block py-4 -my-4 text-fg underline decoration-line-strong underline-offset-4 hover:decoration-accent"
                                href="https://toolsense.io"
                            >
                                ToolSense
                            </a>
                            , Vienna
                        </span>
                        <span className="block">
                            <span className="whitespace-nowrap">15+ years · ex-founder, ex-CTO</span>
                            <span className="max-sm:hidden"> · </span>
                            <span className="whitespace-nowrap max-sm:block">still writes code</span>
                        </span>
                    </p>
                    <div className="rise [--rise:3] lg:mt-1">
                        <ContactLinks size="md" />
                    </div>
                </div>
            </div>
            <div className="hero-exit mx-auto hidden w-full max-w-[96rem] items-center justify-end px-5 pb-6 sm:px-8 lg:flex lg:px-14">
                <p className="telemetry flex items-center gap-3">
                    Scroll to fly the system
                    <span className="block h-px w-10 bg-line-strong" aria-hidden="true" />
                </p>
            </div>
        </section>
    );
}
