import React from 'react'
import RatedListRows from './RatedListRows'
import { RatedListRow, RowMoveEvent } from './types'

type Props = typeof defaultProps & {
  rows: readonly RatedListRow[]
}

const defaultProps = {}

const RatedListRowsContainer = (props: Props) => {
  const { rows } = props

  const onMove = (event: RowMoveEvent) => {
    // tslint:disable-next-line: no-console
    console.log('row move', event)
  }
  return <RatedListRows rows={rows} onMove={onMove} />
}

RatedListRowsContainer.defaultProps = defaultProps

export default RatedListRowsContainer
