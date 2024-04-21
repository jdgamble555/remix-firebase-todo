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

// initialize and login
const firebase_config = isBrowser
    ? window.ENV.PUBLIC_FIREBASE_CONFIG!
    : JSON.parse(process.env.PUBLIC_FIREBASE_CONFIG!);

export const app = getApps().length
    ? getApp()
    : initializeApp(firebase_config);

export const auth = isBrowser ? getAuth() : null;
export const db = isBrowser ? getFirestore() : null;