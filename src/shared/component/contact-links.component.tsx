import { ArrowIcon } from './arrow-icon.component';

import { site } from '@/site/constant/site.constant';

interface Props {
    readonly size: 'md' | 'lg';
}

export function ContactLinks({ size }: Props) {
    const base =
        size === 'lg'
            ? 'group inline-flex min-h-14 w-full items-center justify-between gap-6 rounded-full px-7 text-lg font-medium transition-colors duration-300 sm:min-h-16 sm:w-auto sm:text-xl'
            : 'group inline-flex min-h-12 items-center gap-3 rounded-full px-5 text-[0.95rem] font-medium transition-colors duration-300 lg:text-base';
    const quiet = `${base} border border-fg/30 bg-fg/5 text-fg hover:border-accent hover:bg-accent/15 hover:text-accent`;

    return (
        <ul className={size === 'lg' ? 'grid grid-cols-2 gap-3 sm:flex sm:flex-row sm:flex-wrap' : 'flex flex-wrap gap-2.5'}>
            <li>
                <a
                    className={`${base} bg-accent text-bg-deep hover:bg-fg`}
                    href={site.linkedin}
                    target="_blank"
                    rel="noopener noreferrer me"
                >
                    LinkedIn
                    <ArrowIcon className="link-arrow" />
                </a>
            </li>
            <li>
                <a className={quiet} href={site.github} target="_blank" rel="noopener noreferrer me">
                    GitHub
                    <ArrowIcon className="link-arrow" />
                </a>
            </li>
            <li className="col-span-2">
                <a className={quiet} href={site.emailHref}>
                    {site.email}
                    <ArrowIcon className="link-arrow" />
                </a>
            </li>
        </ul>
    );
}
