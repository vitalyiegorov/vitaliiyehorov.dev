import type { ReactNode } from 'react';

interface Props {
    readonly index: string;
    readonly label: string;
    readonly title: string;
    readonly children: ReactNode;
}

export function MethodStep({ index, label, title, children }: Props) {
    return (
        <li
            data-cast-step
            className="step flex min-h-[22vh] flex-col justify-center border-t border-line py-8 last:pb-0 lg:min-h-[34vh] lg:justify-start lg:py-10 lg:last:pb-0"
        >
            <p className="telemetry relative lg:-mt-px">
                <span
                    className="step-mark absolute top-1/2 -left-3.5 size-1.5 -translate-y-1/2 rounded-full bg-accent shadow-[0_0_10px_var(--accent)]"
                    aria-hidden="true"
                />
                <span className="text-accent">{index}</span> / {label}
            </p>
            <h3 className="display display-mid readable mt-4 text-[clamp(2.2rem,4.4vw,4.25rem)] font-semibold">{title}</h3>
            <p className="step-body readable mt-5 max-w-lg text-lg leading-relaxed text-muted text-pretty">{children}</p>
            <div className="lg:hidden" aria-hidden="true">
                <div data-cast-slot="method-step" className="cast-slot mt-6 h-44" />
            </div>
        </li>
    );
}
