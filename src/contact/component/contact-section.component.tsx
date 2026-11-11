import { ContactLinks } from '@/shared/component/contact-links.component';
import { TelemetryLabel } from '@/shared/component/telemetry-label.component';

export function ContactSection() {
    return (
        <section
            id="contact"
            data-orbit-stage
            aria-labelledby="contact-title"
            className="relative flex flex-col pt-14 pb-22 sm:min-h-[88svh] sm:justify-center sm:py-24"
        >
            <div className="mx-auto w-full max-w-[96rem] px-5 sm:px-8 lg:px-14">
                <div className="reveal">
                    <TelemetryLabel index="06">Contact · all nodes to core</TelemetryLabel>
                    <div className="relative mt-8">
                        <h2 id="contact-title" className="display readable text-[clamp(4.2rem,15vw,14rem)] font-bold">
                            Send a<br />
                            <span className="text-accent">signal.</span>
                        </h2>
                        <div data-orbit-core className="absolute top-1/2 right-0 size-36 -translate-y-1/2 sm:hidden" aria-hidden="true" />
                    </div>
                    <p className="readable mt-8 max-w-lg text-lg leading-relaxed text-muted text-balance sm:max-w-2xl sm:text-[clamp(1.25rem,1.8vw,1.75rem)] sm:leading-snug sm:text-fg">
                        Building with AI agents, or leading a team that does? Write to me.
                    </p>
                    <div className="mt-10">
                        <ContactLinks size="lg" />
                    </div>
                </div>
            </div>
        </section>
    );
}
