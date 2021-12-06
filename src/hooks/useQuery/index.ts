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

import { useEffect, useCallback, useState, useMemo } from "react";
import { UseQueryCache } from "../../services/cache/useQueryCache";

// declare global {
//   interface Window {
//     userQueryCache<T>(): UseQueryCache<T>;
//   }
// }

type Callback<T> = (newData: T | null) => T | null;
type Mutate<T> = (callback: Callback<T>, revalidate: boolean) => void;
interface UseQueryReturn<T> {
  data: T | null;
  error: string;
  mutate: Mutate<T>;
}

// Example of type
// type UseQuery<T = any> = (
//   cacheKey: string,
//   fetcher: () => Promise<T>
// ) => UseQueryReturn<T>;

// type CacheType = Record<string, ITodo[]>;

// TODO
export function useQuery<T>(
  cacheKey: string,
  fetcher: () => Promise<T>
): UseQueryReturn<T> {
  const [dataQuery, setDataQuery] = useState<T | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const CACHE = useMemo(() => {
    return new UseQueryCache<T>();
  }, []);

  // if (window.userQueryCache === undefined) {
  //   // I know that is not an optimal solution, However it's wokring. Better solution would be write a cache Id(object of caches for each hook) and delete when the hook is unmounted
  // }

  const fetchData = useCallback(async () => {
    try {
      const response = await fetcher();
      setDataQuery(response);
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
      } else if (typeof error === "string") {
        setErrorMessage(error);
      } else {
        setErrorMessage("unhandled error in fetch todos");
      }
    }
  }, [fetcher]);
  useEffect(() => {
    if (CACHE.getFromCache(cacheKey) !== null) {
      setDataQuery(CACHE.getFromCache(cacheKey));
    } else {
      fetchData();
    }
  }, [fetchData, cacheKey, CACHE]);
  const mutate: Mutate<T> = (calback, revalidate) => {
    setDataQuery(calback);
    if (revalidate) {
      console.log("revalidating");
      fetchData();
    }
  };

  return {
    error: errorMessage,
    data: dataQuery,
    mutate,
  };
}
