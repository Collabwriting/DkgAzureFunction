import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import { DkgHelper } from "../dkg/DkgHelper";
import { UnauthorizedResponse } from "../responses/UnauthorizedResponse";
import { AuthService } from "../services/AuthService";

export async function IncreaseAllowance(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {

    context.log(`Http function processed request for url "${request.url}"`);

    if(!AuthService.isAuthorized(request.headers))
        return new UnauthorizedResponse();

    const dkg = DkgHelper.getClient();

    const transaction = await dkg.asset.increaseAllowance('1569429592284014000');

    context.log(`Increased allowance - transactionHash (${transaction.transactionHash})`);

    return { jsonBody: transaction };
};

app.http('IncreaseAllowance', {
    methods: ['POST'],
    authLevel: 'anonymous',
    route: 'allowance',
    handler: IncreaseAllowance
});
