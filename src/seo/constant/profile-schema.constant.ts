import { site } from '@/site/constant/site.constant';

const personId = `${site.url}/#person`;
const websiteId = `${site.url}/#website`;
const pageId = `${site.url}/#profilepage`;
const image = `${site.url}/opengraph-image`;

export const profileSchema = {
    '@context': 'https://schema.org',
    '@graph': [
        {
            '@type': 'WebSite',
            '@id': websiteId,
            url: site.url,
            name: site.name,
            alternateName: 'vitaliiyehorov.dev',
            description: site.description,
            inLanguage: 'en',
            publisher: { '@id': personId }
        },
        {
            '@type': 'ProfilePage',
            '@id': pageId,
            url: site.url,
            name: site.title,
            description: site.description,
            inLanguage: 'en',
            dateModified: site.updated,
            isPartOf: { '@id': websiteId },
            about: { '@id': personId },
            mainEntity: { '@id': personId },
            primaryImageOfPage: { '@type': 'ImageObject', url: image, width: 1200, height: 630 }
        },
        {
            '@type': 'Person',
            '@id': personId,
            name: site.name,
            givenName: 'Vitalii',
            familyName: 'Yehorov',
            alternateName: 'Vitalii Iegorov',
            description: site.description,
            url: site.url,
            image,
            email: site.emailHref,
            jobTitle: site.jobTitle,
            worksFor: { '@type': 'Organization', name: site.employer, url: site.employerUrl },
            address: { '@type': 'PostalAddress', addressLocality: 'Vienna', addressCountry: 'AT' },
            alumniOf: { '@type': 'CollegeOrUniversity', name: 'National Technical University of Ukraine "Kyiv Polytechnic Institute"' },
            knowsLanguage: ['en', 'uk'],
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
            sameAs: [site.linkedin, site.github],
            mainEntityOfPage: { '@id': pageId }
        }
    ]
} as const;
