import { Page } from '@playwright/test';

// Explicit wait conditions for situations Playwright's auto-waiting doesn't cover.
// Prefer these over waitForTimeout — they wait for a condition, not a fixed time.
//
// Usage:
//   await WaitHelper.forUrlToContain(page, '/dashboard');
//   await WaitHelper.forElementCountToBe(page, '.row', 5);
//   await WaitHelper.forTextToDisappear(page, '.spinner', 'Loading...');

export class WaitHelper {
    private static readonly DEFAULT_TIMEOUT = 10_000;

    static async forUrlToContain(page: Page, partial: string, timeout = WaitHelper.DEFAULT_TIMEOUT): Promise<void> {
        await page.waitForURL(url => url.toString().includes(partial), { timeout });
    }

    static async forElementCountToBe(
        page: Page,
        selector: string,
        count: number,
        timeout = WaitHelper.DEFAULT_TIMEOUT
    ): Promise<void> {
        await page.waitForFunction(
            ({ sel, n }) => document.querySelectorAll(sel).length === n,
            { sel: selector, n: count },
            { timeout }
        );
    }

    static async forElementCountToBeGreaterThan(
        page: Page,
        selector: string,
        count: number,
        timeout = WaitHelper.DEFAULT_TIMEOUT
    ): Promise<void> {
        await page.waitForFunction(
            ({ sel, n }) => document.querySelectorAll(sel).length > n,
            { sel: selector, n: count },
            { timeout }
        );
    }

    static async forTextToAppear(
        page: Page,
        selector: string,
        text: string,
        timeout = WaitHelper.DEFAULT_TIMEOUT
    ): Promise<void> {
        await page.locator(selector).filter({ hasText: text }).waitFor({ state: 'visible', timeout });
    }

    static async forTextToDisappear(
        page: Page,
        selector: string,
        text: string,
        timeout = WaitHelper.DEFAULT_TIMEOUT
    ): Promise<void> {
        await page.locator(selector).filter({ hasText: text }).waitFor({ state: 'hidden', timeout });
    }

    static async forElementToBeEnabled(
        page: Page,
        selector: string,
        timeout = WaitHelper.DEFAULT_TIMEOUT
    ): Promise<void> {
        await page.locator(selector).waitFor({ state: 'visible', timeout });
        await page.waitForFunction(
            sel => !(document.querySelector(sel) as HTMLInputElement | null)?.disabled,
            selector,
            { timeout }
        );
    }

    static async forNetworkIdle(page: Page, timeout = WaitHelper.DEFAULT_TIMEOUT): Promise<void> {
        await page.waitForLoadState('networkidle', { timeout });
    }
}
