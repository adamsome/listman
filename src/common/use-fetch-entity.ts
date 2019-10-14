import { useEffect, useReducer } from 'react'

enum ActionTypes {
  FetchInit = 'FETCH_INIT',
  FetchSuccess = 'FETCH_SUCCESS',
  FetchError = 'FETCH_ERROR',
}

export const fetchEntity = () => ({ type: ActionTypes.FetchInit } as const)

export type FetchAction<T> =
  | { type: ActionTypes.FetchInit }
  | { type: ActionTypes.FetchSuccess; payload: T }
  | { type: ActionTypes.FetchError }

interface FetchState<T> {
  data: T | null
  loading: boolean
  error: boolean
}

const makeInitState = <T>(initData?: T): FetchState<T> => ({
  data: initData || null,
  loading: false,
  error: false,
})

const makeReducer = <T>() => (
  state: FetchState<T>,
  action: FetchAction<T>
): FetchState<T> => {
  switch (action.type) {
    case ActionTypes.FetchInit:
      return {
        ...state,
        loading: true,
        error: false,
      }
    case ActionTypes.FetchSuccess:
      return {
        ...state,
        loading: false,
        error: false,
        data: action.payload,
      }
    case ActionTypes.FetchError:
      return {
        ...state,
        loading: false,
        error: true,
      }
    default:
      throw new Error()
  }
}

const useFetchEntity = <T>(
  id: string | null | undefined,
  fetchEntityFn: (abortController: AbortController, id: string) => Promise<T>,
  initData?: T
): FetchState<T> => {
  const reducer = makeReducer<T>()
  const initState = makeInitState<T>(initData)
  const [state, dispatch] = useReducer(reducer, initState)

  useEffect(() => {
    if (!id) {
      return
    }

    let cancelled = false
    const abortController = new AbortController()

    const fetchData = async () => {
      dispatch({ type: ActionTypes.FetchInit })
      try {
        const data = await fetchEntityFn(abortController, id)
        if (!cancelled) {
          dispatch({ type: ActionTypes.FetchSuccess, payload: data })
        }
      } catch (error) {
        if (!cancelled) {
          // tslint:disable-next-line: no-console
          console.error(`Could not load entity '${id}'`, error)
          dispatch({ type: ActionTypes.FetchError })
        }
      }
    }
    fetchData()

    return () => {
      cancelled = true
      abortController.abort()
    }
  }, [id, fetchEntityFn, dispatch])

  return state
}

export default useFetchEntity
