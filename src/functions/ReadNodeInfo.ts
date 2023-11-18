import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import { DkgHelper } from "../dkg/DkgHelper";

export async function ReadNodeInfo(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
    context.log(`Http function processed request for url "${request.url}"`);

    // initialize DKG
    const dkg = DkgHelper.getClient();

    // Get the node info
    const nodeInfo = await dkg.node.info();
    context.log(`Node info: ${JSON.stringify(nodeInfo)}`);

    return { jsonBody: nodeInfo };
};

app.http('ReadNodeInfo', {
    methods: ['GET'],
    authLevel: 'anonymous',
    route: 'node/info',
    handler: ReadNodeInfo
});
