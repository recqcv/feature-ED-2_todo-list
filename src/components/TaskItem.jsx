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
