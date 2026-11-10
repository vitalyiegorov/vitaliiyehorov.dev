interface Props {
    readonly className?: string;
}

export function ArrowIcon({ className }: Props) {
    return (
        <svg className={className} width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
            <path d="M3.5 10.5 10.5 3.5M5 3.5h5.5V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" />
        </svg>
    );
}
