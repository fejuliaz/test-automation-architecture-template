import { test } from '../src/fixtures';
import testData from '../test-data/qa/users.json';

test.describe('Post-Login Navigation', () => {

    test.beforeEach(async ({ auth }) => {
        const user = testData.validAdmin;
        await auth.navigateToLogin();
        await auth.loginAs(user.username, user.password);
        await auth.verifySuccessfulLogin();
    });

    test('Global navigation bar is visible after login', async ({ navigation }) => {
        await navigation.verifyGlobalNavIsVisible();
    });

    test('Logged-in URL no longer contains /login', async ({ ui }) => {
        await ui.asserts.verifyUrl(/\/secure/);
    });
});
