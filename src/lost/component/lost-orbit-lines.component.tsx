interface Props {
    readonly side: 'back' | 'front';
}

export function LostOrbitLines({ side }: Props) {
    const clipId = `lost-orbit-${side}`;

    return (
        <svg className="lost-lines" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
            <defs>
                <clipPath id={clipId}>
                    <rect x="0" y={side === 'back' ? 0 : 50} width="100" height="50" />
                </clipPath>
            </defs>
            <g transform="rotate(-16 50 50)">
                <g clipPath={`url(#${clipId})`}>
                    <ellipse className="lost-line" cx="50" cy="50" rx="17" ry="5.81" />
                    <ellipse className="lost-line" cx="50" cy="50" rx="28" ry="9.58" />
                    <ellipse className="lost-line" cx="50" cy="50" rx="39" ry="13.34" />
                    <ellipse className="lost-line lost-line-broken" cx="50" cy="50" rx="50" ry="17.1" />
                </g>
            </g>
        </svg>
    );
}
