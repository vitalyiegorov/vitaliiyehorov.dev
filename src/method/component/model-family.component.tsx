interface Props {
    readonly name: string;
}

export function ModelFamily({ name }: Props) {
    return (
        <li className="rounded-md border border-line bg-transparent px-2.5 py-1.5 font-mono text-xs tracking-wider text-muted">{name}</li>
    );
}
