import TaskItem from "./TaskItem";
import { Todo } from '@/types/types'

interface TaskListProps {
  todos: Todo[];
  deleteTask: (id: number) => Promise<void>;
  saveTask: (id: number, updatedTitle: Partial<Todo>) => Promise<void>;
  todoStatusChange: (id: number, updatedStatus: Partial<Todo>) => Promise<void>;
}


export default function TaskList({ todos, deleteTask, saveTask, todoStatusChange }: TaskListProps): JSX.Element {
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
