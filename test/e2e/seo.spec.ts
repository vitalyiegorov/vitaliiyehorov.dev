import { expect, test } from '@playwright/test';

const origin = 'https://vitaliiyehorov.dev';

test.beforeEach(async ({ page }) => {
    await page.route('**/_vercel/**', route => route.fulfill({ status: 200, contentType: 'application/javascript', body: '' }));
});

test('exposes one h1, ordered headings and labelled landmarks', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('html')).toHaveAttribute('lang', 'en');
    await expect(page.locator('h1')).toHaveCount(1);
    const levels = await page
        .locator('h1, h2, h3, h4, h5, h6')
        .evaluateAll(headings => headings.map(heading => Number(heading.tagName.slice(1))));
    expect(levels[0]).toBe(1);
    for (let index = 1; index < levels.length; index += 1) {
        expect((levels[index] ?? 0) - (levels[index - 1] ?? 0), `heading ${index}`).toBeLessThanOrEqual(1);
    }
    await expect(page.locator('main')).toHaveCount(1);
    await expect(page.locator('body > header')).toHaveCount(1);
    await expect(page.locator('body > footer')).toHaveCount(1);
    await expect(page.getByRole('navigation', { name: 'Primary' })).toHaveCount(1);
});

test('sets title, description, canonical and social metadata', async ({ page }) => {
    await page.goto('/');
    const title = await page.title();
    expect(title).toContain('Vitalii Yehorov');
    expect(title.length).toBeLessThanOrEqual(60);
    const description = (await page.locator('meta[name="description"]').getAttribute('content')) ?? '';
    expect(description.length).toBeGreaterThanOrEqual(70);
    expect(description.length).toBeLessThanOrEqual(160);
    await expect(page.locator('link[rel="canonical"]')).toHaveCount(1);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', /^https:\/\/vitaliiyehorov\.dev\/?$/u);
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', /^index, follow/u);
    await expect(page.locator('meta[property="og:type"]')).toHaveAttribute('content', 'profile');
    await expect(page.locator('meta[property="og:image"]')).toHaveAttribute('content', /\/opengraph-image/u);
    await expect(page.locator('meta[property="og:image:alt"]')).toHaveAttribute('content', /Vitalii Yehorov/u);
    await expect(page.locator('meta[name="twitter:card"]')).toHaveAttribute('content', 'summary_large_image');
    await expect(page.locator('link[rel="alternate"][href$="/llms.txt"]')).toHaveCount(1);
});

test('ships JSON-LD with a Person inside a ProfilePage', async ({ page }) => {
    await page.goto('/');
    const scripts = page.locator('script[type="application/ld+json"]');
    await expect(scripts).toHaveCount(1);
    const schema: unknown = JSON.parse((await scripts.textContent()) ?? '{}');
    expect(schema).toMatchObject({
        '@context': 'https://schema.org',
        '@graph': expect.arrayContaining([
            expect.objectContaining({ '@type': 'WebSite', url: origin }),
            expect.objectContaining({
                '@type': 'ProfilePage',
                url: origin,
                mainEntity: { '@id': `${origin}/#person` },
                dateModified: expect.stringMatching(/^\d{4}-\d{2}-\d{2}/u)
            }),
            expect.objectContaining({
                '@type': 'Person',
                '@id': `${origin}/#person`,
                name: 'Vitalii Yehorov',
                jobTitle: 'Engineering Manager',
                url: origin,
                worksFor: expect.objectContaining({ '@type': 'Organization', name: 'ToolSense' }),
                sameAs: ['https://www.linkedin.com/in/vitalii-iegorov', 'https://github.com/vitalyiegorov']
            })
        ])
    });
});

test('serves robots.txt, sitemap.xml and llms.txt', async ({ request }) => {
    const robots = await request.get('/robots.txt');
    expect(robots.status()).toBe(200);
    const rules = await robots.text();
    expect(rules).toMatch(/User-Agent: \*/iu);
    expect(rules).not.toMatch(/^Disallow: \/$/mu);
    expect(rules).toContain(`Sitemap: ${origin}/sitemap.xml`);

    const sitemap = await request.get('/sitemap.xml');
    expect(sitemap.status()).toBe(200);
    const xml = await sitemap.text();
    expect(xml).toContain(`<loc>${origin}</loc>`);
    expect(xml).toMatch(/<lastmod>\d{4}-\d{2}-\d{2}/u);

    const llms = await request.get('/llms.txt');
    expect(llms.status()).toBe(200);
    expect(llms.headers()['content-type']).toContain('text/plain');
    const text = await llms.text();
    expect(text.startsWith('# Vitalii Yehorov\n')).toBe(true);
    expect(text).toContain('https://www.linkedin.com/in/vitalii-iegorov');
    expect(text).toContain('https://github.com/vitalyiegorov');
});

test('returns a real 404 for unknown paths', async ({ request }) => {
    const response = await request.get('/no-such-page');
    expect(response.status()).toBe(404);
});
