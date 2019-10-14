import React from 'react'
import Info from '../common/Info'
import RatedListContainer from './RatedListContainer'
import { RatedListResponse } from './types'

type Props = typeof defaultProps & {}

const defaultProps = {
  ratedList: null as RatedListResponse | null,
  loading: false,
  error: false,
}

const RatedListView = ({ ratedList, loading, error }: Props) => {
  if (loading) {
    // TODO: Show loading gray box placeholders
    return <Info hint>Loading...</Info>
  }
  return (
    <>
      {error && <Info error>Failed to load the list.</Info>}
      {ratedList && <RatedListContainer artifacts={ratedList.artifacts} />}
    </>
  )
}

RatedListView.defaultProps = defaultProps

export default RatedListView
