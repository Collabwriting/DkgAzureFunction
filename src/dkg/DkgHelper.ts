const DKG = require('dkg.js'); // import DKG from "dkg.js" - Doesn't work with typescript

export class DkgHelper {

    public static getClient() {
        return new DKG({
            endpoint: process.env.OT_NODE_HOSTNAME,
            port: 80,
            blockchain: {
            name: process.env.BLOCKCHAIN_NAME,
            publicKey: process.env.WALLET_PUBLIC_KEY,
            privateKey: process.env.WALLET_PRIVATE_KEY,
            },
        });
    }
}