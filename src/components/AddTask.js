var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from "react";
import { createTask } from "../api/todos";
export default function AddTask({ updateTodoPage }) {
    const [title, setTitle] = useState("");
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    function handleAddTask() {
        return __awaiter(this, void 0, void 0, function* () {
            if (title.trim().length < 2 || title.trim().length > 64) {
                alert("От 2 до 64 символов");
                return;
            }
            setIsLoading(true);
            try {
                yield createTask({ title: title });
                updateTodoPage();
                setTitle("");
                setError(null);
            }
            catch (err) {
                setError(err.message);
            }
            finally {
                setIsLoading(false);
            }
        });
    }
    return (_jsxs(_Fragment, { children: [_jsxs("form", { onSubmit: (e) => {
                    e.preventDefault();
                }, children: [_jsx("input", { type: "text", placeholder: "Task To Be Done...", value: title, onChange: (e) => setTitle(e.target.value) }), _jsx("button", { name: "addPost", onClick: handleAddTask, disabled: isLoading, children: isLoading ? "Wait" : "ADD" })] }), error && _jsxs("p", { style: { color: "red" }, children: ["\u041E\u0448\u0438\u0431\u043A\u0430: ", error] })] }));
}
