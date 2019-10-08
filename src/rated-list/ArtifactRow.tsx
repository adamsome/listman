import React from 'react'
import Starrate from 'react-minor-ui'
import Info from '../common/Info'
import Row, { RowContent, RowImage, RowTitle } from '../common/Row'
import Truncated from '../common/Truncated'
import { RatedListArtifact } from './types'

type Props = typeof defaultProps & {
  item: RatedListArtifact
}

const defaultProps = {
  height: '100px',
}

const ArtifactRow = (props: Props) => {
  const {
    title,
    subtitle,
    description,
    image,
    rating,
    firstInRating,
    lastInRating,
  } = props.item

  const descriptionEl = description ? (
    <Truncated lines={2}>{description}</Truncated>
  ) : (
    <Info hint>No description.</Info>
  )

  return (
    <Row first={firstInRating === true} last={lastInRating === true}>
      <RowImage src={image} height={props.height} alt="Sample Art" />
      <RowContent>
        <RowTitle subtitle={subtitle} actions={<Starrate rating={rating} />}>
          {title}
        </RowTitle>
        {descriptionEl}
      </RowContent>
    </Row>
  )
}

ArtifactRow.defaultProps = defaultProps

export default ArtifactRow
