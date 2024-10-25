var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export function getTodos() {
    return __awaiter(this, arguments, void 0, function* (filter = "all") {
        try {
            const res = yield fetch(`https://easydev.club/api/v1/todos?filter=${filter}`, { method: "GET" });
            if (!res.ok) {
                throw new Error("Something went wrong!");
            }
            const resData = yield res.json();
            return resData;
        }
        catch (err) {
            console.error('Ошибка в функции "getTodos": ', err);
        }
    });
}
export function createTask(todo) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const res = yield fetch("https://easydev.club/api/v1/todos", {
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
            const resData = yield res.json();
            return resData;
        }
        catch (err) {
            console.error('Ошибка в "createTask": ', err);
        }
    });
}
export function getTodoById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const res = yield fetch(`https://easydev.club/api/v1/todos/${id}`, {
                method: "GET",
            });
            if (!res.ok) {
                throw new Error("Что то пошло не так");
            }
            const resData = yield res.json();
            return resData;
        }
        catch (err) {
            console.error('Ощибка в "getTodoById": ', err);
        }
    });
}
export function updateTodoById(id, updatedTodo) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const res = yield fetch(`https://easydev.club/api/v1/todos/${id}`, {
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
            const resData = yield res.json();
            return resData;
        }
        catch (err) {
            console.error('Ошибка в "updateTodoById": ', err);
        }
    });
}
export function deleteTodoById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const res = yield fetch(`https://easydev.club/api/v1/todos/${id}`, {
                method: "DELETE",
            });
            if (!res.ok) {
                throw new Error("Что то пошло не так");
            }
            return;
        }
        catch (err) {
            console.error('Ошибка в "deleteTodoById": ', err);
        }
    });
}
