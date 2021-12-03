import "./styles.css";
import { useQuery } from "./useQuery";
import fetchTodos, { ITodo } from "./fetchTodos";

export default function App() {
  const {  data } = useQuery("asadass", fetchTodos);
  //   // TODO
  // const useQuery: UseQuery<ITodo> = ("TODO") => {
  //   return {

  //   }
  // }

  return (
    <div className="App">
      <h1>Test Task</h1>
      {console.log(data)}
    </div>
  );
}
