import { jsxs as _jsxs } from "react/jsx-runtime";
import { filter } from '../types/types';
export default function Filter({ updateTodosAndCounterByPickedFilter, todosInfo, setActiveFilter, activeFilter }) {
    function handleUpdateTodosByPickedFilter(filter) {
        updateTodosAndCounterByPickedFilter(filter);
        setActiveFilter(filter || 'all');
    }
    return (_jsxs("div", { className: "filter", children: [_jsxs("button", { className: activeFilter === "all" ? " active_filter" : "filter_button", onClick: () => handleUpdateTodosByPickedFilter(filter.all), children: ["All ", todosInfo === null || todosInfo === void 0 ? void 0 : todosInfo.all] }), _jsxs("button", { className: activeFilter === "inWork" ? " active_filter" : "filter_button", onClick: () => handleUpdateTodosByPickedFilter(filter.inWork), children: ["In Work ", todosInfo === null || todosInfo === void 0 ? void 0 : todosInfo.inWork] }), _jsxs("button", { className: activeFilter === "completed" ? " active_filter" : "filter_button", onClick: () => handleUpdateTodosByPickedFilter(filter.completed), children: ["Completed ", todosInfo === null || todosInfo === void 0 ? void 0 : todosInfo.completed] })] }));
}
