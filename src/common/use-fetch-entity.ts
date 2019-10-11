import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { ActionCreator } from 'redux'
import { AppError, HasID } from '../types'

export const useFetch = <T extends {}>(
  id: string | undefined | null,
  fetcher: (id: string) => Promise<T>,
  fetchAction: ActionCreator<{ payload: HasID }>,
  successAction: ActionCreator<{ payload: HasID & T }>,
  errorAction: ActionCreator<{ payload: HasID & AppError }>
) => {
  const dispatch = useDispatch()
  useEffect(() => {
    const fetchData = async () => {
      if (id == null) {
        return
      }

      dispatch(fetchAction({ id }))

      try {
        const data = await fetcher(id)

        dispatch(successAction({ id, ...data }))
      } catch (err) {
        dispatch(errorAction({ id, message: String(err) }))
      }
    }

    fetchData()
  }, [id, fetcher, fetchAction, successAction, errorAction, dispatch])
}

export default useFetch
