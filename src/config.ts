import R from 'ramda';
import rc from 'rc';

const appName = 'ttparser';
const config = rc(appName, {
    google: {
        clientId: undefined,
        clientSecret: undefined,
        redirectURIs: [],
        tokenPath: 'token.json',
    },
});

export const getGoogleConfig = () => ({
    paths: {
        tokenPath: R.path(['google', 'token_path'], config),
    },
    oAuthCredentials: {
        clientId: R.path(['google','client_id'], config),
        clientSecret: R.path(['google', 'client_secret'], config),
        redirectURIs: R.path(['google', 'redirect_uris'], config),
    },
});

export interface IGoogleConfig {
    paths: { tokenPath: string };
    oAuthCredentials: IOAuthCredentials;
}

export interface IOAuthCredentials {
    clientId: string;
    clientSecret: string;
    redirectURIs: string[];
}
