import type { MetadataRoute } from 'next';

import { site } from '@/site/constant/site.constant';

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [{ userAgent: '*', allow: '/' }],
        sitemap: `${site.url}/sitemap.xml`,
        host: site.url
    };
}
