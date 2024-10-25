import { jsx as _jsx } from "react/jsx-runtime";
import TaskItem from "./TaskItem";
export default function TaskList({ todos, deleteTask, saveTask, todoStatusChange }) {
    return (_jsx("ul", { children: todos.map((task) => (_jsx(TaskItem, { task: task, deleteTask: deleteTask, saveTask: saveTask, todoStatusChange: todoStatusChange }, task.id))) }));
}
