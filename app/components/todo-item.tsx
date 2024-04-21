import { TodoItem, deleteTodo, updateTodo } from "~/lib/use-todos";
import { Fragment } from 'react';

// each todo item
export const Todo = ({ todo }: { todo: TodoItem, key: string }) => {
    return (
        <Fragment key={todo.id}>
            <span className={todo.complete ? 'line-through text-green-700' : ''}>
                {todo.text}
            </span>
            <span className={todo.complete ? 'line-through text-green-700' : ''}>
                {todo.id}
            </span>
            {todo.complete
                ? <button type="button" onClick={() => updateTodo(todo.id, !todo.complete)}>
                    ✔️
                </button>
                : <button type="button" onClick={() => updateTodo(todo.id, !todo.complete)}>
                    ❌
                </button>}
            <button type="button" onClick={() => deleteTodo(todo.id)}>🗑</button>
        </Fragment>
    );
};