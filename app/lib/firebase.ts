import { getApps, initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { useShared } from './use-shared';
import { useEnv } from './use-env';

const _useFirebase = () => {

    const [env] = useEnv();

    console.log(env);

    const firebase_config = JSON.parse(env.PUBLIC_FIREBASE_CONFIG);

    if (!getApps().length) {
        initializeApp(firebase_config);
    }

    return {
        auth: getAuth(),
        db: getFirestore()
    };
};

export const useFirebase = (init?: boolean) => useShared('firebase', _useFirebase, init);