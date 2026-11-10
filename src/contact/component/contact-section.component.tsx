import { ContactLinks } from '@/shared/component/contact-links.component';
import { TelemetryLabel } from '@/shared/component/telemetry-label.component';

export function ContactSection() {
    return (
        <section
            id="contact"
            data-orbit-stage
            aria-labelledby="contact-title"
            className="relative flex min-h-[calc(100svh-13rem)] flex-col justify-center py-12 sm:min-h-[88svh] sm:py-24"
        >
            <div className="mx-auto w-full max-w-[96rem] px-5 sm:px-8 lg:px-14">
                <div className="reveal">
                    <TelemetryLabel index="06">Contact · all nodes to core</TelemetryLabel>
                    <h2 id="contact-title" className="display readable mt-8 text-[clamp(4.2rem,15vw,14rem)] font-bold">
                        Send a<br />
                        <span className="text-accent">signal.</span>
                    </h2>
                    <p className="readable mt-8 max-w-lg text-lg leading-relaxed text-muted text-balance">
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
