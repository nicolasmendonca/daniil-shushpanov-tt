import React, { useState } from "react";
import { ITodo } from "../../interfaces/todo.interface";

type NewTodoComponentProps = {
  onCreate: (task: ITodo) => void;
};

export const NewTodoComponent: React.FC<NewTodoComponentProps> = ({
  onCreate,
}) => {
  const [newTask, setNewTask] = useState<{ userId: number; title: string }>({
    title: "",
    userId: 1,
  });

  const createNewTaskHanlder = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onCreate({
      id: 0,
      completed: false,
      title: newTask.title,
      userId: newTask.userId,
    });
  };
  const onChangeTilteHanlder = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewTask((prev) => ({
      ...prev,
      title: event.target.value,
    }));
  };
  const onChangeUserIdHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setNewTask((prev) => ({
      ...prev,
      userId: parseInt(event.target.value),
    }));
  };

  return (
    <div className="Todo">
      <form className="Todo-edit-form" onSubmit={createNewTaskHanlder}>
        <i className="fa fa-user" />
        <input
          type="number"
          value={newTask.userId}
          onChange={onChangeTilteHanlder}
        />
        <input
          onChange={onChangeUserIdHandler}
          value={newTask.title}
          type="text"
        />
        <button>Create new task</button>
      </form>
    </div>
  );
};
