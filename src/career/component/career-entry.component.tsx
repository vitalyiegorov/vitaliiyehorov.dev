import type { ReactNode } from 'react';

interface Props {
    readonly years: string;
    readonly title: string;
    readonly company: ReactNode;
    readonly children: ReactNode;
}

export function CareerEntry({ years, title, company, children }: Props) {
    return (
        <li className="reveal relative pb-16 pl-7 last:pb-0 sm:pl-16 lg:pb-24">
            <span
                data-cast-node
                className="rail-dot absolute top-1 left-0 size-3 -translate-x-1/2 rounded-full border-2 border-accent"
                aria-hidden="true"
            />
            <p className="font-mono text-sm tracking-[0.14em] text-accent">{years}</p>
            <h3 className="display readable mt-3 text-[clamp(2rem,4vw,3.75rem)] font-semibold">{title}</h3>
            <p className="telemetry mt-3 text-muted">{company}</p>
            <p className="readable mt-5 max-w-xl text-lg leading-relaxed text-muted text-pretty">{children}</p>
        </li>
    );
}
