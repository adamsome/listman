/**
 * Referenced:
 * @url https://github.com/dai-shi/react-hooks-async
 * @version 3.4.1
 * @license MIT
 * @date 2019-10-15
 */

/*
The MIT License (MIT)
Copyright (c) 2018-2019 Daishi Kato

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/

import { Dispatch, useCallback, useEffect, useReducer, useRef } from 'react'
import { useMemoOne as useMemo } from 'use-memo-one'

export type AsyncTask<T, TArgs extends unknown[] = unknown[]> = {
  id?: number | null
  abortController?: AbortController | null
  start: (...args: TArgs) => void
  abort: () => void
  started: boolean
  loading: boolean
  error: Error | null
  data: T | null
}

type AsyncTaskFn<T, TArgs extends unknown[] = unknown[]> = (
  c: AbortController,
  ...args: TArgs
) => Promise<T>

export type UseAsyncTask = <T, TArgs extends unknown[] = unknown[]>(
  func: AsyncTaskFn<T, TArgs>
) => AsyncTask<T>

let idCount = 0
const nextId = () => {
  idCount += 1
  return idCount
}

const createTask = <T, TArgs extends unknown[] = unknown[]>(
  func: AsyncTaskFn<T, TArgs>,
  forceUpdate: Dispatch<void>
): AsyncTask<T, TArgs> => {
  const task: AsyncTask<T, TArgs> = {
    abortController: null,
    start: async (...args: TArgs) => {
      if (task.id === null) {
        // already cleaned up
        return
      }
      task.abort()
      task.abortController = new AbortController()
      const taskId = nextId()
      task.id = taskId
      task.started = true
      task.loading = true
      task.error = null
      task.data = null
      forceUpdate()
      let result = null
      let err = null
      try {
        result = await func(task.abortController, ...args)
      } catch (e) {
        err = e
      }
      if (task.id === taskId) {
        task.data = result
        task.error = err
        task.started = false
        task.loading = false
        forceUpdate()
      }
    },
    abort: () => {
      if (task.abortController) {
        task.abortController.abort()
        task.abortController = null
      }
    },
    id: 0,
    started: false,
    loading: true,
    error: null,
    data: null,
  }
  return task
}

export const useAsyncTask = <T, TArgs extends unknown[] = unknown[]>(
  func: AsyncTaskFn<T, TArgs>
): AsyncTask<T, TArgs> => {
  const [, forceUpdate] = useReducer(c => c + 1, 0)
  const task = useMemo(() => createTask<T, TArgs>(func, forceUpdate), [func])
  useEffect(() => {
    const cleanup = () => {
      task.id = null
      task.abort()
    }
    return cleanup
  }, [task])
  return useMemo(() => {
    const _task: AsyncTask<T, TArgs> = {
      start: task.start,
      abort: task.abort,
      started: task.started,
      loading: task.loading,
      error: task.error,
      data: task.data,
    }
    return _task
  }, [
    task.start,
    task.abort,
    task.started,
    task.loading,
    task.error,
    task.data,
  ])
}

const useMemoList = <Ts extends T[], T extends unknown = unknown>(
  list: Ts,
  compareFn = (a: T, b: T): boolean => a === b
): Ts => {
  const listRef = useRef(list)
  const listChanged =
    list.length !== listRef.current.length ||
    list.some((arg, index) => !compareFn(arg, listRef.current[index]))
  useEffect(() => {
    if (listChanged) {
      listRef.current = list
    }
  })
  return listChanged ? list : listRef.current
}

export const useAsyncRun = <T, TArgs extends unknown[] = unknown[]>(
  task: AsyncTask<T, TArgs>,
  ...args: TArgs
) => {
  const start = task && task.start
  const abort = task && task.abort
  const memoArgs = useMemoList<TArgs>(args)
  useEffect(() => {
    if (start) {
      start(...memoArgs)
    }
  }, [start, memoArgs])
  useEffect(() => {
    const cleanup = () => {
      if (abort) {
        abort()
      }
    }
    return cleanup
  }, [abort])
}

export const useAsyncTaskFetch = <T = any>(
  id: string | undefined | null,
  fetchFn: (c: AbortController, id: string) => Promise<T>
) =>
  useAsyncTask(
    useCallback(
      async (c: AbortController, idOverride: string) => {
        if (id) {
          return fetchFn(c, idOverride || id)
        }
      },
      [id, fetchFn]
    )
  )

export const useFetch = <T = any>(
  id: string | undefined | null,
  fetchFn: (c: AbortController, id: string) => Promise<T>
) => {
  const task = useAsyncTaskFetch<T>(id, fetchFn)
  useAsyncRun<T, []>(task as any)
  return task
}
