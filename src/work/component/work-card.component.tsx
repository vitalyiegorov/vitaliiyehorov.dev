import type { ReactNode } from 'react';

interface Props {
    readonly index: string;
    readonly kind: string;
    readonly title: string;
    readonly className?: string;
    readonly links: ReactNode;
    readonly children: ReactNode;
}

export function WorkCard({ index, kind, title, className = '', links, children }: Props) {
    return (
        <article className={`reveal panel flex flex-col justify-between gap-10 rounded-3xl p-6 sm:p-8 lg:p-10 ${className}`}>
            <div>
                <div className="flex items-center justify-between gap-4">
                    <p className="telemetry text-accent">{index}</p>
                    <p className="telemetry text-right">{kind}</p>
                </div>
                <h3 translate="no" className="display mt-8 text-[clamp(2.1rem,3.6vw,3.5rem)] font-semibold">
                    {title}
                </h3>
                <p className="mt-4 max-w-xl text-base leading-relaxed text-muted text-pretty sm:text-lg">{children}</p>
            </div>
            <ul className="flex flex-wrap gap-2">{links}</ul>
        </article>
    );
}
