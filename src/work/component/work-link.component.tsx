import type { ReactNode } from 'react';

import { ArrowIcon } from '@/shared/component/arrow-icon.component';

interface Props {
    readonly href: string;
    readonly label: string;
    readonly context?: string;
    readonly glyph?: ReactNode;
}

export function WorkLink({ href, label, context, glyph }: Props) {
    return (
        <li>
            <a
                className={`work-link group inline-flex min-h-11 items-center gap-2 rounded-full border border-line-strong px-3.5 font-mono text-xs tracking-wider text-fg uppercase transition-colors duration-300 hover:border-accent hover:text-accent focus-visible:border-transparent sm:px-4 ${glyph === undefined ? '' : 'bg-fg/[0.13]'}`}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
            >
                {context === undefined ? null : <span className="sr-only">{context} </span>}
                {glyph}
                {label}
                {glyph === undefined ? <ArrowIcon className="link-arrow" /> : null}
            </a>
        </li>
    );
}
