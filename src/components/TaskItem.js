import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from "react";
export default function TaskItem({ task, deleteTask, saveTask, todoStatusChange }) {
    const [checked, setChecked] = useState(task.isDone);
    const [isEdited, setIsEdited] = useState(false);
    const [title, setTitle] = useState(task.title);
    function handleSaveClick(taskId, updatedTitle) {
        saveTask(taskId, { title: updatedTitle });
        setTitle(updatedTitle);
        setIsEdited(false);
    }
    function handleDeleteTask(taskId) {
        deleteTask(taskId);
    }
    function handleShowTitleInput() {
        setIsEdited(true);
    }
    function handleCancelTitleChange() {
        setIsEdited(false);
        setTitle(task.title);
    }
    function handleTodoStatusChange(taskId, updatedStatus) {
        setChecked((prev) => !prev);
        todoStatusChange(taskId, { isDone: updatedStatus });
    }
    return (_jsx(_Fragment, { children: !isEdited ? (_jsx(_Fragment, { children: _jsxs("div", { className: "todo_task_item", children: [_jsxs("label", { className: "todo_checkbox_and_task", children: [_jsx("input", { type: "checkbox", checked: checked, onChange: () => handleTodoStatusChange(task.id, !checked) }), _jsx("span", { className: checked ? "checked_task" : "", children: task.title })] }), _jsxs("div", { children: [_jsx("button", { onClick: handleShowTitleInput, children: "\uD83D\uDD8D" }), _jsx("button", { onClick: () => handleDeleteTask(task.id), children: "\uD83D\uDDD1\uFE0F" })] })] }) })) : (_jsx(_Fragment, { children: _jsxs("div", { className: "todo_task_item", children: [_jsx("label", { className: "todo_checkbox_and_task", children: _jsx("input", { type: "text", value: title, onChange: (e) => setTitle(e.target.value) }) }), _jsxs("div", { children: [_jsx("button", { onClick: () => handleSaveClick(task.id, title), children: "SAVE" }), _jsx("button", { onClick: handleCancelTitleChange, children: "CANCEL" })] })] }) })) }));
}
