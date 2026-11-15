import { site } from '@/site/constant/site.constant';

export function SiteFooter() {
    return (
        <footer className="relative z-10 mx-auto w-full max-w-[96rem] px-5 pb-8 sm:px-8 lg:px-14">
            <div className="hairline" />
            <div className="mt-6 grid items-center gap-2 lg:grid-cols-4 lg:gap-4">
                <div className="flex items-center justify-between gap-4 lg:contents">
                    <p className="telemetry text-muted">Vienna, Austria</p>
                    <p className="telemetry text-muted">English · Ukrainian</p>
                </div>
                <div className="flex items-center justify-between gap-4 lg:contents">
                    <p className="telemetry">
                        © 2026 Vitalii Yehorov
                        <span className="block lg:inline">
                            <span className="max-lg:hidden"> · </span>
                            Updated{' '}
                            <time dateTime={site.updated}>
                                {new Intl.DateTimeFormat('en-GB', {
                                    day: 'numeric',
                                    month: 'short',
                                    year: 'numeric',
                                    timeZone: 'UTC'
                                }).format(new Date(site.updated))}
                            </time>
                        </span>
                    </p>
                    <a className="telemetry flex min-h-11 items-center text-muted hover:text-accent lg:justify-self-end" href="#top">
                        Back to top ↑
                    </a>
                </div>
            </div>
        </footer>
    );
}
