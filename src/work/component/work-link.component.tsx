import { ArrowIcon } from '@/shared/component/arrow-icon.component';

interface Props {
    readonly href: string;
    readonly label: string;
}

export function WorkLink({ href, label }: Props) {
    return (
        <li>
            <a
                className="work-link group inline-flex min-h-11 items-center gap-2 rounded-full border border-line-strong px-4 font-mono text-xs tracking-wider text-fg uppercase transition-colors duration-300 hover:border-accent hover:text-accent"
                href={href}
                target="_blank"
                rel="noopener noreferrer"
            >
                {label}
                <ArrowIcon className="link-arrow" />
            </a>
        </li>
    );
}
