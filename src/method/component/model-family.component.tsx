interface Props {
    readonly name: string;
}

export function ModelFamily({ name }: Props) {
    return (
        <li className="rounded-full border border-line-strong bg-bg-deep/50 px-3.5 py-1.5 font-mono text-xs tracking-wider text-fg">
            {name}
        </li>
    );
}
