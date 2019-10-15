import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { useFetch } from '../common/hooks/use-async-task'
import { getRatedList } from './api'
import { loadRatedList, selectRatedList } from './model'
import { selectSelectedRatedList } from './model/selectors'
import RatedListView from './RatedListView'

const RoutedRatedList = () => {
  const { listID: id } = useParams()
  const { data, loading, error } = useFetch(id, getRatedList)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(selectRatedList({ id }))
  }, [dispatch, id])

  useEffect(() => {
    if (data) {
      dispatch(loadRatedList(data))
    }
  }, [dispatch, data])

  const ratedList = useSelector(selectSelectedRatedList)

  log('RoutedRatedList RENDER', id, ratedList)

  return <RatedListView ratedList={data} loading={loading} error={error} />
}

export default RoutedRatedList
