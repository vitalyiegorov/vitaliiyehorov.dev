interface Props {
    readonly value: string;
    readonly className: string;
}

export function SectionNumeral({ value, className }: Props) {
    return (
        <span className={`numeral drift pointer-events-none absolute hidden select-none lg:block ${className}`} aria-hidden="true">
            {value}
        </span>
    );
}
