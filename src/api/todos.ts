// const BASE_TODOS_URL = "https://easydev.club/api/v1/todos";
import { filter, Todo } from '../types/types'

export async function getTodos(filter:filter) {
  try {
    const res = await fetch(`https://easydev.club/api/v1/todos?filter=${filter}`, { method: "GET" });

    if (!res.ok) {
      throw new Error("Something went wrong!");
    }
    const resData = await res.json();
    return resData;
  } catch (err: any) {
    throw console.error('Ошибка в функции "getTodos": ', err);
  }
}

export async function createTask(todo: Partial<Todo>) {
  try {
    const res = await fetch("https://easydev.club/api/v1/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        isDone: todo.isDone,
        title: todo.title,
      }),
    });

    if (!res.ok) {
      throw new Error("Что то пошло не так");
    }
    const resData = await res.json();
    return resData;
  } catch (err: any) {
    throw console.error('Ошибка в "createTask": ', err);
  }
}

export async function getTodoById(id: number) {
  try {
    const res = await fetch(`https://easydev.club/api/v1/todos/${id}`, {
      method: "GET",
    });

    if (!res.ok) {
      throw new Error("Что то пошло не так");
    }
    const resData = await res.json();
    return resData;
  } catch (err: any) {
    throw console.error('Ощибка в "getTodoById": ', err);
  }
}

export async function updateTodoById(id: number, updatedTodo: Partial<Todo>) {
  try {
    const res = await fetch(`https://easydev.club/api/v1/todos/${id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        isDone: updatedTodo.isDone,
        title: updatedTodo.title,
      }),
    });

    if (!res.ok) {
      throw new Error("Что то пошло не так");
    }

    const resData = await res.json();
    return resData;
  } catch (err: any) {
    throw console.error('Ошибка в "updateTodoById": ', err);
  }
}

export async function deleteTodoById(id: number) {
  try {
    const res = await fetch(`https://easydev.club/api/v1/todos/${id}`, {
      method: "DELETE",
    });
    if (!res.ok) {
      throw new Error("Что то пошло не так");
    }
    return;
  } catch (err: any) {
    throw console.error('Ошибка в "deleteTodoById": ', err);
  }
}
