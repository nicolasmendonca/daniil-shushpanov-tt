import React, { useState } from "react";
import { ITodo } from "../../interfaces/todo.interface";
import "./styles.css";

type TodoComponentProps = {
  todo: ITodo;
  toggleComplete: (id: number) => void;
  toggleDelete: (id: number) => void;
  toggleChange: (task: ITodo) => void;
};

export const TodoComponent: React.FC<TodoComponentProps> = ({
  todo,
  toggleChange,
  toggleComplete,
  toggleDelete,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(todo.title);
  const [userID, setUserID] = useState(todo.userId);

  const handleClick = () => {
    toggleDelete(todo.id);
  };
  const toggleFrom = () => {
    setIsEditing(!isEditing);
  };
  const onCompletedHandler = () => {
    toggleComplete(todo.id);
  };

  const updateTaskHanlder = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    toggleFrom();
    toggleChange({
      completed: todo.completed,
      id: todo.id,
      title,
      userId: userID,
    });
  };
  const changeTitleHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };
  const changeUserIdHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserID(parseInt(event.target.value));
  };

  if (isEditing) {
    return (
      <div className="Todo">
        <form className="Todo-edit-form" onSubmit={updateTaskHanlder}>
          <i className="fa fa-user" />
          <input
            className="Todo-userId-input"
            type="number"
            value={userID}
            onChange={changeUserIdHandler}
          />
          <input
            className="Todo-title-input"
            onChange={changeTitleHandler}
            value={title}
            type="text"
          />
          <button>Save</button>
        </form>
      </div>
    );
  }
  return (
    <div className="Todo">
      <li
        onClick={onCompletedHandler}
        className={todo.completed ? "Todo-task completed" : "Todo-task"}
      >
        <div className="Todo-user">
          <i className="fa fa-user" />
          {todo.userId}
        </div>
        <div className="Todo-title"> {todo.title}</div>
      </li>
      <div className="Todo-buttons">
        <button onClick={toggleFrom}>
          <i className="fas fa-pen" />
        </button>
        <button onClick={handleClick}>
          <i className="fas fa-trash" />
        </button>
      </div>
    </div>
  );
};
