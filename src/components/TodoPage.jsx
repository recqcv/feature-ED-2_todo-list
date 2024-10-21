import AddTask from "./AddTask";
import Filter from "./Filter";
import TaskList from "./TaskList";
import { useEffect, useState } from "react";
import { getTodos, deleteTodoById, updateTodoById } from "../api";

export default function TodoPage() {
  const [todo, setTodo] = useState([]);
  async function handleFilterClick(filter) {
    setTodo(await getTodos(filter));
  }

  useEffect(() => {
    async function fetchTodos() {
      const todo = await getTodos();
      setTodo(todo);
    }
    fetchTodos();
  }, []);

  async function handleDeleteTask(id) {
    await deleteTodoById(id);
    setTodo(todo.filter((todo) => todo.id !== id));
  }

  async function handleSaveClick(TaskId, updatedTodo) {
    await updateTodoById(TaskId, updatedTodo);
    setTodo(todo.map((todo) => (todo.id === TaskId ? updatedTodo : todo)));
  }

  return (
    <>
      <AddTask todoArray={todo} setTodoArray={setTodo} />
      <Filter handleFilterClick={handleFilterClick} />
      <TaskList todo={todo} setTodo={setTodo} handleDeleteTask={handleDeleteTask} handleSaveClick={handleSaveClick} />
    </>
  );
}
