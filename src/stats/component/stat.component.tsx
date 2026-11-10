import { StatCounter } from './stat-counter.component';

interface Props {
    readonly value: number;
    readonly label: string;
}

export function Stat({ value, label }: Props) {
    return (
        <div className="reveal flex flex-col gap-3 border-t border-line pt-5 sm:pt-6">
            <dt className="telemetry readable order-2 text-muted">{label}</dt>
            <dd className="order-1 m-0">
                <span className="display display-numeral readable block text-[clamp(4.25rem,9.8vw,8.8rem)] font-semibold tabular-nums text-fg">
                    <StatCounter value={value} />
                    <span className="sr-only">{new Intl.NumberFormat('en-US').format(value)}</span>
                </span>
            </dd>
        </div>
    );
}
