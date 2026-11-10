import type { ReactNode } from 'react';

interface Props {
    readonly index: string;
    readonly title: string;
    readonly children: ReactNode;
}

export function Principle({ index, title, children }: Props) {
    return (
        <li className="reveal grid gap-4 border-t border-line py-10 sm:py-14 lg:grid-cols-12 lg:gap-8">
            <p className="font-mono text-sm tracking-[0.14em] text-accent lg:col-span-2">{index}</p>
            <h3 className="display readable text-[clamp(2.3rem,5vw,4.75rem)] font-semibold text-balance lg:col-span-6">{title}</h3>
            <p className="readable max-w-md text-lg leading-relaxed text-muted text-pretty lg:col-span-4 lg:pt-3">{children}</p>
        </li>
    );
}
