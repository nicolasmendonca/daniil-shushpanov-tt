import { FETCH_URL } from "../../constants/variables";
import { ITodo } from "../../interfaces/todo.interface";
import { verifyUpdateTaskResponse } from "./guards/updateTask.guard";

const updateTask = async (task: ITodo): Promise<ITodo> => {
  const fetchResponse = await fetch(`${FETCH_URL}/${task.id}`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "PUT",
    body: JSON.stringify({
      userId: task.userId,
      title: task.title,
      completed: task.completed,
    }),
  });
  if (!fetchResponse.ok) {
    throw new Error(fetchResponse.statusText);
  }

  const response = await fetchResponse.json();
  const verifiedResponse = verifyUpdateTaskResponse(response);
  if (verifiedResponse === false) {
    throw new Error("invalid data");
  }
  return verifiedResponse;
};

export default updateTask;
