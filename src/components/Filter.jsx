import { useEffect, useState } from "react";
import { getTodosStatus } from "../api";

export default function Filter({ handleFilterClick }) {
  const [todoInfo, setTodoInfo] = useState([]);

  useEffect(() => {
    async function fetchTodos() {
      const todoInfo = await getTodosStatus("all");
      setTodoInfo(todoInfo);
    }
    fetchTodos();
  }, [setTodoInfo]);
  //Можно перенести в TodoPage и прокинуть todoInfo для рендера

  return (
    <div className="filter">
      <button className="filter_button" onClick={() => handleFilterClick("all")}>
        All {todoInfo.all}
      </button>
      <button className="filter_button" onClick={() => handleFilterClick("inWork")}>
        In Work {todoInfo.inWork}
      </button>
      <button className="filter_button" onClick={() => handleFilterClick("completed")}>
        Completed {todoInfo.completed}
      </button>
    </div>
  );
}
