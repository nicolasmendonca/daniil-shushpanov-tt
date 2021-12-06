import { FETCH_URL } from "../../constants/variables";
import { ITodo } from "../../interfaces/todo.interface";
import { verifySetNewTaskResponse } from "./guards/setNewTask.guard";

const setNewTask = async (task: ITodo): Promise<ITodo> => {
  const fetchResponse = await fetch(FETCH_URL, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(task),
  });
  if (!fetchResponse.ok) {
    throw new Error(fetchResponse.statusText);
  }

  const response = await fetchResponse.json();
  const verifiedResponse = verifySetNewTaskResponse(response);
  if (verifiedResponse === false) {
    throw new Error("invalid data");
  }
  return verifiedResponse;
};

export default setNewTask;
