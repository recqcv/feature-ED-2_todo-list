const API_ADDRESS = "https://easydev.club/api/v1";
const API_ENDPOINTS = {
  todo: "todos",
};
// вынести адресс в 1 переменную, неудобно 
export async function getTodos(filter) {
  const res = await fetch(`${API_ADDRESS}/${API_ENDPOINTS.todo}?filter=${filter}`, { method: "GET" });
  const resData = await res.json();

  if (!res.ok) {
    throw new Error(resData.message || "Something went wrong!");
  }
  return resData.data;
}

export async function createTask(todo) {
  const res = await fetch(`${API_ADDRESS}/${API_ENDPOINTS.todo}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      isDone: todo.isDone,
      title: todo.title,
    }),
  });
  const resData = await res.json();
  if (!res.ok) {
    throw new Error(resData.message || "Что то пошло не так");
  }
  return resData;
}

export async function getTodoById(id) {
  const res = await fetch(`${API_ADDRESS}/${API_ENDPOINTS.todo}/${id}`, {
    method: "GET",
  });
  const resData = await res.json();
  if (!res.ok) {
    throw new Error(resData.message || "Что то пошло не так");
  }
  return resData; //.data ???
}

export async function updateTodoById(id, updatedTodo) {
  const res = await fetch(`${API_ADDRESS}/${API_ENDPOINTS.todo}/${id}`, {
    method: "PUT",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      isDone: updatedTodo.isDone,
      title: updatedTodo.title,
    }),
  });
  const resData = await res.json();
  if (!res.ok) {
    throw new Error(resData.message || "Что то пошло не так");
  }
  return resData;
}

export async function deleteTodoById(id) {
  const res = await fetch(`${API_ADDRESS}/${API_ENDPOINTS.todo}/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) {
    throw new Error(resData.message || "Что то пошло не так");
  }
  return;
}

export async function getTodosStatus(filter) {
  const res = await fetch(`${API_ADDRESS}/${API_ENDPOINTS.todo}?filter=${filter}`, { method: "GET" });
  const resData = await res.json();

  if (!res.ok) {
    throw new Error(resData.message || "Something went wrong!");
  }
  return resData.info ;
}