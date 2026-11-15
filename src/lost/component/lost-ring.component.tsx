import type { ReactNode } from 'react';

interface Props {
    readonly className: string;
    readonly children?: ReactNode;
}

export function LostRing({ className, children }: Props) {
    return (
        <div className={`lost-ring ${className}`}>
            <div className="lost-spin">{children}</div>
        </div>
    );
}
