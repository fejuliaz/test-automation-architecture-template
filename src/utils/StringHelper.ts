// Utility for generating unique and formatted strings in test scenarios.
// Uniqueness uses Date.now() + random suffix to be safe under parallel execution.
//
// Usage:
//   StringHelper.uniqueEmail()              // 'user_1713521234567_k3f@test.com'
//   StringHelper.uniqueUsername('admin')    // 'admin_1713521234567_9xz'
//   StringHelper.randomNumber(1000, 9999)   // e.g. 4823

export class StringHelper {
    static uniqueEmail(prefix = 'user', domain = 'test.com'): string {
        return `${prefix}_${Date.now()}_${StringHelper.randomSuffix()}@${domain}`;
    }

    static uniqueUsername(prefix = 'user'): string {
        return `${prefix}_${Date.now()}_${StringHelper.randomSuffix()}`;
    }

    static uniqueReference(prefix = 'REF'): string {
        return `${prefix}-${Date.now()}-${StringHelper.randomSuffix().toUpperCase()}`;
    }

    static randomNumber(min: number, max: number): number {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    static randomString(length = 8): string {
        const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
        return Array.from({ length }, () =>
            chars.charAt(Math.floor(Math.random() * chars.length))
        ).join('');
    }

    static truncate(value: string, maxLength: number): string {
        return value.length <= maxLength ? value : `${value.slice(0, maxLength)}…`;
    }

    static toTitleCase(value: string): string {
        return value.replace(/\w\S*/g, word =>
            word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
        );
    }

    static removeWhitespace(value: string): string {
        return value.replace(/\s+/g, '');
    }

    private static randomSuffix(length = 3): string {
        return StringHelper.randomString(length);
    }
}
