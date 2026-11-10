import type { MetadataRoute } from 'next';

import { site } from '@/site/constant/site.constant';

export default function sitemap(): MetadataRoute.Sitemap {
    return [{ url: site.url, lastModified: new Date('2026-11-10'), changeFrequency: 'monthly', priority: 1 }];
}
