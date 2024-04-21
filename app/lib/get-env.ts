declare global {
    interface Window {
        ENV: {
            PUBLIC_FIREBASE_CONFIG: object;
        }
    }
}

function isBrowser() {
    return typeof window !== 'undefined';
}

function getEnv() {
    return isBrowser() ? window!.ENV : process.env;
}

export default getEnv;