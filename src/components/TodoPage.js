var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import AddTask from "./AddTask";
import Filter from "./Filter";
import TaskList from "./TaskList";
import { useEffect, useState } from "react";
import { getTodos, deleteTodoById, updateTodoById } from "../api/todos";
export default function TodoPage() {
    const [todos, setTodos] = useState([]);
    const [todosInfo, setTodosInfo] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [activeFilter, setActiveFilter] = useState("");
    function updateTodosAndCounterByPickedFilter(filter) {
        return __awaiter(this, void 0, void 0, function* () {
            setError(null);
            setIsLoading(true);
            try {
                const fetchedTodos = yield getTodos(filter);
                setTodos(fetchedTodos.data);
                setTodosInfo(fetchedTodos.info);
            }
            catch (err) {
                setError("Не удалось обновить: " + err.message);
            }
            finally {
                setIsLoading(false);
            }
        });
    }
    function updateTodoPage() {
        return __awaiter(this, void 0, void 0, function* () {
            yield updateTodosAndCounterByPickedFilter(activeFilter);
            setActiveFilter('all');
        });
    }
    useEffect(() => {
        function preloadTodos() {
            return __awaiter(this, void 0, void 0, function* () {
                yield updateTodoPage();
            });
        }
        preloadTodos();
    }, []);
    function deleteTask(id) {
        return __awaiter(this, void 0, void 0, function* () {
            setError(null);
            setIsLoading(true);
            try {
                yield deleteTodoById(id);
                updateTodoPage();
            }
            catch (err) {
                setError("Не удалось удалить таск: " + err.message);
            }
            finally {
                setIsLoading(false);
            }
        });
    }
    function saveTask(taskId, updatedTodo) {
        return __awaiter(this, void 0, void 0, function* () {
            setError(null);
            setIsLoading(true);
            try {
                yield updateTodoById(taskId, updatedTodo);
                updateTodoPage();
            }
            catch (err) {
                setError("Не удалось сохранить таск: " + err.message);
            }
            finally {
                setIsLoading(false);
            }
        });
    }
    function todoStatusChange(taskId, updatedStatus) {
        return __awaiter(this, void 0, void 0, function* () {
            setError(null);
            setIsLoading(true);
            try {
                yield updateTodoById(taskId, updatedStatus);
                updateTodoPage();
            }
            catch (err) {
                setError("Не удалось обновить статус таски: " + err.message);
            }
            finally {
                setIsLoading(false);
            }
        });
    }
    return (_jsxs(_Fragment, { children: [_jsx(AddTask, { updateTodoPage: updateTodoPage }), _jsx(Filter, { updateTodosAndCounterByPickedFilter: updateTodosAndCounterByPickedFilter, todosInfo: todosInfo, activeFilter: activeFilter, setActiveFilter: setActiveFilter }), isLoading && _jsx("h3", { style: { color: "red" }, children: "\u0418\u0434\u0451\u0442 \u0437\u0430\u0433\u0440\u0443\u0437\u043A\u0430" }), error && _jsx("h1", { style: { color: "red" }, children: error }), _jsx(TaskList, { todos: todos, deleteTask: deleteTask, saveTask: saveTask, todoStatusChange: todoStatusChange })] }));
}
