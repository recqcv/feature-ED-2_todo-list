import { useState } from "react";
import { Todo } from '../types/types'

interface TaskItemProps {
  task: Todo;
  deleteTask: (id: number) => Promise<void>;
  saveTask: (id: number, updatedTitle: Partial<Todo>) => Promise<void>;
  todoStatusChange: (id: number, updatedStatus: Partial<Todo>) => Promise<void>;
}

export default function TaskItem({ task, deleteTask, saveTask, todoStatusChange }: TaskItemProps): JSX.Element {
  const [checked, setChecked] = useState<boolean>(task.isDone);
  const [isEdited, setIsEdited] = useState<boolean>(false);
  const [title, setTitle] = useState<string>(task.title);

  function handleSaveClick(taskId: number, updatedTitle: string) {
    saveTask(taskId, { title: updatedTitle });
    setTitle(updatedTitle);
    setIsEdited(false);
  }

  function handleDeleteTask(taskId: number) {
    deleteTask(taskId);
  }

  function handleShowTitleInput() {
    setIsEdited(true);
  }

  function handleCancelTitleChange() {
    setIsEdited(false);
    setTitle(task.title);
  }

  function handleTodoStatusChange(taskId: number, updatedStatus: boolean) {
    setChecked((prev) => !prev);
    todoStatusChange(taskId, { isDone: updatedStatus });
  }
  return (
    <>
      {!isEdited ? (
        <>
          <div className="todo_task_item">
            <label className="todo_checkbox_and_task">
              <input
                type="checkbox"
                checked={checked}
                onChange={() => handleTodoStatusChange(task.id, !checked)}
              ></input>
              <span className={checked ? "checked_task" : ""}>{task.title}</span>
            </label>
            <div>
              <button onClick={handleShowTitleInput}>🖍</button>
              <button onClick={() => handleDeleteTask(task.id)}>🗑️</button>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="todo_task_item">
            <label className="todo_checkbox_and_task">
              <input type="text" value={title} onChange={(e) => setTitle(e.target.value)}></input>
            </label>
            <div>
              <button onClick={() => handleSaveClick(task.id, title)}>SAVE</button>
              <button onClick={handleCancelTitleChange}>CANCEL</button>
            </div>
          </div>
        </>
      )}
    </>
  );
}
