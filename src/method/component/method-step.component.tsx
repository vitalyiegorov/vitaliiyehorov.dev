import type { ReactNode } from 'react';

interface Props {
    readonly index: string;
    readonly title: string;
    readonly children: ReactNode;
}

export function MethodStep({ index, title, children }: Props) {
    return (
        <li className="step flex min-h-[38vh] flex-col justify-center border-t border-line py-10 lg:min-h-[52vh]">
            <p className="step-index font-mono text-sm tracking-[0.14em] text-faint">{index}</p>
            <h3 className="display readable mt-4 text-[clamp(2.2rem,4.4vw,4.25rem)] font-semibold">{title}</h3>
            <p className="step-body readable mt-5 max-w-lg text-lg leading-relaxed text-muted text-pretty">{children}</p>
        </li>
    );
}
