import { Page, expect } from '@playwright/test';

export class Assertions {
    constructor(private page: Page) {}

    async verifyElementVisible(selector: string): Promise<void> {
        // CYPRESS: cy.get(selector).should('be.visible');
        await expect(this.page.locator(selector)).toBeVisible();
    }

    async verifyElementNotVisible(selector: string): Promise<void> {
        // CYPRESS: cy.get(selector).should('not.be.visible');
        await expect(this.page.locator(selector)).toBeHidden();
    }

    async verifyElementEnabled(selector: string): Promise<void> {
        // CYPRESS: cy.get(selector).should('be.enabled');
        await expect(this.page.locator(selector)).toBeEnabled();
    }

    async verifyElementDisabled(selector: string): Promise<void> {
        // CYPRESS: cy.get(selector).should('be.disabled');
        await expect(this.page.locator(selector)).toBeDisabled();
    }

    async verifyTextContains(selector: string, expectedText: string): Promise<void> {
        // CYPRESS: cy.get(selector).should('contain.text', expectedText);
        await expect(this.page.locator(selector).first()).toContainText(expectedText);
    }

    async verifyTextEquals(selector: string, expectedText: string): Promise<void> {
        // CYPRESS: cy.get(selector).should('have.text', expectedText);
        await expect(this.page.locator(selector)).toHaveText(expectedText);
    }

    async verifyAttributeEquals(selector: string, attribute: string, value: string): Promise<void> {
        // CYPRESS: cy.get(selector).should('have.attr', attribute, value);
        await expect(this.page.locator(selector)).toHaveAttribute(attribute, value);
    }

    async verifyChecked(selector: string): Promise<void> {
        // CYPRESS: cy.get(selector).should('be.checked');
        await expect(this.page.locator(selector)).toBeChecked();
    }

    async verifyUnchecked(selector: string): Promise<void> {
        // CYPRESS: cy.get(selector).should('not.be.checked');
        await expect(this.page.locator(selector)).not.toBeChecked();
    }

    async verifyElementCount(selector: string, count: number): Promise<void> {
        // CYPRESS: cy.get(selector).should('have.length', count);
        await expect(this.page.locator(selector)).toHaveCount(count);
    }

    async verifyUrl(expectedUrl: string | RegExp): Promise<void> {
        // CYPRESS: cy.url().should('include', expectedUrl);
        await expect(this.page).toHaveURL(expectedUrl);
    }

    async verifyPageTitle(expectedTitle: string | RegExp): Promise<void> {
        // CYPRESS: cy.title().should('eq', expectedTitle);
        await expect(this.page).toHaveTitle(expectedTitle);
    }

    async verifyInputValue(selector: string, expectedValue: string): Promise<void> {
        // CYPRESS: cy.get(selector).should('have.value', expectedValue);
        await expect(this.page.locator(selector)).toHaveValue(expectedValue);
    }
}
