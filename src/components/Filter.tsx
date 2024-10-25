import { filter, TodosInfo } from '../types/types'

interface FilterProps {
  updateTodosAndCounterByPickedFilter: (filter: string) => void
  todosInfo: TodosInfo | null;
  setActiveFilter: (filter: string) => void
  activeFilter: string
}
export default function Filter({ updateTodosAndCounterByPickedFilter, todosInfo, setActiveFilter, activeFilter }: FilterProps): JSX.Element {


  function handleUpdateTodosByPickedFilter(filter: filter) {
    updateTodosAndCounterByPickedFilter(filter);
    setActiveFilter(filter);
  }
  return (
    <div className="filter">
      <button
        className={activeFilter === "all" ? " active_filter" : "filter_button"}
        onClick={() => handleUpdateTodosByPickedFilter(filter.all)}
      >
        All {todosInfo?.all}
      </button>
      <button
        className={activeFilter === "inWork" ? " active_filter" : "filter_button"}
        onClick={() => handleUpdateTodosByPickedFilter(filter.inWork)}
      >
        In Work {todosInfo?.inWork}
      </button>
      <button
        className={activeFilter === "completed" ? " active_filter" : "filter_button"}
        onClick={() => handleUpdateTodosByPickedFilter(filter.completed)}
      >
        Completed {todosInfo?.completed}
      </button>
    </div>
  );
}
