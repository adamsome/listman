import React from 'react'
import Info from '../common/Info'
import RatedListRowsContainer from './RatedListRowsContainer'
import { RatedListResponse, RatedListRow } from './types'

type Props = typeof defaultProps & {}

const defaultProps = {
  ratedList: null as RatedListResponse | null,
  rows: null as readonly RatedListRow[] | null,
  loading: false,
  error: null as Error | null,
}

const RatedListView = ({ rows, loading, error }: Props) => {
  if (loading) {
    // TODO: Show loading gray box placeholders
    return <Info hint>Loading...</Info>
  }
  return (
    <>
      {error && <Info error>Failed to load the list.</Info>}
      {rows && <RatedListRowsContainer rows={rows} />}
    </>
  )
}

RatedListView.defaultProps = defaultProps

export default RatedListView
