/**
 * Implement a data fetching hook that allows mutations over the cache
 *
 * hook name: `useQuery`
 *  - Aguments:
 *    1. `cacheKey`: `string`. Mandatory.
 *    2. `fetcher`: `function`. Mandatory.
 *
 *  - Return value: Object
 *     - `data`
 *     - `error`
 *     - `mutate`: It's a function that receives the following arguments:
 *        - (cachedResult: T) => updatedResult as T
 *        - revalidate: boolean
 *
 *
 * Example:
 * const {data, error, mutate} = useQuery('TODOS', fetchTodos)
 *
 * mutate(todos => [...todos, newTodo], false)
 */

import { useEffect, useCallback, useState } from "react";
import { ITodo } from "./fetchTodos";

type Callback<T> = (newData: T | null) => T | null;
type Mutate<T> = (callback: Callback<T>, revalidate: boolean) => void;
interface UseQueryReturn<T> {
  data: T | null;
  error: any;
  mutate: Mutate<T>;
}

type UseQuery<T = any> = (
  cacheKey: string,
  fetcher: () => Promise<T>
) => UseQueryReturn<T>;

type CacheType = Record<string, ITodo[]>;

const CACHE: CacheType = {};
// TODO
export const useQuery: UseQuery = (cacheKey, fetcher) => {
  const [dataQuery, setDataQuery] = useState<any>([]);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const fetchData = useCallback(async () => {
    try {
      const response = await fetcher();
      setDataQuery(response);
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage("unhandled error in fetch todos");
      }
    }
  }, [fetcher]);
  useEffect(() => {
    if (CACHE[cacheKey] !== undefined) {
      setDataQuery(CACHE[cacheKey]);
    } else {
      fetchData();
    }
  }, [fetchData, cacheKey]);
  const mutate: Mutate<any> = (calback, revalidate) => {
    setDataQuery(calback);
  };

  return {
    error: errorMessage,
    data: dataQuery,
    mutate,
  };
};
