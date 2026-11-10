import { defineConfig, devices } from '@playwright/test';

const port = Number(process.env.E2E_PORT ?? 4173);
const baseURL = `http://localhost:${port}`;
const launchOptions = { args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'] };

export default defineConfig({
    testDir: './test/e2e',
    fullyParallel: true,
    forbidOnly: Boolean(process.env.CI),
    retries: process.env.CI ? 1 : 0,
    reporter: process.env.CI ? [['github'], ['list']] : 'list',
    use: {
        baseURL,
        trace: 'retain-on-failure'
    },
    projects: [
        {
            name: 'desktop',
            use: { ...devices['Desktop Chrome'], viewport: { width: 1440, height: 900 }, launchOptions }
        },
        {
            name: 'mobile',
            use: {
                ...devices['Desktop Chrome'],
                viewport: { width: 390, height: 844 },
                deviceScaleFactor: 3,
                isMobile: true,
                hasTouch: true,
                launchOptions
            }
        }
    ],
    webServer: {
        command: `pnpm exec next start -p ${port}`,
        url: baseURL,
        reuseExistingServer: !process.env.CI,
        timeout: 60_000
    }
});
