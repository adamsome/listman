import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { useFetch } from '../common/hooks/use-async-task'
import { getRatedList } from './api'
import { setCurrentRatedList } from './model'
import { selectRatedList, selectRatedListRows } from './model/selectors'
import RatedListView from './RatedListView'

const RoutedRatedList = () => {
  const { listID: id } = useParams()
  const { data, loading, error } = useFetch(id, getRatedList)
  const dispatch = useDispatch()

  useEffect(() => {
    if (data) {
      dispatch(setCurrentRatedList(data))
    }
  }, [dispatch, data])

  const ratedList = useSelector(selectRatedList)
  const rows = useSelector(selectRatedListRows)

  trace('component', 'RoutedRatedList', id, ratedList, rows)

  return (
    <RatedListView
      ratedList={data}
      rows={rows}
      loading={loading}
      error={error}
    />
  )
}

export default RoutedRatedList
