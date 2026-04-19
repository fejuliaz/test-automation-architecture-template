// Structured console output for test execution.
// Makes CI logs readable when many tests run in parallel and output interleaves.
//
// Usage:
//   LogHelper.step('Navigate to login page');
//   LogHelper.info('Using test user: tomsmith');
//   LogHelper.warn('Skipping cleanup — test data already absent');
//   LogHelper.error('Login API returned 500');

type LogLevel = 'STEP' | 'INFO' | 'WARN' | 'ERROR';

export class LogHelper {
    private static format(level: LogLevel, message: string): string {
        const timestamp = new Date().toISOString();
        return `[${timestamp}] [${level.padEnd(5)}] ${message}`;
    }

    // Marks a distinct test step — use at the start of each logical action
    static step(message: string): void {
        console.log(LogHelper.format('STEP', `▶ ${message}`));
    }

    // General informational message — test data values, environment info
    static info(message: string): void {
        console.log(LogHelper.format('INFO', message));
    }

    // Non-fatal issues — skipped cleanup, fallback behaviour
    static warn(message: string): void {
        console.warn(LogHelper.format('WARN', message));
    }

    // Errors before a throw — adds context to Playwright's stack trace
    static error(message: string): void {
        console.error(LogHelper.format('ERROR', message));
    }

    // Logs start and end of a named block — useful for setup/teardown sections
    static group(name: string, fn: () => void): void {
        console.log(LogHelper.format('INFO', `┌── ${name}`));
        fn();
        console.log(LogHelper.format('INFO', `└── ${name} done`));
    }
}
