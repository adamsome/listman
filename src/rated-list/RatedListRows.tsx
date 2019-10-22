import React from 'react'
import { DropResult } from 'react-beautiful-dnd'
import DragDropList from '../common/DragDropList'
import ArtifactRow from './ArtifactRow'
import RatingRow from './RatingRow'
import { RatedListRow } from './types'

type Props = typeof defaultProps & {
  rows: readonly RatedListRow[]
  onDragEnd: (event: DropResult) => void
}

const defaultProps = {}

const RatedListRows = (props: Props): JSX.Element => {
  const { rows, onDragEnd } = props
  return (
    <DragDropList
      items={rows}
      renderer={rowTypeChooser}
      onDragEnd={onDragEnd}
      disableIndices={[0]}
    />
  )
}

const rowTypeChooser = (row: RatedListRow) => {
  switch (row.type) {
    case 'artifact':
      return <ArtifactRow {...row} />
    case 'rating':
      return <RatingRow {...row} />
  }
}

RatedListRows.defaultProps = defaultProps

export default RatedListRows
