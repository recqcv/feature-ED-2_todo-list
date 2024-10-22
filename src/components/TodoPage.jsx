import AddTask from "./AddTask";
import Filter from "./Filter";
import TaskList from "./TaskList";
import { useEffect, useState } from "react";
import { getTodos, deleteTodoById, updateTodoById } from "../api/todos";

export default function TodoPage() {
  const [todos, setTodos] = useState([]);
  const [todosInfo, setTodosInfo] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  async function updateTodosAndCounterByPickedFilter(filter) {
    setError(null);
    setIsLoading(true);
    try {
      const fetchedTodos = await getTodos(filter);
      setTodos(fetchedTodos.data);
      setTodosInfo(fetchedTodos.info);
    } catch (err) {
      setError("Не удалось обновить: " + err.message);
    } finally {
      setIsLoading(false);
    }
  }

  function updateTodoPage() {
    updateTodosAndCounterByPickedFilter();
  }

  useEffect(() => {
    async function preloadTodos() {
      updateTodoPage();
    }
    preloadTodos();
  }, []);

  async function deleteTask(id) {
    setError(null);
    setIsLoading(true);
    try {
      await deleteTodoById(id);
      updateTodoPage();
    } catch (err) {
      setError("Не удалось удалить таск: " + err.message);
    } finally {
      setIsLoading(false);
    }
  }

  async function saveTask(taskId, updatedTodo) {
    setError(null);
    setIsLoading(true);
    try {
      await updateTodoById(taskId, updatedTodo);
      updateTodoPage();
    } catch (err) {
      setError("Не удалось сохранить таск: " + err.message);
    } finally {
      setIsLoading(false);
    }
  }

  async function todoStatusChange(taskId, updatedStatus) {
    setError(null);
    setIsLoading(true);
    try {
      await updateTodoById(taskId, updatedStatus);
      updateTodoPage();
    } catch (err) {
      setError("Не удалось обновить статус таски: " + err.message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <AddTask todos={todos} setTodos={setTodos} updateTodoPage={updateTodoPage} />
      <Filter updateTodosAndCounterByPickedFilter={updateTodosAndCounterByPickedFilter} todosInfo={todosInfo} />
      {isLoading && <h3 style={{ color: "red" }}>Идёт загрузка</h3>}
      {error && <h1 style={{ color: "red" }}>{error}</h1>}
      <TaskList
        todos={todos}
        setTodos={setTodos}
        deleteTask={deleteTask}
        saveTask={saveTask}
        todoStatusChange={todoStatusChange}
      />
    </>
  );
}
