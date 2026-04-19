import { readFileSync } from 'fs';
import { join } from 'path';
import { ENV } from '../config/env';

// Automatically loads test data from the correct environment folder.
// Reads from test-data/{environment}/{fileName}.json based on TEST_ENV.
//
// Usage:
//   const users = TestDataLoader.load<UsersData>('users');
//   const user = users.validAdmin;

export class TestDataLoader {
    static load<T>(fileName: string): T {
        const filePath = join(process.cwd(), 'test-data', ENV.environment, `${fileName}.json`);

        try {
            const raw = readFileSync(filePath, 'utf-8');
            return JSON.parse(raw) as T;
        } catch {
            throw new Error(
                `TestDataLoader: could not load "${fileName}.json" for environment "${ENV.environment}". ` +
                `Expected file at: ${filePath}`
            );
        }
    }
}
