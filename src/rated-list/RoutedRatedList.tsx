import React from 'react'
import { useParams } from 'react-router-dom'
import useFetchEntity from '../common/use-fetch-entity'
import { getRatedList } from './api'
import RatedListView from './RatedListView'

const RoutedRatedList = () => {
  const { listID } = useParams()
  const { data, loading, error } = useFetchEntity(listID, getRatedList)

  log('RoutedRatedList RENDER', listID, data)

  return <RatedListView ratedList={data} loading={loading} error={error} />
}

export default RoutedRatedList
