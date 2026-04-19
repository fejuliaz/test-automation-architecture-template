import { Page } from '@playwright/test';
import { Forms } from './Forms';
import { ActionableElements } from './ActionableElements';
import { Assertions } from './Assertions';
import { Data } from './Data';
import { Browser } from './Browser';

// UIClient is the ONLY place Playwright syntax exists.
// To migrate to Cypress: replace the internals of this file and its dependencies.
// All steps, locators, pages, and tests remain unchanged.
export class UIClient {
    public forms: Forms;
    public elements: ActionableElements;
    public asserts: Assertions;
    public data: Data;
    public browser: Browser;
    private page: Page;

    constructor(page: Page) {
        this.page = page;
        this.forms = new Forms(page);
        this.elements = new ActionableElements(page);
        this.asserts = new Assertions(page);
        this.data = new Data(page);
        this.browser = new Browser(page);
    }

    async navigate(url: string): Promise<void> {
        // CYPRESS: cy.visit(url);
        await this.page.goto(url);
    }
}
