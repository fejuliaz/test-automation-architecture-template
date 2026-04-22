# Test Automation Architecture Template

A proof-of-concept repository demonstrating the **Clean Architecture** approach to UI test automation. Designed to completely decouple test intent from the underlying execution tool — not tied to Playwright, Cypress, or any other framework.

---

## Architecture Rules

| Layer | Location | Rule |
|---|---|---|
| Tests | `tests/` | Pure business intent. No `page.locator()` or `cy.get()` allowed here. |
| Locators | `src/locators/` | HTML/CSS selectors only. No logic. |
| Pages | `src/pages/` | Route metadata — URLs, API endpoints, expected titles. |
| Steps | `src/steps/` | Business workflows. Combines Locators, Pages, and UIClient. |
| Core | `src/core/` | The **only** place Playwright/Cypress syntax exists. |
| Config | `src/config/` | Environment variables and base URLs. |
| Fixtures | `src/fixtures/` | Dependency injection for tests. |

---

## Project Structure

```
src/
  core/           # Tool wrapper — the ONLY place Playwright syntax lives
  locators/       # CSS/attribute selectors
  pages/          # Page route metadata
  steps/          # Business-language workflows
  components/     # Reusable cross-page UI region metadata
  config/         # Environment config (BASE_URL, TEST_ENV)
  fixtures/       # Playwright custom fixtures (DI wiring)
  utils/          # Shared helpers
test-data/
  qa/             # Test data per environment
tests/            # Test specs — business intent only
```

---

## Migrating to Cypress

To swap Playwright for Cypress, you only need to replace the internals of `src/core/`. Everything else - tests, steps, locators, pages - remains unchanged.

Every class in `src/core/` has inline comments showing the Cypress equivalent:

```typescript
async click(selector: string): Promise<void> {
    // CYPRESS: cy.get(selector).click();
    await this.page.locator(selector).click();
}
```

TypeScript's structural typing means no interfaces are required - as long as the method signatures in your Cypress implementation match the existing ones, all Steps will compile and work without modification.

---

## Environment Configuration

Set the `BASE_URL` environment variable to target different environments:

```bash
BASE_URL=https://staging.example.com npx playwright test
BASE_URL=https://prod.example.com npx playwright test
```

Defaults to `https://the-internet.herokuapp.com` if not set.

---

## Running Tests

```bash
npm test                        # Run all tests (headless)
npx playwright test --headed    # Run with browser visible
npx playwright test --debug     # Step-through debugger
npx playwright show-report      # Open last HTML report
```

---

## Gherkin / Cucumber

### Is it worth adding?

The `src/steps/` layer is intentionally written in business language, making it **Gherkin-compatible by design**. Whether to add a full Cucumber integration depends on your team:

Non-engineers (POs, BAs) read or write test scenarios | Add Gherkin - the business value justifies the overhead |

Engineering-only team | Skip it - your step methods already read as plain English |


### How to add Gherkin if you need it

**Step 1 - Install dependencies**

```bash
npm install -D @cucumber/cucumber playwright-bdd
```

**Step 2 - Create a feature file**

```
tests/
  login.feature
```

```gherkin
Feature: Authentication

  Scenario: User logs in with valid credentials
    Given I am on the login page
    When I log in as "tomsmith" with password "SuperSecretPassword!"
    Then I should see the secure area welcome message
```

**Step 3 - Create step definitions**

The step definitions are thin wrappers - they just delegate to your existing Steps classes:

```
src/
  step-definitions/
    auth.steps.ts
```

```typescript
import { Given, When, Then } from '@cucumber/cucumber';
import { AuthSteps } from '../steps/AuthSteps';
import { UIClient } from '../core/UIClient';

// Wired up via Cucumber's World object or a shared fixture
let auth: AuthSteps;

Given('I am on the login page', async function () {
    auth = new AuthSteps(new UIClient(this.page));
    await auth.navigateToLogin();
});

When('I log in as {string} with password {string}', async function (username: string, password: string) {
    await auth.loginAs(username, password);
});

Then('I should see the secure area welcome message', async function () {
    await auth.verifySuccessfulLogin();
});
```

**Step 4 - Configure the Cucumber runner**

```
cucumber.config.ts
```

```typescript
export default {
    paths: ['tests/**/*.feature'],
    require: ['src/step-definitions/**/*.ts'],
    requireModule: ['ts-node/register'],
    format: ['html:cucumber-report.html'],
};
```

**Step 5 - Add a script to `package.json`**

```json
"test:bdd": "cucumber-js --config cucumber.config.ts"
```

### Key point

Notice that `AuthSteps`, `NavigationSteps`, and all locators are **reused unchanged**. The Gherkin layer is purely a translation layer on top - adding it does not require touching any existing framework code.

---

## Architecture Decision: Why No Interfaces?

TypeScript uses **structural typing** (duck typing). Unlike Java or C#, you do not need formal `IUIClient`, `IForms` etc. interfaces to swap implementations. As long as a replacement class has matching method signatures, TypeScript compiles without changes to Steps or tests.

Interfaces were deliberately omitted to reduce boilerplate and keep the framework approachable for QA engineers of all levels. The boundary is enforced by convention: `src/core/` is the only folder that may import from `@playwright/test`.
