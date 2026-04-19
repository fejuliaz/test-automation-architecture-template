import { Page } from '@playwright/test';

export class Browser {
    constructor(private page: Page) {}

    async goBack(): Promise<void> {
        // CYPRESS: cy.go('back');
        await this.page.goBack();
    }

    async goForward(): Promise<void> {
        // CYPRESS: cy.go('forward');
        await this.page.goForward();
    }

    async reload(): Promise<void> {
        // CYPRESS: cy.reload();
        await this.page.reload();
    }

    async getCurrentUrl(): Promise<string> {
        // CYPRESS: cy.url();
        return this.page.url();
    }

    async getPageTitle(): Promise<string> {
        // CYPRESS: cy.title();
        return this.page.title();
    }

    async acceptDialog(): Promise<void> {
        // CYPRESS: cy.on('window:confirm', () => true);
        this.page.once('dialog', dialog => dialog.accept());
    }

    async dismissDialog(): Promise<void> {
        // CYPRESS: cy.on('window:confirm', () => false);
        this.page.once('dialog', dialog => dialog.dismiss());
    }

    async scrollToTop(): Promise<void> {
        // CYPRESS: cy.scrollTo('top');
        await this.page.keyboard.press('Control+Home');
    }

    async scrollToBottom(): Promise<void> {
        // CYPRESS: cy.scrollTo('bottom');
        await this.page.keyboard.press('Control+End');
    }

    async switchToFrame(frameSelector: string): Promise<Page> {
        // CYPRESS: cy.frameLoaded(frameSelector); cy.iframe(frameSelector)...
        const frame = this.page.frameLocator(frameSelector);
        // Return the page for chaining — caller uses frame.locator() directly
        // Note: Playwright frameLocator is used inline; this exposes the page for advanced use
        void frame; // frame is used by consumers via ui.browser.switchToFrame
        return this.page;
    }

    async waitForLoadState(state: 'load' | 'domcontentloaded' | 'networkidle' = 'load'): Promise<void> {
        // CYPRESS: cy.wait() / implicit in commands
        await this.page.waitForLoadState(state);
    }

    async getCookies(): Promise<Array<{ name: string; value: string }>> {
        // CYPRESS: cy.getCookies();
        return this.page.context().cookies();
    }

    async clearCookies(): Promise<void> {
        // CYPRESS: cy.clearCookies();
        await this.page.context().clearCookies();
    }

    async setLocalStorage(key: string, value: string): Promise<void> {
        // CYPRESS: cy.window().invoke('localStorage.setItem', key, value);
        await this.page.evaluate(([k, v]) => localStorage.setItem(k, v), [key, value]);
    }

    async getLocalStorage(key: string): Promise<string | null> {
        // CYPRESS: cy.window().invoke('localStorage.getItem', key);
        return this.page.evaluate(k => localStorage.getItem(k), key);
    }
}
