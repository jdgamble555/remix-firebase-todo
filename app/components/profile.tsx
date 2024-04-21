import { Logout } from "~/lib/helpers";
import { useUser } from "~/lib/use-user";

import Todos from "./todos";

export default function Profile() {

    const [user] = useUser();

    if (!user.data) {
        return;
    }

    const { displayName, photoURL, uid } = user.data;

    return (
        <div className="flex flex-col gap-3 items-center">
            <h3 className="font-bold">Hi {displayName}!</h3>
            {photoURL &&
                <img src={photoURL} width="100" height="100" alt="user avatar" />
            }
            <p>Your userID is {uid}</p>
            <Logout />
            <Todos />
        </div>
    );
}