import React from 'react'
import { useParams } from 'react-router-dom'
import { useFetch } from '../common/hooks/use-async-task'
import { getRatedList } from './api'
import RatedListView from './RatedListView'

const RoutedRatedList = () => {
  const { listID } = useParams()
  const { data, loading, error } = useFetch(listID, getRatedList)

  log('RoutedRatedList RENDER', listID, data)

  return <RatedListView ratedList={data} loading={loading} error={error} />
}

export default RoutedRatedList
