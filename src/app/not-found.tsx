import type { Metadata } from 'next';

import { LostSection } from '@/lost/component/lost-section.component';
import { LostSky } from '@/lost/component/lost-sky.component';
import { SiteFooter } from '@/shared/component/site-footer.component';
import { SiteHeader } from '@/shared/component/site-header.component';

export const metadata: Metadata = {
    title: 'Signal lost · 404 · Vitalii Yehorov',
    description: 'Nothing orbits at this address. Head back to the home page of Vitalii Yehorov, Engineering Manager in Vienna.',
    alternates: { canonical: null },
    robots: { index: false, follow: true }
};

export default function NotFound() {
    return (
        <>
            <a
                className="fixed top-3 left-3 z-[70] -translate-y-24 rounded-full bg-accent px-5 py-3 font-mono text-sm text-bg-deep focus-visible:translate-y-0"
                href="#main"
            >
                Skip to content
            </a>
            <LostSky />
            <div className="grain" aria-hidden="true" />
            <SiteHeader />
            <main id="main" className="relative z-10">
                <LostSection />
            </main>
            <SiteFooter />
        </>
    );
}
