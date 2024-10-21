import { useState } from "react";

export default function TaskItem({ task, handleDeleteTask, handleSaveClick }) {
  const [checked, setChecked] = useState(task.isDone);
  const [isEdited, setIsEdited] = useState(false);
  const [input, setInput] = useState(task.title);

  function onSaveClick() {
    handleSaveClick(task.id, { ...task, title: input, isDone: task.isDone });
    setIsEdited(false);
  }

  function onCheckboxClick() {
    handleSaveClick(task.id, { ...task, isDone: !task.isDone });
    setChecked((prev) => !prev);
  }

  return (
    <>
      {!isEdited ? (
        <>
          <div className="todo_task_item">
            <label className="todo_checkbox_and_task">
              <input type="checkbox" checked={checked} onChange={onCheckboxClick}></input>
              <span className={checked ? "checked_task" : ""}>{task.title}</span>
            </label>
            <div>
              <button onClick={() => setIsEdited((prev) => !prev)}>🖍</button>
              <button onClick={() => handleDeleteTask(task.id)}>🗑️</button>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="todo_task_item">
            <label className="todo_checkbox_and_task">
              <input type="text" value={input} onChange={(e) => setInput(e.target.value)}></input>
            </label>
            <div>
              <button onClick={onSaveClick}>SAVE</button>
              <button onClick={() => setIsEdited((prev) => !prev)}>CANCEL</button>
            </div>
          </div>
        </>
      )}
    </>
  );
}
