import { ITodo } from "../../../interfaces/todo.interface";

export const verifySetNewTaskResponse = (data: unknown): ITodo | false => {
  const suposedItem: ITodo = data as ITodo;

  if (!suposedItem.id && typeof suposedItem.id !== "number") return false;
  if (!suposedItem.completed && typeof suposedItem.completed !== "boolean")
    return false;
  if (!suposedItem.title && typeof suposedItem.title !== "string") return false;
  if (!suposedItem.userId && typeof suposedItem.userId !== "number")
    return false;

  return suposedItem;
};
