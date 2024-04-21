import { TodoItem, deleteTodo, updateTodo } from "~/lib/use-todos";
import { Fragment } from 'react';
import { useFirebase } from "~/lib/firebase";

// each todo item
export const Todo = ({ todo }: { todo: TodoItem, key: string }) => {
    const { db } = useFirebase();
    return (
        <Fragment key={todo.id}>
            <span className={todo.complete ? 'line-through text-green-700' : ''}>
                {todo.text}
            </span>
            <span className={todo.complete ? 'line-through text-green-700' : ''}>
                {todo.id}
            </span>
            {todo.complete
                ? <button type="button" onClick={() => updateTodo(todo.id, !todo.complete, db)}>
                    ✔️
                </button>
                : <button type="button" onClick={() => updateTodo(todo.id, !todo.complete, db)}>
                    ❌
                </button>}
            <button type="button" onClick={() => deleteTodo(todo.id, db)}>🗑</button>
        </Fragment>
    );
};