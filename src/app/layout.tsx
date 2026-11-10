import { Analytics } from '@vercel/analytics/next';

import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';

import { sceneProbeScript } from '@/orbit/constant/scene-probe-script.constant';
import { site } from '@/site/constant/site.constant';
import { displayFont } from '@/site/font/display.font';
import { monoFont } from '@/site/font/mono.font';

import './globals.css';

export const metadata: Metadata = {
    metadataBase: new URL(site.url),
    title: site.title,
    description: site.description,
    applicationName: site.name,
    authors: [{ name: site.name, url: site.url }],
    creator: site.name,
    keywords: [
        'Vitalii Yehorov',
        'Engineering Manager',
        'AI-native engineering',
        'AI coding agents',
        'TypeScript',
        'NestJS',
        'React Native',
        'ToolSense',
        'Vienna'
    ],
    alternates: { canonical: '/' },
    openGraph: {
        type: 'profile',
        url: site.url,
        siteName: site.name,
        title: site.title,
        description: site.description,
        locale: 'en_US',
        firstName: 'Vitalii',
        lastName: 'Yehorov'
    },
    twitter: {
        card: 'summary_large_image',
        title: site.title,
        description: site.description
    },
    robots: { index: true, follow: true },
    formatDetection: { telephone: false, email: false, address: false }
};

export const viewport: Viewport = {
    width: 'device-width',
    initialScale: 1,
    colorScheme: 'dark',
    themeColor: '#05080c'
};

interface Props {
    readonly children: ReactNode;
}

export default function RootLayout({ children }: Props) {
    return (
        <html lang="en" className={`${displayFont.variable} ${monoFont.variable}`} suppressHydrationWarning>
            <head>
                <script dangerouslySetInnerHTML={{ __html: sceneProbeScript }} />
            </head>
            <body>
                {children}
                <Analytics />
            </body>
        </html>
    );
}
