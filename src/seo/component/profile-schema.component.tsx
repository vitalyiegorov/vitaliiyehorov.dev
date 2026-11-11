import { profileSchema } from '@/seo/constant/profile-schema.constant';

export function ProfileSchema() {
    return (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(profileSchema).replace(/</gu, '\\u003c') }} />
    );
}
