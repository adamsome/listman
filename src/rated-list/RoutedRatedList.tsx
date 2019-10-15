import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { useFetch } from '../common/hooks/use-async-task'
import { getRatedList } from './api'
import { load } from './model'
import { selectSelectedRatedList } from './model/selectors'
import RatedListView from './RatedListView'

const RoutedRatedList = () => {
  const { listID } = useParams()
  const { data, loading, error } = useFetch(listID, getRatedList)
  const dispatch = useDispatch()

  useEffect(() => {
    if (data) {
      dispatch(load(data))
    }
  }, [dispatch, data])

  const ratedList = useSelector(selectSelectedRatedList)

  log('RoutedRatedList RENDER', listID, ratedList)

  return <RatedListView ratedList={data} loading={loading} error={error} />
}

export default RoutedRatedList
