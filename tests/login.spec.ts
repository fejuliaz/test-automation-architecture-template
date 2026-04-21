import { test } from '../src/fixtures';
import testData from '../test-data/qa/users.json';

test.describe('Authentication Flows', () => {

    test('User can log in with valid credentials', async ({ auth }) => {
        await auth.navigateToLogin();
        await auth.loginAs(testData.validAdmin.username, testData.validAdmin.password);
        await auth.verifySuccessfulLogin();
    });

    test('Frontend handles backend 401 elegantly', async ({ auth }) => {
        await auth.navigateToLogin();
        await auth.interceptAndMockLoginFail();
        await auth.loginAs(testData.validAdmin.username, testData.validAdmin.password);

        // TODO: assert visible error state once a verifyLoginFailed step is added
        // await auth.verifyLoginFailed();
    });
});
