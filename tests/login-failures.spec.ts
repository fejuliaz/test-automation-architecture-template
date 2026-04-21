import { test } from '../src/fixtures';
import testData from '../test-data/qa/users.json';

test.describe('Login Failure Scenarios', () => {

    test.beforeEach(async ({ auth }) => {
        await auth.navigateToLogin();
    });

    test('Invalid credentials show error message', async ({ auth }) => {
        await auth.loginAs('wronguser', 'wrongpassword');
        await auth.verifyFailedLogin();
    });

    test('Empty credentials show error message', async ({ auth }) => {
        await auth.loginAs('', '');
        await auth.verifyFailedLogin();
    });

    test('Valid username with wrong password shows error', async ({ auth }) => {
        const user = testData.validAdmin;

        await auth.loginAs(user.username, 'wrongpassword');
        await auth.verifyFailedLogin();
    });

    test('Mocked 401 response shows error state', async ({ auth }) => {
        const user = testData.validAdmin;

        await auth.interceptAndMockLoginFail();
        await auth.loginAs(user.username, user.password);
        await auth.verifyFailedLogin();
    });
});
