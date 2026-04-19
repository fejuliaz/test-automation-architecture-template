import { Page } from '@playwright/test';

export class ActionableElements {
    constructor(private page: Page) {}

    async click(selector: string): Promise<void> {
        // CYPRESS: cy.get(selector).click();
        await this.page.locator(selector).click();
    }

    async doubleClick(selector: string): Promise<void> {
        // CYPRESS: cy.get(selector).dblclick();
        await this.page.locator(selector).dblclick();
    }

    async rightClick(selector: string): Promise<void> {
        // CYPRESS: cy.get(selector).rightclick();
        await this.page.locator(selector).click({ button: 'right' });
    }

    async hover(selector: string): Promise<void> {
        // CYPRESS: cy.get(selector).trigger('mouseover');
        await this.page.locator(selector).hover();
    }

    async selectDropdownByValue(selector: string, value: string): Promise<void> {
        // CYPRESS: cy.get(selector).select(value);
        await this.page.locator(selector).selectOption({ value });
    }

    async checkRadioOrCheckbox(selector: string): Promise<void> {
        // CYPRESS: cy.get(selector).check();
        await this.page.locator(selector).check();
    }

    async uncheckCheckbox(selector: string): Promise<void> {
        // CYPRESS: cy.get(selector).uncheck();
        await this.page.locator(selector).uncheck();
    }

    async dragAndDrop(sourceSelector: string, targetSelector: string): Promise<void> {
        // CYPRESS: cy.get(sourceSelector).drag(targetSelector);
        await this.page.locator(sourceSelector).dragTo(this.page.locator(targetSelector));
    }

    async uploadFile(selector: string, filePath: string): Promise<void> {
        // CYPRESS: cy.get(selector).selectFile(filePath);
        await this.page.locator(selector).setInputFiles(filePath);
    }

    async pressKey(selector: string, key: string): Promise<void> {
        // CYPRESS: cy.get(selector).type('{key}');
        await this.page.locator(selector).press(key);
    }

    async scrollIntoView(selector: string): Promise<void> {
        // CYPRESS: cy.get(selector).scrollIntoView();
        await this.page.locator(selector).scrollIntoViewIfNeeded();
    }
}
