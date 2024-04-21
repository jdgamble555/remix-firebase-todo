import { getApps, initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { useShared } from './use-shared';
import getFirebaseEnv from './get-env';

const _useFirebase = () => {

    const firebase_config = getFirebaseEnv();

    if (!getApps().length) {
        initializeApp(firebase_config);
    }

    return {
        auth: getAuth(),
        db: getFirestore()
    };
};

export const useFirebase = (init?: boolean) => useShared('firebase', _useFirebase, init);