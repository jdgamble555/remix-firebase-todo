'use client';

import { Loading, Login } from "~/lib/helpers";
import { useUser } from "~/lib/use-user";
import Profile from "./profile";
import { useFirebase } from "~/lib/firebase";

export default function Home() {

    useFirebase(true);

    const [user] = useUser({ data: null, loading: true });

    return (
        <div className="text-center">
            <h1 className="text-3xl font-semibold my-3">
                Remix Firebase Todo App
            </h1>
            {user.loading ? <Loading /> : user.data ? <Profile /> : <Login />}
        </div>
    );
}
