import R from 'ramda';
import rc from 'rc';

const appName = 'ttparser';
const config = rc(appName, {
    google: {
        clientId: undefined,
        clientSecret: undefined,
    },
});

export const getGoogleConfig = (): IOAuthCredentials => ({
    clientId: R.path(['google','client_id'], config),
    clientSecret: R.path(['google', 'client_secret'], config),
    redirectURIs: R.path(['google', 'redirect_uris'], config),
});

export interface IOAuthCredentials {
    clientId: string;
    clientSecret: string;
    redirectURIs: string[];
}
