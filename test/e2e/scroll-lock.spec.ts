import { expect, test } from '@playwright/test';

import type { Page } from '@playwright/test';

interface Placement {
    readonly lock: string | undefined;
    readonly pageTop: number;
    readonly viewTop: number;
    readonly viewBottom: number;
    readonly viewport: number;
}

const live = async (page: Page): Promise<void> => {
    await page.goto('/');
    await expect(page.locator('.orbit-stage')).toHaveAttribute('data-state', 'live', { timeout: 15_000 });
};

const center = (page: Page, selector: string): Promise<void> =>
    page
        .locator(selector)
        .first()
        .evaluate(element => element.scrollIntoView({ block: 'center', behavior: 'instant' }));

const settle = (page: Page): Promise<void> =>
    page.evaluate(
        () =>
            new Promise<void>(resolve => {
                requestAnimationFrame(() => requestAnimationFrame(() => requestAnimationFrame(() => resolve())));
            })
    );

const freezeFrames = (page: Page): Promise<void> =>
    page.evaluate(() => {
        window.requestAnimationFrame = () => 0;
    });

const placement = (page: Page): Promise<Placement> =>
    page.locator('.cast-canvas').evaluate(canvas => {
        const rect = canvas.getBoundingClientRect();

        return {
            lock: canvas.parentElement?.dataset.lock,
            pageTop: rect.top + window.scrollY,
            viewTop: rect.top,
            viewBottom: rect.bottom,
            viewport: window.innerHeight
        };
    });

test('the cast canvas covers the viewport with spare room and does not grow the page', async ({ page }) => {
    await live(page);
    await center(page, '#career ol > li');
    await settle(page);
    const placed = await placement(page);
    expect(placed.viewTop).toBeLessThan(-100);
    expect(placed.viewBottom).toBeGreaterThan(placed.viewport + 100);
    await page.evaluate(() => window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'instant' }));
    await settle(page);
    const sizes = await page.evaluate(() => ({ page: document.documentElement.scrollHeight, body: document.body.offsetHeight }));
    expect(sizes.page).toBe(sizes.body);
});

test('timeline graphics ride the page while script frames are held back', async ({ page }) => {
    await live(page);
    await center(page, '#career ol > li');
    await settle(page);
    await freezeFrames(page);
    await page.waitForTimeout(100);
    const before = await placement(page);
    expect(before.lock).toBe('page');
    await page.evaluate(() => window.scrollBy({ top: 120, behavior: 'instant' }));
    const after = await placement(page);
    expect(after.pageTop).toBeCloseTo(before.pageTop, 1);
    expect(after.viewTop).toBeCloseTo(before.viewTop - 120, 1);
});

test('graphics in a sticky slot stay with the viewport', async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== 'desktop', 'only the wide layout has sticky slots');
    await live(page);
    await center(page, '#work ol > li:nth-child(3)');
    await settle(page);
    await page.evaluate(() => window.scrollBy({ top: 40, behavior: 'instant' }));
    await settle(page);
    const before = await placement(page);
    expect(before.lock).toBe('view');
    await freezeFrames(page);
    await page.evaluate(() => window.scrollBy({ top: 120, behavior: 'instant' }));
    const after = await placement(page);
    expect(after.viewTop).toBeCloseTo(before.viewTop, 1);
});
