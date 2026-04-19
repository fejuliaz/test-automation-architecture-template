import { UIClient } from '../core/UIClient';
import { NavigationLocators } from '../locators/NavigationLocators';
import { MenuLocators } from '../locators/MenuLocators';

export class NavigationSteps {
    constructor(private ui: UIClient) {}

    async logOut(): Promise<void> {
        await this.ui.elements.click(NavigationLocators.userProfileIcon);
        await this.ui.elements.click(NavigationLocators.logoutButton);
    }

    async navigateToAdminUsers(): Promise<void> {
        await this.ui.elements.hover(MenuLocators.adminDropdown);
        await this.ui.elements.click(MenuLocators.adminUsersOption);
    }

    async verifyGlobalNavIsVisible(): Promise<void> {
        await this.ui.asserts.verifyElementVisible(NavigationLocators.topNavBar);
    }
}
