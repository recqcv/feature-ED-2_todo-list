const BASE_TODOS_URL = "https://easydev.club/api/v1/todos";

// вынести адресс в 1 переменную, неудобно
export async function getTodos(filter = "all") {
  try {
    const res = await fetch(`https://easydev.club/api/v1/todos?filter=${filter}`, { method: "GET" });
    if (!res.ok) {
      throw new Error(resData.message || "Something went wrong!");
    }
    const resData = await res.json();
    return resData;
  } catch (err) {
    console.err('Ошибка в функции "getTodos": ', err);
  }
  // return resData.data; массив
  // return resData.info; для фильтра
}

export async function createTask(todo) {
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
      throw new Error(resData.message || "Что то пошло не так");
    }
    const resData = await res.json();
    return resData;
  } catch (err) {
    console.error('Ошибка в "createTask": ', err);
  }
}

export async function getTodoById(id) {
  try {
    const res = await fetch(`https://easydev.club/api/v1/todos/${id}`, {
      method: "GET",
    });

    if (!res.ok) {
      throw new Error(resData.message || "Что то пошло не так");
    }
    const resData = await res.json();
    return resData;
  } catch (err) {
    console.error('Ощибка в "getTodoById": ', err);
  }
}

export async function updateTodoById(id, updatedTodo) {
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
      throw new Error(resData.message || "Что то пошло не так");
    }

    const resData = await res.json();
    return resData;
  } catch (err) {
    console.error('Ошибка в "updateTodoById": ', err);
  }
}

export async function deleteTodoById(id) {
  try {
    const res = await fetch(`https://easydev.club/api/v1/todos/${id}`, {
      method: "DELETE",
    });
    if (!res.ok) {
      throw new Error(resData.message || "Что то пошло не так");
    }
    return;
  } catch (err) {
    console.error('Ошибка в "deleteTodoById": ', err);
  }
}
