import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { FirebaseError } from "firebase/app";
import { GoogleAuthProvider, onIdTokenChanged, signInWithPopup, signOut } from "firebase/auth";
import { auth } from "./firebase";

export type UserType = {
  displayName: string | null;
  photoURL: string | null;
  uid: string;
  email: string | null;
};

export type UserState = {
  loading: boolean;
  data: UserType | null;
};

const UserContext = createContext<UserState | null>(null);

export function UserProvider({ children }: { children: ReactNode }) {
  const [getUser, setUser] = useState<UserState>({ loading: true, data: null });

  useEffect(() => onIdTokenChanged(auth, (user) => {
    if (!user) {
      setUser({ loading: false, data: null });
      return;
    }
    const { displayName, photoURL, uid, email } = user;
    setUser({ loading: false, data: { displayName, photoURL, uid, email } });
  }), []);

  return <UserContext value={getUser}>{children}</UserContext>;
}

export function useUser() {
  const getUser = useContext(UserContext);
  if (!getUser) throw new Error("useUser requires a UserProvider.");
  return getUser;
}

export const loginWithGoogle = async () => {
  try {
    await signInWithPopup(auth, new GoogleAuthProvider());
    return { error: null };
  } catch (error) {
    if (error instanceof FirebaseError) {
      return { error: error.message };
    }
    throw error;
  }
};

export const logout = async () => {
  try {
    await signOut(auth);
    return { error: null };
  } catch (error) {
    if (error instanceof FirebaseError) {
      return { error: error.message };
    }
    throw error;
  }
};
