export function SiteFooter() {
    return (
        <footer className="relative z-10 mx-auto w-full max-w-[96rem] px-5 pb-8 sm:px-8 lg:px-14">
            <div className="hairline" />
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <p className="telemetry text-muted">Vienna, Austria</p>
                <p className="telemetry text-muted">English · Ukrainian · German</p>
                <p className="telemetry">© 2026 Vitalii Yehorov</p>
                <a className="telemetry flex min-h-11 items-center text-muted hover:text-accent sm:min-h-0 lg:justify-self-end" href="#top">
                    Back to top ↑
                </a>
            </div>
        </footer>
    );
}
