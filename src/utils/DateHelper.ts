// Utility for common date operations needed in test scenarios.
// All methods are pure functions — no side effects.
//
// Usage:
//   DateHelper.today('dd/MM/yyyy')          // '19/04/2026'
//   DateHelper.addDays(new Date(), 7)        // Date 7 days from now
//   DateHelper.format(new Date(), 'yyyy-MM-dd') // '2026-04-19'

export class DateHelper {
    static today(format?: string): string {
        return DateHelper.format(new Date(), format ?? 'yyyy-MM-dd');
    }

    static tomorrow(format?: string): string {
        return DateHelper.format(DateHelper.addDays(new Date(), 1), format ?? 'yyyy-MM-dd');
    }

    static addDays(date: Date, days: number): Date {
        const result = new Date(date);
        result.setDate(result.getDate() + days);
        return result;
    }

    static subtractDays(date: Date, days: number): Date {
        return DateHelper.addDays(date, -days);
    }

    static format(date: Date, pattern: string): string {
        const pad = (n: number) => String(n).padStart(2, '0');

        return pattern
            .replace('yyyy', String(date.getFullYear()))
            .replace('MM',   pad(date.getMonth() + 1))
            .replace('dd',   pad(date.getDate()))
            .replace('HH',   pad(date.getHours()))
            .replace('mm',   pad(date.getMinutes()))
            .replace('ss',   pad(date.getSeconds()));
    }

    static isAfter(date: Date, reference: Date): boolean {
        return date.getTime() > reference.getTime();
    }

    static isBefore(date: Date, reference: Date): boolean {
        return date.getTime() < reference.getTime();
    }

    static daysBetween(from: Date, to: Date): number {
        const ms = Math.abs(to.getTime() - from.getTime());
        return Math.floor(ms / (1000 * 60 * 60 * 24));
    }
}
