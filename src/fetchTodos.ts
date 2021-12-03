import { verifyResponse } from "./guard";

export interface ITodo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

// export type HttpFetchTodosSuccess = {
//   error: false;
//   data: ITodo[];
// };

// export type HttpFetchTodosError = {
//   error: true;
//   message: string;
// };

const fetchTodos = async (): Promise<ITodo[]> => {
  try {
    const fetchResponse = await fetch(
      "https://jsonplaceholder.typicode.com/todos"
    );
    if (!fetchResponse.ok) {
      throw new Error(fetchResponse.statusText);
    }

    const response = await fetchResponse.json();
    const verifiedResponse = verifyResponse(response);
    console.log("verifiedResponse", verifiedResponse, response);
    if (verifiedResponse === false) {
      throw new Error("invalid data");
    }
    return verifiedResponse;
  } catch (error) {
    console.log("error");
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("unhandled error in fetch todos");
  }
  // return fetch("https://jsonplaceholder.typicode.com/todos").then((response) =>
  //   response.json()
  // );
};

export default fetchTodos;
