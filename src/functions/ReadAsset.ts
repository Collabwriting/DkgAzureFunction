import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import { DkgResponse } from "../types/DkgResponse";
import { DkgHelper } from "../dkg/DkgHelper";
import { AuthService } from "../services/AuthService";

import "dotenv/config";
import { UnauthorizedResponse } from "../responses/UnauthorizedResponse";

export async function ReadAsset(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {

    context.log(`Http function processed request for url "${request.url}"`);

    if (!AuthService.isAuthorized(request.headers))
        return new UnauthorizedResponse();

    const dkg = DkgHelper.getClient();

    const ual = decodeURIComponent(request.params.ual);

    const response = await dkg.asset.get(ual);

    // convert assertion to object
    let assertion = {
        "@id": response.assertion[0]["@id"],
        content: response.assertion[0]["http://schema.org/content"][0]["@value"],
        createdAt: Number(response.assertion[0]["http://schema.org/createdAt"][0]["@value"]),
        title: response.assertion[0]["http://schema.org/title"][0]["@value"],
        url: response.assertion[0]["http://schema.org/url"][0]["@id"],
    };
    
    context.log(`Asset read: ${JSON.stringify(assertion)}`);

    return {
        jsonBody: assertion,
        status: 200,
    };
};

// GET /assets/{ual} - Read a new asset
app.http('ReadAsset', {
    methods: ['GET'],
    authLevel: 'anonymous',
    route: 'assets/{ual}',
    handler: ReadAsset
});
