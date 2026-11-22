import Image from 'next/image';

import type { ReactNode } from 'react';

interface Props {
    readonly index: string;
    readonly kind: string;
    readonly title: string;
    readonly icon?: string;
    readonly install?: ReactNode;
    readonly links?: ReactNode;
    readonly children: ReactNode;
}

export function WorkItem({ index, kind, title, icon, install, links, children }: Props) {
    return (
        <li data-cast-row className="work-row reveal border-t border-line py-8 lg:py-10">
            <p className="flex flex-wrap items-center gap-x-4 gap-y-1">
                <span data-cast-index className="font-mono text-sm tracking-[0.14em] text-accent">
                    {index}
                </span>
                <span className="telemetry">{kind}</span>
            </p>
            <h3
                translate="no"
                className="display display-mid readable mt-4 flex items-center gap-3 text-[clamp(2.5rem,4.3vw,4.2rem)] font-semibold sm:gap-4"
            >
                {icon === undefined ? null : (
                    <Image
                        src={icon}
                        alt=""
                        width={120}
                        height={120}
                        className="app-icon size-[0.8em] shrink-0 rounded-[22.5%] outline-1 -outline-offset-1 outline-fg/15"
                    />
                )}
                {title}
            </h3>
            <p className="readable mt-4 max-w-xl text-base leading-relaxed text-muted text-pretty sm:text-lg">{children}</p>
            <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2.5">
                {install === undefined ? null : <ul className="flex flex-wrap gap-2.5">{install}</ul>}
                {links === undefined ? null : <ul className="flex flex-wrap gap-2.5">{links}</ul>}
            </div>
        </li>
    );
}
