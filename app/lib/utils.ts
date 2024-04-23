function isBrowser() {
    return typeof window !== 'undefined';
}

export function getFirebaseConfig() {
    const env = isBrowser()
        ? window.ENV
        : process.env;
    return JSON.parse(env.PUBLIC_FIREBASE_CONFIG);
}