import { test } from '../src/fixtures';

test.describe('Login Page UI', () => {

    test.beforeEach(async ({ auth }) => {
        await auth.navigateToLogin();
    });

    test('Login page loads with all expected elements visible', async ({ auth }) => {
        await auth.verifyLoginPageLoaded();
    });

    test('Login page URL matches expected pattern', async ({ auth }) => {
        await auth.verifyLoginPageUrl();
    });

    test('Login page has correct browser title', async ({ auth }) => {
        await auth.verifyLoginPageTitle();
    });

    test('Submit button has correct type attribute', async ({ auth }) => {
        await auth.verifySubmitButtonAttribute();
    });

    test('Email input is empty on fresh page load', async ({ auth }) => {
        await auth.verifyEmailInputIsEmpty();
    });
});
