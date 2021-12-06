import { renderHook, act } from "@testing-library/react-hooks";
import { ITodo } from "../../interfaces/todo.interface";
import { useQuery } from "./index";

const fakeData: ITodo[] = [
  {
    userId: 1,
    id: 1,
    title: "delectus aut autem",
    completed: false,
  },
  {
    userId: 1,
    id: 2,
    title: "quis ut nam facilis et officia qui",
    completed: false,
  },
  {
    userId: 1,
    id: 3,
    title: "fugiat veniam minus",
    completed: false,
  },
];

const fakeFetcher = async (): Promise<ITodo[]> => {
  return await new Promise((resolve) => {
    resolve(fakeData);
  });
};

const fakeErrorFetcher = async (): Promise<ITodo[]> => {
  return await new Promise((_resolve, reject) => {
    reject("Some Error");
  });
};

test("should get data", async () => {
  const { result, waitForNextUpdate } = renderHook(() =>
    useQuery("cachekey", fakeFetcher)
  );
  await waitForNextUpdate();
  expect(result.current.data?.length).toBe(3);
});

test("should mutate data correctly", async () => {
  const { result, waitForNextUpdate } = renderHook(() =>
    useQuery("cachekey", fakeFetcher)
  );
  await waitForNextUpdate();
  act(() => {
    result.current.mutate(() => fakeData.slice(0, 1), false);
  });
  expect(result.current.data?.length).toBe(1);
});

test("should show the error correctly", async () => {
  const { result, waitForNextUpdate } = renderHook(() =>
    useQuery("cachekey", fakeErrorFetcher)
  );
  await waitForNextUpdate();
  expect(result.current.error).toBe("Some Error");
});

// There is no way to test as good as posible "should re-fetch the data"
// However, I found this solution which one is quite similar that I want to test it.
//https://stackoverflow.com/questions/50854440/spying-on-an-imported-function-that-calls-another-function-in-jest/50855968#50855968
// test("should re-fetch the data", async () => {} });
