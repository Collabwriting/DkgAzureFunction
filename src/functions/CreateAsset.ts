import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import { DkgResponse } from "../types/DkgResponse";
import { DkgHelper } from "../dkg/DkgHelper";
import { AuthService } from "../services/AuthService";

import "dotenv/config";
import { UnauthorizedResponse } from "../responses/UnauthorizedResponse";

export async function CreateAsset(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {

    context.log(`Http function processed request for url "${request.url}"`);

    if (!AuthService.isAuthorized(request.headers))
        return new UnauthorizedResponse();

    let asset : any = await request.json();

    const dkg = DkgHelper.getClient();

    const response : DkgResponse = await dkg.asset.create({
        public: asset,
      },
      { epochsNum: 2 }
    ) as DkgResponse;

    context.log(`Asset created: ${JSON.stringify(response)}`);

    return {
        jsonBody: response,
        status: 200,
    };
};

// POST /assets - Create a new asset
app.http('CreateAsset', {
    methods: ['POST'],
    authLevel: 'anonymous',
    route: 'assets',
    handler: CreateAsset
});
