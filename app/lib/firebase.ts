import { getApp, getApps, initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

declare global {
    interface Window {
        ENV: {
            PUBLIC_FIREBASE_CONFIG: object;
        }
    }
}

export const useFirebase = () => {

    if (process.env.PUBLIC_FIREBASE_CONFIG) {
        return {
            db: null,
            auth: null
        }
    }

    const firebase_config = window.ENV.PUBLIC_FIREBASE_CONFIG;
    const app = getApps().length
        ? getApp()
        : initializeApp(firebase_config);

    return {
        auth: getAuth(app),
        db: getFirestore(app)
    };
};