import TaskItem from "./TaskItem";

export default function TaskList({ todo, handleDeleteTask, handleSaveClick }) {
  return (
    <ul>
      {todo.map((task) => (
        <TaskItem 
        key={task.id} 
        task={task} 
        handleDeleteTask={handleDeleteTask}
        handleSaveClick={handleSaveClick}
        />
      ))}

    </ul>
  );
}
