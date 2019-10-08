import React from 'react'
import Info from '../common/Info'
import ArtifactRow from './ArtifactRow'
import RatingRow from './RatingRow'
import { RatedListItem } from './types'

type Props = typeof defaultProps & {
  items: RatedListItem[]
}

const defaultProps = {}

const RatedList = (props: Props): JSX.Element => {
  const { items } = props
  return <div>{items.length ? items.map(rowTypeChooser) : none}</div>
}

const rowTypeChooser = (item: RatedListItem) => {
  switch (item.type) {
    case 'artifact':
      return <ArtifactRow key={item.id} item={item} />
    case 'rating':
      const key = item.rating != null ? item.rating : -1
      return <RatingRow key={key} item={item} />
  }
}

const none = <Info>No artifacts</Info>

RatedList.defaultProps = defaultProps

export default RatedList
