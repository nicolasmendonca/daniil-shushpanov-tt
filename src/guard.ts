import { ITodo } from "./fetchTodos";

export const verifyResponse = (data: unknown): ITodo[] | false => {
  const verifiedData: ITodo[] = data as ITodo[];
  if (!Array.isArray(data)) return false;
  data.forEach((item) => {
    const suposedItem = item as ITodo;
    if (!suposedItem.id && typeof suposedItem.id === "number") return false;
    if (!suposedItem.completed && typeof suposedItem.completed === "boolean")
      return false;
    if (!suposedItem.title && typeof suposedItem.title === "string")
      return false;
    if (!suposedItem.userId && typeof suposedItem.userId === "number")
      return false;
  });
  return verifiedData;
};
