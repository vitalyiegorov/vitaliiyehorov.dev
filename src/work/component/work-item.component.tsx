import type { ReactNode } from 'react';

interface Props {
    readonly index: string;
    readonly kind: string;
    readonly title: string;
    readonly links: ReactNode;
    readonly children: ReactNode;
}

export function WorkItem({ index, kind, title, links, children }: Props) {
    return (
        <li data-cast-row className="work-row reveal border-t border-line py-8 lg:py-10">
            <p className="flex flex-wrap items-center gap-x-4 gap-y-1">
                <span data-cast-index className="font-mono text-sm tracking-[0.14em] text-accent">
                    {index}
                </span>
                <span className="telemetry">{kind}</span>
            </p>
            <h3 translate="no" className="display readable mt-4 text-[clamp(2.5rem,4.3vw,4.2rem)] font-semibold">
                {title}
            </h3>
            <p className="readable mt-4 max-w-xl text-base leading-relaxed text-muted text-pretty sm:text-lg">{children}</p>
            <ul className="mt-6 flex flex-wrap gap-2">{links}</ul>
        </li>
    );
}
