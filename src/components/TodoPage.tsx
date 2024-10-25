import AddTask from "./AddTask";
import Filter from "./Filter";
import TaskList from "./TaskList";
import { useEffect, useState } from "react";
import { getTodos, deleteTodoById, updateTodoById } from "../api/todos";
import { TodosInfo, Todo, filter } from '../types/types'

export default function TodoPage() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [todosInfo, setTodosInfo] = useState<TodosInfo | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>("");

  async function updateTodosAndCounterByPickedFilter(filter: string) {
    setError(null);
    setIsLoading(true);
    try {
      const fetchedTodos = await getTodos(filter);
      setTodos(fetchedTodos.data);
      setTodosInfo(fetchedTodos.info);
    } catch (err: any) {
      setError("Не удалось обновить: " + err.message);
    } finally {
      setIsLoading(false);
    }
  }

  async function updateTodoPage() {
    await updateTodosAndCounterByPickedFilter(activeFilter);
    setActiveFilter(filter.all)
  }

  useEffect(() => {
    async function preloadTodos() {
      await updateTodoPage();
    }
    preloadTodos();
  }, []);

  async function deleteTask(id: number) {
    setError(null);
    setIsLoading(true);
    try {
      await deleteTodoById(id);
      updateTodoPage();
    } catch (err: any) {
      setError("Не удалось удалить таск: " + err.message);
    } finally {
      setIsLoading(false);
    }
  }

  async function saveTask(taskId: number, updatedTodo: Partial<Todo>) {
    setError(null);
    setIsLoading(true);
    try {
      await updateTodoById(taskId, updatedTodo);
      updateTodoPage();
    } catch (err: any) {
      setError("Не удалось сохранить таск: " + err.message);
    } finally {
      setIsLoading(false);
    }
  }

  async function todoStatusChange(taskId: number, updatedStatus: Partial<Todo>) {
    setError(null);
    setIsLoading(true);
    try {
      await updateTodoById(taskId, updatedStatus);
      updateTodoPage();
    } catch (err: any) {
      setError("Не удалось обновить статус таски: " + err.message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <AddTask updateTodoPage={updateTodoPage} />
      <Filter
        updateTodosAndCounterByPickedFilter={updateTodosAndCounterByPickedFilter}
        todosInfo={todosInfo}
        activeFilter={activeFilter}
        setActiveFilter={setActiveFilter}
      />
      {isLoading && <h3 style={{ color: "red" }}>Идёт загрузка</h3>}
      {error && <h1 style={{ color: "red" }}>{error}</h1>}
      <TaskList
        todos={todos}
        deleteTask={deleteTask}
        saveTask={saveTask}
        todoStatusChange={todoStatusChange}
      />
    </>
  );
}
