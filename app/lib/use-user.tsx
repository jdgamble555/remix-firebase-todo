import { useEffect, useState } from "react";
import { useShared } from "./use-shared";
import {
    User,
    onIdTokenChanged,
    signOut,
    signInWithPopup,
    GoogleAuthProvider,
    Auth
} from "firebase/auth";
import { useFirebase } from "./firebase";

export type userData = {
    photoURL: string | null;
    uid: string;
    displayName: string | null;
    email: string | null;
};

type UserState = {
    loading: boolean;
    data: userData | null;
};

export function _useUser(initialValue: UserState = { loading: true, data: null }) {

    const { auth } = useFirebase();

    const _store = useState<UserState>(initialValue);

    const setUser = _store[1];

    useEffect(() => {

        if (!auth) {
            return;
        }

        setUser(v => ({ ...v, loading: true }));

        // subscribe to user changes
        return onIdTokenChanged(auth, (_user: User | null) => {

            if (!_user) {
                setUser({ data: null, loading: false });
                return;
            }

            // map data to user data type
            const { photoURL, uid, displayName, email } = _user;
            const data = { photoURL, uid, displayName, email };

            // print data in dev mode
            if (process.env.NODE_ENV === 'development') {
                console.log(data);
            }

            // set store
            setUser({ loading: false, data });
        });

    }, [setUser, auth]);

    return _store;
}

export const useUser = (initialValue?: UserState) => useShared('user', _useUser, initialValue);

export const loginWithGoogle = (auth: Auth | null) => {
    if (!auth) {
        return;
    }
    signInWithPopup(auth, new GoogleAuthProvider());
}

export const logout = (auth: Auth | null) => {
    if (!auth) {
        return;
    }
    signOut(auth);
};