import { CareerSection } from '@/career/component/career-section.component';
import { ContactSection } from '@/contact/component/contact-section.component';
import { HeroSection } from '@/hero/component/hero-section.component';
import { MethodSection } from '@/method/component/method-section.component';
import { OrbitStage } from '@/orbit/component/orbit-stage.component';
import { ProfileSchema } from '@/seo/component/profile-schema.component';
import { ScrollProgress } from '@/shared/component/scroll-progress.component';
import { SiteFooter } from '@/shared/component/site-footer.component';
import { SiteHeader } from '@/shared/component/site-header.component';
import { StatsSection } from '@/stats/component/stats-section.component';
import { WorkSection } from '@/work/component/work-section.component';

export default function HomePage() {
    return (
        <>
            <a
                className="fixed top-3 left-3 z-[70] -translate-y-24 rounded-full bg-accent px-5 py-3 font-mono text-sm text-bg-deep focus-visible:translate-y-0"
                href="#main"
            >
                Skip to content
            </a>
            <ProfileSchema />
            <OrbitStage />
            <div className="grain" aria-hidden="true" />
            <SiteHeader />
            <ScrollProgress />
            <main id="main" className="relative z-10">
                <HeroSection />
                <StatsSection />
                <MethodSection />
                <CareerSection />
                <WorkSection />
                <ContactSection />
            </main>
            <SiteFooter />
        </>
    );
}
