export class AuthService {

    /**
     * Checks if the request is authorized by comparing the X-API-KEY header with the API_KEY environment variable.
     * 
     * @param headers The request headers
     * @returns true if the request is authorized, false otherwise
     */
    static isAuthorized (headers: any): boolean {
        return headers.get('X-API-KEY') === process.env.API_KEY;
    }
}