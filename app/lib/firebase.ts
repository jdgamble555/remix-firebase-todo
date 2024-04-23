import { getApp, getApps, initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { useShared } from './use-shared';
import { getFirebaseConfig } from './utils';

const firebase_config = getFirebaseConfig();

export const app = getApps().length
    ? getApp()
    : initializeApp(firebase_config);

const _useFirebase = () => ({
    auth: getAuth(),
    db: getFirestore()
});

export const useFirebase = (init?: boolean) =>
    useShared('firebase', _useFirebase, init);