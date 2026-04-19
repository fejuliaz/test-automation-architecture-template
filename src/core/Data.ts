import { Page } from '@playwright/test';

export class Data {
    constructor(private page: Page) {}

    async mockApiResponse(urlPattern: string, mockPayload: unknown, status = 200): Promise<void> {
        // CYPRESS: cy.intercept(urlPattern, { statusCode: status, body: mockPayload });
        await this.page.route(urlPattern, async route => {
            await route.fulfill({
                status,
                contentType: 'application/json',
                body: JSON.stringify(mockPayload),
            });
        });
    }

    async waitForNetworkResponse(urlPattern: string): Promise<unknown> {
        // CYPRESS: cy.wait('@aliasName');
        const response = await this.page.waitForResponse(r => r.url().includes(urlPattern));
        return response.json();
    }
}
