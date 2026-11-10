import type { ReactNode } from 'react';

interface Props {
    readonly index: string;
    readonly children: ReactNode;
}

export function TelemetryLabel({ index, children }: Props) {
    return (
        <p className="telemetry flex items-center gap-2 sm:gap-3">
            <span className="text-accent">{index}</span>
            <span className="h-px w-5 bg-line-strong sm:w-8" aria-hidden="true" />
            <span>{children}</span>
        </p>
    );
}
