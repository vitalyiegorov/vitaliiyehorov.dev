import type { ReactNode } from 'react';

interface Props {
    readonly index: string;
    readonly children: ReactNode;
}

export function TelemetryLabel({ index, children }: Props) {
    return (
        <p className="telemetry flex items-center gap-3">
            <span className="text-accent">{index}</span>
            <span className="h-px w-8 bg-line-strong" aria-hidden="true" />
            <span>{children}</span>
        </p>
    );
}
