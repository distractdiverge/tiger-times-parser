import R from 'ramda';
import rc from 'rc';

const appName = 'ttparser';
const config = rc(appName, {
    google: {
        clientId: undefined,
        clientSecret: undefined,
    },
});

export const getGoogleConfig = () => ({
    clientId: R.path(['google','client_id'], config),
    clientSecret: R.path(['google', 'client_secret'], config),
});
