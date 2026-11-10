import { StatCounter } from './stat-counter.component';

import type { ReactNode } from 'react';

interface Props {
    readonly value: number;
    readonly label: string;
    readonly children?: ReactNode;
}

export function Stat({ value, label, children }: Props) {
    return (
        <div className="reveal flex flex-col gap-3 border-t border-line pt-5 sm:pt-6">
            <dt className="telemetry order-2 text-muted">{label}</dt>
            <dd className="order-1 m-0">
                <span className="display readable block text-[clamp(3.25rem,7vw,7rem)] font-semibold tabular-nums text-fg">
                    <StatCounter value={value} />
                    <span className="sr-only">{new Intl.NumberFormat('en-US').format(value)}</span>
                </span>
            </dd>
            {children ? <dd className="order-3 m-0 max-w-xs text-sm leading-relaxed text-faint">{children}</dd> : null}
        </div>
    );
}
