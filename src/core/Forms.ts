import { Page } from '@playwright/test';

export class Forms {
    constructor(private page: Page) {}

    async typeText(selector: string, text: string): Promise<void> {
        // CYPRESS: cy.get(selector).type(text);
        await this.page.locator(selector).fill(text);
    }

    async clearText(selector: string): Promise<void> {
        // CYPRESS: cy.get(selector).clear();
        await this.page.locator(selector).clear();
    }

    async selectByVisibleText(selector: string, text: string): Promise<void> {
        // CYPRESS: cy.get(selector).select(text);
        await this.page.locator(selector).selectOption({ label: text });
    }

    async selectByIndex(selector: string, index: number): Promise<void> {
        // CYPRESS: cy.get(selector).select(index);
        await this.page.locator(selector).selectOption({ index });
    }

    async getInputValue(selector: string): Promise<string> {
        // CYPRESS: cy.get(selector).invoke('val');
        return this.page.locator(selector).inputValue();
    }

    async getTextContent(selector: string): Promise<string> {
        // CYPRESS: cy.get(selector).invoke('text');
        return (await this.page.locator(selector).textContent()) ?? '';
    }
}
