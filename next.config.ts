import type { NextConfig } from 'next';

const securityHeaders = [
    { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
    { key: 'X-Content-Type-Options', value: 'nosniff' },
    { key: 'X-Frame-Options', value: 'DENY' },
    { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
    { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), payment=(), usb=(), browsing-topics=()' }
];

const nextConfig: NextConfig = {
    reactCompiler: true,
    cacheComponents: true,
    partialPrefetching: true,
    poweredByHeader: false,
    headers: async () => [
        { source: '/:path*', headers: securityHeaders },
        {
            source: '/',
            headers: [
                { key: 'Vary', value: 'Accept' },
                {
                    key: 'Link',
                    value: '</llms.txt>; rel="alternate"; type="text/plain", </index.md>; rel="alternate"; type="text/markdown"'
                }
            ]
        }
    ],
    rewrites: async () => ({
        beforeFiles: [
            {
                source: '/',
                has: [
                    {
                        type: 'header',
                        key: 'accept',
                        value: '(?!.*text/markdown(?:\\s*;\\s*(?!q=)[^,;]*)*\\s*;\\s*q=0(?:\\.0+)?\\s*(?:,|$)).*text/markdown.*'
                    }
                ],
                destination: '/index.md'
            }
        ],
        afterFiles: [],
        fallback: []
    })
};

export default nextConfig;
