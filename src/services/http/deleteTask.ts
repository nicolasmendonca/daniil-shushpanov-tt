import { FETCH_URL } from "../../constants/variables";
import { ITodo } from "../../interfaces/todo.interface";

const deleteTask = async (task: ITodo): Promise<ITodo> => {
  const fetchResponse = await fetch(`${FETCH_URL}/${task.id}`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "DELETE",
  });
  if (!fetchResponse.ok) {
    throw new Error(fetchResponse.statusText);
  }
  return task;
};

export default deleteTask;
