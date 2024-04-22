declare global {
    interface Window {
        ENV: {
            PUBLIC_FIREBASE_CONFIG: string;
        }
    }
    namespace NodeJS {
        interface ProcessEnv {
            PUBLIC_FIREBASE_CONFIG: string;
        }
    }
}

export { }
