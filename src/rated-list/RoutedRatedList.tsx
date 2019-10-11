import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import useFetch from '../common/use-fetch-entity'
import { getRatedList } from './api'
import { Fetch, FetchError, FetchSuccess, Select } from './model'
import { selectSelectedRatedListState } from './model/selectors'
import RatedList from './RatedList'
import { RowMoveEvent } from './types'

const RoutedRatedList = () => {
  const { listID } = useParams()

  const dispatch = useDispatch()
  useEffect(() => {
    if (listID) {
      dispatch(Select({ id: listID }))
    }
  }, [listID, dispatch])

  useFetch(listID, getRatedList, Fetch, FetchSuccess, FetchError)

  const entity = useSelector(selectSelectedRatedListState)

  log('RoutedRatedList RENDER', listID, entity)

  const onMove = (event: RowMoveEvent) => {
    log('onMove', event, entity)
  }

  return <RatedList items={[]} onMove={onMove} />
}

export default RoutedRatedList
