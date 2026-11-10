import { expect, test } from '@playwright/test';

import type { Page } from '@playwright/test';

const scrollThrough = async (page: Page): Promise<void> => {
    await page.evaluate(async () => {
        const step = Math.round(window.innerHeight * 0.8);
        for (let top = 0; top < document.documentElement.scrollHeight; top += step) {
            window.scrollTo({ top, behavior: 'instant' });
            await new Promise(resolve => setTimeout(resolve, 60));
        }
    });
};

test.beforeEach(async ({ page }) => {
    await page.route('**/_vercel/**', route => route.fulfill({ status: 200, contentType: 'application/javascript', body: '' }));
});

test('renders the hero with a single h1', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/Vitalii Yehorov/u);
    await expect(page.locator('h1')).toHaveCount(1);
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(/Vitalii\s*Yehorov/u);
    await expect(page.getByText('fleet of AI agents').first()).toBeVisible();
});

test('contact links point to LinkedIn, GitHub and email', async ({ page }) => {
    await page.goto('/');
    const expected = [
        ['LinkedIn', 'https://www.linkedin.com/in/vitalii-iegorov'],
        ['GitHub', 'https://github.com/vitalyiegorov'],
        ['hello@vitaliiyehorov.dev', 'mailto:hello@vitaliiyehorov.dev']
    ] as const;
    for (const scope of ['#top', '#contact']) {
        for (const [name, href] of expected) {
            await expect(page.locator(scope).getByRole('link', { name, exact: true })).toHaveAttribute('href', href);
        }
    }
});

test('has no horizontal overflow', async ({ page }) => {
    await page.goto('/');
    await scrollThrough(page);
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(overflow).toBeLessThanOrEqual(0);
});

test('logs no console errors while scrolling', async ({ page }) => {
    const errors: string[] = [];
    page.on('console', message => {
        if (message.type() === 'error') {
            errors.push(message.text());
        }
    });
    page.on('pageerror', error => errors.push(error.message));
    await page.goto('/');
    await expect(page.locator('.orbit-stage')).not.toHaveAttribute('data-state', 'idle', { timeout: 15_000 });
    await scrollThrough(page);
    await page.waitForTimeout(500);
    expect(errors).toEqual([]);
});

test('keeps the scene decorative and the page structured', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('.orbit-stage')).toHaveAttribute('aria-hidden', 'true');
    await expect(page.locator('main')).toHaveCount(1);
    await expect(page.getByRole('link', { name: 'Skip to content' })).toHaveAttribute('href', '#main');
    const schema = await page.locator('script[type="application/ld+json"]').textContent();
    const person: unknown = JSON.parse(schema ?? '{}');
    expect(person).toMatchObject({
        '@type': 'Person',
        name: 'Vitalii Yehorov',
        jobTitle: 'Engineering Manager',
        sameAs: expect.arrayContaining(['https://www.linkedin.com/in/vitalii-iegorov', 'https://github.com/vitalyiegorov'])
    });
});

test('shows the six trimmed sections', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('main > section')).toHaveCount(6);
    await expect(page.locator('#numbers dl > div')).toHaveCount(4);
    await expect(page.locator('#method ol > li')).toHaveCount(3);
    await expect(page.locator('#principles')).toHaveCount(0);
    await expect(page.getByRole('link', { name: 'jointlens.ai', exact: true })).toHaveAttribute('href', 'https://jointlens.ai');
    await expect(page.getByText('Nodes 124 · Rings 04 · Link stable')).toHaveCount(0);
});

test('lets visitors pause the background motion', async ({ page }) => {
    await page.goto('/');
    const toggle = page.getByRole('button', { name: 'Pause motion' });
    await expect(toggle).toHaveAttribute('aria-pressed', 'false');
    await toggle.click();
    await expect(page.getByRole('button', { name: 'Resume motion' })).toHaveAttribute('aria-pressed', 'true');
    await expect(page.locator('html')).toHaveAttribute('data-motion', 'paused');
});

test.describe('with reduced motion', () => {
    test.use({ reducedMotion: 'reduce' });

    test('shows all content without scroll-driven motion', async ({ page }) => {
        await page.goto('/');
        for (const id of ['numbers', 'method', 'career', 'work', 'contact']) {
            const section = page.locator(`#${id}`);
            await section.scrollIntoViewIfNeeded();
            await expect(section.locator('h2')).toBeAttached();
        }
        await expect(page.getByRole('heading', { name: 'Founder & CEO' })).toBeVisible();
        await expect(page.getByRole('heading', { name: 'Budgie' })).toBeVisible();
        const hidden = await page.evaluate(
            () =>
                [...document.querySelectorAll('.reveal, .step, .rise, .hero-exit, .hero-exit-slow')].filter(
                    element => getComputedStyle(element).opacity !== '1'
                ).length
        );
        expect(hidden).toBe(0);
        await expect(page.getByText('35,058', { exact: true }).first()).toBeAttached();
    });
});
