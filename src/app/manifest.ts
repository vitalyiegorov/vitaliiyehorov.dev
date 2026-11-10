import type { MetadataRoute } from 'next';

import { site } from '@/site/constant/site.constant';

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: site.name,
        short_name: 'VY',
        description: site.description,
        start_url: '/',
        display: 'browser',
        background_color: '#05080c',
        theme_color: '#05080c',
        icons: [
            { src: '/icon.svg', type: 'image/svg+xml', sizes: 'any' },
            { src: '/apple-icon', type: 'image/png', sizes: '180x180' }
        ]
    };
}
