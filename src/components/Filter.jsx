import { useEffect } from "react";
import { useState } from "react";

export default function Filter({ updateTodosAndCounterByPickedFilter, todosInfo }) {
  const [activeFilter, serActiveFilter] = useState("all");

  function handleUpdateTodosByPickedFilter(filter) {
    updateTodosAndCounterByPickedFilter(filter);
    serActiveFilter(filter);
  }
  return (
    <div className="filter">
      <button
        className={activeFilter === "all" ? " active_filter" : "filter_button"}
        onClick={() => handleUpdateTodosByPickedFilter("all")}
      >
        All {todosInfo.all}
      </button>
      <button
        className={activeFilter === "inWork" ? " active_filter" : "filter_button"}
        onClick={() => handleUpdateTodosByPickedFilter("inWork")}
      >
        In Work {todosInfo.inWork}
      </button>
      <button
        className={activeFilter === "completed" ? " active_filter" : "filter_button"}
        onClick={() => handleUpdateTodosByPickedFilter("completed")}
      >
        Completed {todosInfo.completed}
      </button>
    </div>
  );
}
