import { site } from '@/site/constant/site.constant';

export function PersonSchema() {
    const person = {
        '@context': 'https://schema.org',
        '@type': 'Person',
        name: site.name,
        alternateName: 'Vitalii Iegorov',
        url: site.url,
        image: `${site.url}/opengraph-image`,
        email: site.email,
        jobTitle: site.jobTitle,
        worksFor: { '@type': 'Organization', name: site.employer, url: site.employerUrl },
        address: { '@type': 'PostalAddress', addressLocality: 'Vienna', addressCountry: 'AT' },
        alumniOf: { '@type': 'CollegeOrUniversity', name: 'National Technical University of Ukraine "Kyiv Polytechnic Institute"' },
        knowsLanguage: ['en', 'uk', 'de'],
        knowsAbout: [
            'Engineering management',
            'AI-native engineering',
            'AI coding agents',
            'TypeScript',
            'Node.js',
            'NestJS',
            'React',
            'React Native',
            'Next.js',
            'Go',
            'CI/CD'
        ],
        sameAs: [site.linkedin, site.github]
    };

    return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(person).replace(/</gu, '\\u003c') }} />;
}
