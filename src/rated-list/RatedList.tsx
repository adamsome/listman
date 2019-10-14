import React from 'react'
import { DropResult } from 'react-beautiful-dnd'
import DragDropList from '../common/DragDropList'
import ArtifactRow from './ArtifactRow'
import RatingRow from './RatingRow'
import { RatedListRow, RowMoveEvent } from './types'

type Props = typeof defaultProps & {
  items: readonly RatedListRow[]
  onMove: (event: RowMoveEvent) => void
}

const defaultProps = {}

const RatedList = (props: Props): JSX.Element => {
  const { items, onMove } = props

  const onDragEnd = (drop: DropResult) => {
    log('DnD Drop', drop)
    onMove({
      id: drop.draggableId,
      source: drop.source.index,
      target: drop.destination && drop.destination.index,
    })
  }

  return (
    <DragDropList
      items={items}
      renderer={rowTypeChooser}
      onDragEnd={onDragEnd}
    />
  )
}

const rowTypeChooser = (item: RatedListRow) => {
  switch (item.type) {
    case 'artifact':
      return <ArtifactRow {...item} />
    case 'rating':
      return <RatingRow {...item} />
  }
}

RatedList.defaultProps = defaultProps

export default RatedList
