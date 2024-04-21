import { getApps, initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { useShared } from './use-shared';
import getEnv from './get-env';

const _useFirebase = () => {

    const env = getEnv();

    if (!getApps().length) {

        const firebase_config = JSON.parse(
            env.PUBLIC_FIREBASE_CONFIG as string
        );
        console.log(firebase_config);
        initializeApp(firebase_config);
    }

    return {
        auth: getAuth(),
        db: getFirestore()
    };
};

export const useFirebase = (init?: boolean) => useShared('firebase', _useFirebase, init);