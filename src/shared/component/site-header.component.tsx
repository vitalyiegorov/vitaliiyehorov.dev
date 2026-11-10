import { MotionToggle } from './motion-toggle.component';

export function SiteHeader() {
    return (
        <header className="pointer-events-none absolute inset-x-0 top-0 z-20">
            <div className="mx-auto flex max-w-[96rem] items-center justify-between px-5 pt-5 sm:px-8 sm:pt-7 lg:px-14">
                <a className="pointer-events-auto flex min-h-11 items-center gap-3" href="#top" aria-label="Vitalii Yehorov, back to top">
                    <span className="grid size-9 place-items-center rounded-full border border-line-strong font-mono text-xs tracking-wider text-fg">
                        VY
                    </span>
                    <span className="telemetry hidden text-muted sm:inline">vitaliiyehorov.dev</span>
                </a>
                <p className="telemetry hidden md:block">48.2082° N · 16.3738° E · Vienna</p>
                <div className="flex items-center gap-4 sm:gap-6">
                    <MotionToggle />
                    <a className="telemetry pointer-events-auto flex min-h-11 items-center gap-2 text-fg hover:text-accent" href="#contact">
                        <span className="signal-dot" aria-hidden="true" />
                        Contact
                    </a>
                </div>
            </div>
        </header>
    );
}
