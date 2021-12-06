import { FETCH_URL } from "../../constants/variables";
import { ITodo } from "../../interfaces/todo.interface";
import { verifyFetchResponse } from "./guards/fetchTodos.guard";

const fetchTodos = async (): Promise<ITodo[]> => {
  const fetchResponse = await fetch(FETCH_URL, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "GET",
  });
  if (!fetchResponse.ok) {
    throw new Error(fetchResponse.statusText);
  }

  const response = await fetchResponse.json();
  const verifiedResponse = verifyFetchResponse(response);
  if (verifiedResponse === false) {
    throw new Error("invalid data");
  }
  return verifiedResponse;

  // Example
  // return fetch("https://jsonplaceholder.typicode.com/todos").then((response) =>
  //   response.json()
  // );
};

export default fetchTodos;
