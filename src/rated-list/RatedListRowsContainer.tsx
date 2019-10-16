import React from 'react'
import { DropResult } from 'react-beautiful-dnd'
import { useDispatch } from 'react-redux'
import { moveCurrentListRow } from './actions'
import RatedListRows from './RatedListRows'
import { RatedListRow, RowMoveEvent } from './types'

type Props = typeof defaultProps & {
  rows: RatedListRow[]
}

const defaultProps = {}

const RatedListRowsContainer = (props: Props) => {
  const { rows } = props
  const dispatch = useDispatch()

  const onMove = (event: RowMoveEvent) => {
    dispatch(moveCurrentListRow(event))
  }

  const onDragEnd = (event: DropResult) => {
    log('DnD Drop', event)
    onMove({
      id: event.draggableId,
      source: event.source.index,
      target: event.destination && event.destination.index,
      rows: rows || [],
    })
  }

  return <RatedListRows rows={rows} onDragEnd={onDragEnd} />
}

RatedListRowsContainer.defaultProps = defaultProps

export default RatedListRowsContainer
