import { ENV } from '../config/env';

// "Pages" hold route metadata — URLs, API endpoints, expected titles.
// No locators or business logic live here.
export class LoginPage {
    static readonly url = `${ENV.baseUrl}/login`;
    static readonly loginApiEndpoint = '/authenticate';
}
