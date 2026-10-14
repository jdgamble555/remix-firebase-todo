import { useState } from "react";
import { deleteTodo, updateTodo, type TodoDoc } from "~/lib/use-todos";

export function Todo(props: { todo: TodoDoc }) {
  const [error, setError] = useState<string | null>(null);

  const toggleComplete = async () => {
    const result = await updateTodo(props.todo.id, !props.todo.complete);
    setError(result.error);
  };

  const handleDelete = async () => {
    const result = await deleteTodo(props.todo.id);
    setError(result.error);
  };

  return (
    <div className="grid grid-cols-[auto_auto_auto_auto] gap-3 items-center justify-items-start">
      <span className={props.todo.complete ? "line-through text-green-700" : ""}>
        {props.todo.text}
      </span>
      <span className={props.todo.complete ? "line-through text-green-700" : ""}>
        {props.todo.id}
      </span>
      <button type="button" aria-label="Toggle task completion" onClick={toggleComplete}>
        {props.todo.complete ? "✔️" : "❌"}
      </button>
      <button type="button" aria-label="Delete task" onClick={handleDelete}>
        🗑
      </button>
      {error && (
        <p role="alert" className="col-span-4 text-red-600">{error}</p>
      )}
    </div>
  );
}
