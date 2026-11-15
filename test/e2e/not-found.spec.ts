import { expect, test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
    await page.route('**/_vercel/**', route => route.fulfill({ status: 200, contentType: 'application/javascript', body: '' }));
});

test('renders the lost-signal page with a way home', async ({ page }) => {
    const response = await page.goto('/no-such-page');
    expect(response?.status()).toBe(404);
    await expect(page).toHaveTitle(/404/u);
    const robots = await page.locator('meta[name="robots"]').evaluateAll(tags => tags.map(tag => tag.getAttribute('content')));
    expect(robots.length).toBeGreaterThan(0);
    expect(robots.every(content => content?.startsWith('noindex'))).toBe(true);
    await expect(page.locator('link[rel="canonical"]')).toHaveCount(0);
    await expect(page.locator('h1')).toHaveCount(1);
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(/Signal\s*lost\./u);
    await expect(page.locator('main')).toHaveCount(1);
    await expect(page.locator('body > header')).toHaveCount(1);
    await expect(page.locator('body > footer')).toHaveCount(1);
    await expect(page.getByRole('link', { name: 'Back to orbit' })).toHaveAttribute('href', '/');
    await expect(page.getByRole('link', { name: 'Contact me' })).toHaveAttribute('href', '/#contact');
    await expect(page.locator('.lost-system')).toHaveAttribute('aria-hidden', 'true');
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(overflow).toBe(0);
});

test('takes the visitor back to the home page', async ({ page }) => {
    await page.goto('/no-such-page');
    await page.getByRole('link', { name: 'Back to orbit' }).click();
    await expect(page).toHaveURL(/\/$/u);
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(/Vitalii\s*Yehorov/u);
});

test.describe('with reduced motion', () => {
    test.use({ reducedMotion: 'reduce' });

    test('keeps the scene still and the copy visible', async ({ page }) => {
        await page.goto('/no-such-page');
        await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
        const animations = await page
            .locator('.lost-spin, .lost-stars, .lost-stray')
            .evaluateAll(nodes => nodes.map(node => getComputedStyle(node).animationName));
        expect(animations.every(name => name === 'none')).toBe(true);
    });
});
