import { useState, type SubmitEvent } from "react";

import { addTodo, generateText, useTodos } from "~/lib/use-todos";
import { Todo } from "./todo-item";

export default function Todos() {
  const todos = useTodos();

  return (
    <div>
      <div className="flex flex-col gap-3">
        {todos.loading ? (
          <p>Loading todos...</p>
        ) : todos.error ? (
          <p role="alert" className="text-red-600">{todos.error}</p>
        ) : (
          todos.data.length ? todos.data.map((todo) => (
            <Todo key={todo.id} todo={todo} />
          )) : <p><b>Add your first todo item!</b></p>
        )}
      </div>
      <TodoForm />
    </div>
  );
}

export function TodoForm() {
  const [text, setText] = useState(generateText);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    const result = await addTodo(text);
    setError(result.error);

    if (!result.error) setText(generateText());
  };

  return (
    <div className="mt-5">
      <form className="flex items-center justify-center gap-3" onSubmit={onSubmit}>
        <input
          className="p-2 border rounded-lg"
          aria-label="New task"
          value={text}
          onChange={(event) => setText(event.currentTarget.value)}
          required
        />
        <button className="p-2 font-semibold text-white bg-purple-600 border rounded-lg" type="submit">
          Add Task
        </button>
      </form>
      {error && (
        <p role="alert" className="mt-2 text-center text-red-600">{error}</p>
      )}
    </div>
  );
}
