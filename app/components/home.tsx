import { Loading, Login } from "~/lib/helpers";
import { useUser } from "~/lib/use-user";
import Profile from "./profile";

export default function Home() {
    const user = useUser();
    return (
        <div className="text-center">
            <h1 className="text-3xl font-semibold my-3">React Router Firebase Todo App</h1>
            {user.loading ? <Loading /> : user.data ? <Profile /> : <Login />}
        </div>
    );
}
