import { GooglePlayGlyph } from './google-play-glyph.component';
import { WorkLink } from './work-link.component';

interface Props {
    readonly id: string;
    readonly project: string;
}

export function GooglePlayLink({ id, project }: Props) {
    return (
        <WorkLink
            href={`https://play.google.com/store/apps/details?id=${id}`}
            label="Google Play"
            context={`${project} on`}
            glyph={<GooglePlayGlyph />}
        />
    );
}
