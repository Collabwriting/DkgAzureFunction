export class UnauthorizedResponse {

    status: number;
    body: string;

    /**
     * Creates a new UnauthorizedResponse object with the given body and status code 401
     * @param body The response body
     */
    constructor(body: string = 'Unauthorized') {
        this.status = 401;
        this.body = body;
    }
}