import React from 'react'
import {
  DragDropContext,
  Draggable,
  DraggableProvided,
  DraggableStateSnapshot,
  DraggingStyle,
  Droppable,
  DropResult,
  NotDraggingStyle,
} from 'react-beautiful-dnd'
import Info from '../common/Info'

interface HasID {
  id: string
}

type Props<T extends HasID> = typeof defaultProps & {
  items: readonly T[]
  renderer: (
    item: T,
    provided: DraggableProvided,
    snapshot: DraggableStateSnapshot
  ) => JSX.Element
  onDragEnd: (drop: DropResult) => void
}

const defaultProps = {}

const DragDropList = <T extends HasID>(props: Props<T>): JSX.Element => {
  const { items, renderer, onDragEnd } = props

  const draggable = (item: T, i: number) => (
    <Draggable key={item.id} draggableId={item.id} index={i}>
      {(provided, snapshot) => (
        <div>
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            style={getDraggableStyle(provided.draggableProps.style)}
          >
            {renderer(item, provided, snapshot)}
          </div>
          {provided.placeholder}
        </div>
      )}
    </Draggable>
  )

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="rated-list-drop">
        {(provided, _) => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            {items.length ? items.map(draggable) : none}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  )
}

const getDraggableStyle = (
  draggableStyle: DraggingStyle | NotDraggingStyle | undefined
): {} => ({ userSelect: 'none', ...draggableStyle })

const none = <Info>No items</Info>

DragDropList.defaultProps = defaultProps

export default DragDropList
