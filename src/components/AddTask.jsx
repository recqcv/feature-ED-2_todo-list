import { useState } from "react";
import { createTask } from "../api";

export default function AddTask({ setTodoArray, todoArray }) {
  const [todo, setTodo] = useState("");
  const [error, setError] = useState(null);

  async function handleAddTask() {
    if (todo.trim().length < 2 || todo.trim().length > 64) {
      alert("От 2 до 64 символов");
      return;
    }
    try {
      const newTask = await createTask({ title: todo });
      setTodoArray([...todoArray, newTask]);
      setError(null);
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <>
      <form onSubmit={(e) => e.preventDefault()}>
        <input type="text" placeholder="Task To Be Done..." value={todo} onChange={(e) => setTodo(e.target.value)} />
        <button name="addPost" onClick={handleAddTask}>
          ADD
        </button>
      </form>
      {error && <p style={{ color: "red" }}>Ошибка: {error}</p>}
    </>
  );
}
