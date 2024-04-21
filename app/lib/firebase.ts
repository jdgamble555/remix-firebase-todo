import { getApp, getApps, initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const isBrowser = typeof window !== 'undefined';

declare global {
    interface Window {
        ENV: {
            PUBLIC_FIREBASE_CONFIG: object;
        }
    }
}

export const useFirebase = () => {

    const firebase_config = isBrowser
        ? window.ENV.PUBLIC_FIREBASE_CONFIG
        : JSON.parse(process.env.PUBLIC_FIREBASE_CONFIG!);

    const app = getApps().length
        ? getApp()
        : initializeApp(firebase_config);

    return {
        auth: getAuth(app),
        db: getFirestore(app)
    };
};