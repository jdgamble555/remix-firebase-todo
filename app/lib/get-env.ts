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

function getFirebaseEnv() {
    return isBrowser()
        ? window.ENV.PUBLIC_FIREBASE_CONFIG
        : JSON.parse(process.env.PUBLIC_FIREBASE_CONFIG!);
}

export default getFirebaseEnv;