import { useFirebase } from "./firebase";
import { loginWithGoogle, logout } from "./use-user";

export const Loading = () => {
    return <p>Loading...</p>;
};

export const Login = () => {
    const { auth } = useFirebase();
    return <button type="button" className="border p-2 rounded-md text-white bg-red-600"
        onClick={() => loginWithGoogle(auth)}>
        Signin with Google
    </button>
};

export const Logout = () => {
    const { auth } = useFirebase();
    return <p>
        <button type="button" className="border p-2 rounded-md text-white bg-lime-600" onClick={() => logout(auth)}>
            Logout
        </button>
    </p>;
};