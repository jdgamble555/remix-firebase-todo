import { loginWithGoogle, logout } from "./use-user";

export const Loading = () => <p>Loading...</p>;

export const Login = () => (
  <button
    type="button"
    className="p-2 text-white bg-red-600 border rounded-md"
    onClick={() => loginWithGoogle()}
  >
    Sign in with Google
  </button>
);

export const Logout = () => (
  <p>
    <button
      type="button"
      className="p-2 text-white border rounded-md bg-lime-600"
      onClick={() => logout()}
    >
      Logout
    </button>
  </p>
);
