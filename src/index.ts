import { getGoogleConfig } from './config';

const main = () => {
    const config = getGoogleConfig();
};

if (require.main === module) {
    main();
}

export {
    main,
};
