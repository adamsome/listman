import React from 'react'
import { DropResult } from 'react-beautiful-dnd'
import DragDropList from '../common/DragDropList'
import ArtifactRow from './ArtifactRow'
import RatingRow from './RatingRow'
import { RatedListItem, RowMoveEvent } from './types'

type Props = typeof defaultProps & {
  items: RatedListItem[]
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

const rowTypeChooser = (item: RatedListItem) => {
  switch (item.type) {
    case 'artifact':
      return <ArtifactRow item={item} />
    case 'rating':
      return <RatingRow item={item} />
  }
}

RatedList.defaultProps = defaultProps

export default RatedList
