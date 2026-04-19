import { test as base } from '@playwright/test';
import { UIClient } from '../core/UIClient';
import { AuthSteps } from '../steps/AuthSteps';
import { NavigationSteps } from '../steps/NavigationSteps';

type Fixtures = {
    ui: UIClient;
    auth: AuthSteps;
    navigation: NavigationSteps;
};

// Extend the base Playwright test with our custom fixtures.
// Tests receive fully-wired step objects — no manual setup needed.
export const test = base.extend<Fixtures>({
    ui: async ({ page }, use) => {
        await use(new UIClient(page));
    },
    auth: async ({ ui }, use) => {
        await use(new AuthSteps(ui));
    },
    navigation: async ({ ui }, use) => {
        await use(new NavigationSteps(ui));
    },
});

export { expect } from '@playwright/test';
