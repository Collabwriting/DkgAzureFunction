import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import { DkgHelper } from "../dkg/DkgHelper";
import { UnauthorizedResponse } from "../responses/UnauthorizedResponse";
import { AuthService } from "../services/AuthService";

export async function ReadAllowance(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
    context.log(`Http function processed request for url "${request.url}"`);

    if(!AuthService.isAuthorized(request.headers))
        return new UnauthorizedResponse();

    const dkg = DkgHelper.getClient();
        
    const currentAllowance = await dkg.asset.getCurrentAllowance();

    context.log(`Current allowance: ${currentAllowance}`);

    return { body: currentAllowance };
};

app.http('ReadAllowance', {
    methods: ['GET'],
    authLevel: 'anonymous',
    route: 'allowance',
    handler: ReadAllowance
});
