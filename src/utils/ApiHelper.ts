import { ENV } from '../config/env';

// Direct HTTP client for API-driven test setup and teardown.
// Use this to create/clean up data without driving the UI — faster and more reliable.
//
// Usage:
//   const user = await ApiHelper.post('/users', { name: 'Tom', role: 'admin' });
//   const profile = await ApiHelper.get('/users/1');
//   await ApiHelper.delete('/users/1');

type RequestOptions = {
    headers?: Record<string, string>;
    token?: string;
};

export class ApiHelper {
    private static defaultHeaders(options?: RequestOptions): Record<string, string> {
        const headers: Record<string, string> = {
            'Content-Type': 'application/json',
            ...options?.headers,
        };
        if (options?.token) {
            headers['Authorization'] = `Bearer ${options.token}`;
        }
        return headers;
    }

    static async get<T>(path: string, options?: RequestOptions): Promise<T> {
        const response = await fetch(`${ENV.baseUrl}${path}`, {
            method: 'GET',
            headers: ApiHelper.defaultHeaders(options),
        });
        return ApiHelper.handleResponse<T>(response);
    }

    static async post<T>(path: string, body: unknown, options?: RequestOptions): Promise<T> {
        const response = await fetch(`${ENV.baseUrl}${path}`, {
            method: 'POST',
            headers: ApiHelper.defaultHeaders(options),
            body: JSON.stringify(body),
        });
        return ApiHelper.handleResponse<T>(response);
    }

    static async put<T>(path: string, body: unknown, options?: RequestOptions): Promise<T> {
        const response = await fetch(`${ENV.baseUrl}${path}`, {
            method: 'PUT',
            headers: ApiHelper.defaultHeaders(options),
            body: JSON.stringify(body),
        });
        return ApiHelper.handleResponse<T>(response);
    }

    static async patch<T>(path: string, body: unknown, options?: RequestOptions): Promise<T> {
        const response = await fetch(`${ENV.baseUrl}${path}`, {
            method: 'PATCH',
            headers: ApiHelper.defaultHeaders(options),
            body: JSON.stringify(body),
        });
        return ApiHelper.handleResponse<T>(response);
    }

    static async delete<T = void>(path: string, options?: RequestOptions): Promise<T> {
        const response = await fetch(`${ENV.baseUrl}${path}`, {
            method: 'DELETE',
            headers: ApiHelper.defaultHeaders(options),
        });
        return ApiHelper.handleResponse<T>(response);
    }

    private static async handleResponse<T>(response: Response): Promise<T> {
        if (!response.ok) {
            const body = await response.text();
            throw new Error(`ApiHelper: ${response.status} ${response.statusText} — ${body}`);
        }
        const text = await response.text();
        return text ? (JSON.parse(text) as T) : (undefined as T);
    }
}
