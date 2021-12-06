import React, { useEffect, useState } from "react";
import { TodoComponent } from "../../components/Todo";
import { ITodo } from "../../interfaces/todo.interface";
import fetchTodos from "../../services/http/fetchTodos";
import { useQuery } from "../../hooks/useQuery";
import "./styles.css";
import setNewTask from "../../services/http/setNewTask";
import updateTask from "../../services/http/updateTask";
import deleteTask from "../../services/http/deleteTask";
import { NewTodoComponent } from "../../components/NewTodo";
import { SwitchRefetch } from "../../components/SwitchRefetch";

export const TodoListContainer: React.FC = () => {
  const { data, error, mutate } = useQuery<ITodo[]>("cacheKey", fetchTodos);
  const [isRefetchOn, setisRefetchOn] = useState(false);

  const toggleCompleteHandler = async (id: number) => {
    if (data) {
      const completedTaskIndex = data.findIndex((item) => id === item.id);
      if (completedTaskIndex !== -1) {
        // clone object
        const newData = JSON.parse(JSON.stringify(data)) as ITodo[];
        newData[completedTaskIndex].completed =
          !newData[completedTaskIndex].completed;
        await updateTask(newData[completedTaskIndex]);
        mutate(() => newData, isRefetchOn);
      }
    }
  };
  const toggleChangeHandler = async (task: ITodo) => {
    if (data) {
      const completedTaskIndex = data.findIndex((item) => task.id === item.id);
      if (completedTaskIndex !== -1) {
        // clone object
        const newData = JSON.parse(JSON.stringify(data)) as ITodo[];
        newData[completedTaskIndex] = task;
        await updateTask(newData[completedTaskIndex]);
        mutate(() => newData, isRefetchOn);
      }
    }
  };
  const toggleDeleteHanlder = async (id: number) => {
    if (data) {
      const completedTaskIndex = data.findIndex((item) => id === item.id);
      if (completedTaskIndex !== -1) {
        // clone object
        const newData = JSON.parse(JSON.stringify(data)) as ITodo[];
        await deleteTask(newData[completedTaskIndex]);
        newData.splice(completedTaskIndex, 1);
        mutate(() => newData, isRefetchOn);
      }
    }
  };

  const onCreateNewTaskHandler = async (task: ITodo) => {
    await setNewTask(task);
    const newData = JSON.parse(JSON.stringify(data)) as ITodo[];
    newData.push(task);
    mutate(() => newData, isRefetchOn);
  };

  return (
    <div className="TodoList">
      <h1>
        Todo List <span>Test Task with custom SWR hook</span>
      </h1>

      {error && <span>Error: {error}</span>}
      <SwitchRefetch
        isToggled={isRefetchOn}
        onToggle={() => {
          setisRefetchOn(!isRefetchOn);
        }}
      />
      <NewTodoComponent onCreate={onCreateNewTaskHandler} />
      {data &&
        data.map((todo) => (
          <TodoComponent
            key={todo.id}
            todo={todo as ITodo}
            toggleComplete={toggleCompleteHandler}
            toggleChange={toggleChangeHandler}
            toggleDelete={toggleDeleteHanlder}
          />
        ))}
    </div>
  );
};
