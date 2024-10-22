import TaskItem from "./TaskItem";

export default function TaskList({ todos, deleteTask, saveTask, todoStatusChange }) {
  return (
    <ul>
      {todos.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          deleteTask={deleteTask}
          saveTask={saveTask}
          todoStatusChange={todoStatusChange}
        />
      ))}
    </ul>
  );
}
