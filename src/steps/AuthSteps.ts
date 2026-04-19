import { UIClient } from '../core/UIClient';
import { LoginLocators } from '../locators/LoginLocators';
import { LoginPage } from '../pages/LoginPage';

export class AuthSteps {
    constructor(private ui: UIClient) {}

    async navigateToLogin(): Promise<void> {
        await this.ui.navigate(LoginPage.url);
    }

    async loginAs(username: string, password: string): Promise<void> {
        await this.ui.forms.typeText(LoginLocators.emailInput, username);
        await this.ui.forms.typeText(LoginLocators.passwordInput, password);
        await this.ui.elements.click(LoginLocators.submitButton);
    }

    async interceptAndMockLoginFail(): Promise<void> {
        await this.ui.data.mockApiResponse(LoginPage.loginApiEndpoint, { error: 'Unauthorized' }, 401);
    }

    async verifySuccessfulLogin(): Promise<void> {
        await this.ui.asserts.verifyTextContains(LoginLocators.welcomeMessage, 'You logged into a secure area!');
    }
}
