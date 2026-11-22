import { AppStoreGlyph } from './app-store-glyph.component';
import { WorkLink } from './work-link.component';

interface Props {
    readonly id: string;
    readonly project: string;
}

export function AppStoreLink({ id, project }: Props) {
    return (
        <WorkLink href={`https://apps.apple.com/app/id${id}`} label="App Store" context={`${project} on the`} glyph={<AppStoreGlyph />} />
    );
}
