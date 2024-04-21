import { getApps, initializeApp } from 'firebase/app';
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

    if (!getApps().length) {

        const firebase_config = typeof process === 'undefined'
            ? window.ENV.PUBLIC_FIREBASE_CONFIG
            : JSON.parse(process.env.PUBLIC_FIREBASE_CONFIG!);

        initializeApp(firebase_config);
    }

    return {
        auth: getAuth(),
        db: getFirestore()
    };
};