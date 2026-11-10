interface Props {
    readonly name: string;
}

export function ModelFamily({ name }: Props) {
    return (
        <li className="rounded-md border border-line-strong bg-bg-deep/50 px-2 py-1.5 font-mono text-[0.8125rem] tracking-wider whitespace-nowrap text-fg">
            {name}
        </li>
    );
}
