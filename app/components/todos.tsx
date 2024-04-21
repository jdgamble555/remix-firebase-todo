import { addTodo, useTodos } from "~/lib/use-todos";
import { useUser, userData } from "~/lib/use-user";
import { Todo } from "./todo-item";
import { useFirebase } from "~/lib/firebase";

export default function Todos() {

    const _user = useUser();

    const { todos } = useTodos(_user);

    const user = _user[0];

    if (!user.data) {
        return;
    }

    return (
        <div>
            <div className="grid grid-cols-[auto,auto,auto,auto] gap-3 justify-items-start">
                {todos.length
                    ? todos.map((todo) => <Todo key={todo.id} {...{ todo }} />)
                    : <p><b>Add your first todo item!</b></p>
                }
            </div>
            <TodoForm {...user.data} />
        </div>
    );

}

export const TodoForm = (user: userData) => {
    const { db } = useFirebase();
    return (
        <form className="flex gap-3 items-center justify-center mt-5" onSubmit={(e) => addTodo(e, user.uid, db)}>
            <input className="border p-2" name="task" />
            <button className="border p-2 rounded-md text-white bg-sky-700" type="submit">
                Add Task
            </button>
        </form>
    );
};