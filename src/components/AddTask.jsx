import { useState } from "react";
import { createTask } from "../api/todos";

export default function AddTask({ updateTodoPage }) {
  const [title, setTitle] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false)

  async function handleAddTask() {
    if (title.trim().length < 2 || title.trim().length > 64) {
      alert("От 2 до 64 символов");
      return;
    }
    setIsLoading(true)
    try {
      await createTask({ title: title });
      updateTodoPage();
      setTitle("");
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <form onSubmit={(e) => e.preventDefault()}>
        <input type="text" placeholder="Task To Be Done..." value={title} onChange={(e) => setTitle(e.target.value)} />
        <button name="addPost" onClick={handleAddTask} disabled={isLoading}>
          {isLoading ? 'Wait' : 'ADD'}
        </button>
      </form>
      {error && <p style={{ color: "red" }}>Ошибка: {error}</p>}
    </>
  );
}
