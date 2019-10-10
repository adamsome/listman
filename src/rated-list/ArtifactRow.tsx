/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import Starrate from 'react-minor-ui'
import Card, { CardContent, CardImage, CardTitle } from '../common/Card'
import FlexBox, { FlexItem } from '../common/Flexbox'
import Info from '../common/Info'
import Truncated from '../common/Truncated'
import useHover from '../common/use-hover'
import Ordinal from './Ordinal'
import { RatedListArtifact } from './types'

type Props = typeof defaultProps & {
  item: RatedListArtifact
}

const defaultProps = {
  height: '100px',
}

const ArtifactRow = (props: Props) => {
  const {
    ordinal,
    title,
    subtitle,
    description,
    image,
    rating,
    firstInRating,
    lastInRating,
  } = props.item

  const [hoverRef, hover] = useHover()

  const descriptionEl = description ? (
    <Truncated lines={2}>{description}</Truncated>
  ) : (
    <Info hint>No description.</Info>
  )

  return (
    <FlexBox ref={hoverRef} justify="center" alignItems="center">
      <FlexItem flex="0 0 5rem" css={alignEnd}>
        <Ordinal lit={hover}>{ordinal}</Ordinal>
      </FlexItem>
      <FlexItem flex="auto" css={overflowHidden}>
        <Card first={firstInRating === true} last={lastInRating === true}>
          <CardImage src={image} height={props.height} alt="Sample Art" />
          <CardContent>
            <CardTitle
              subtitle={subtitle}
              actions={<Starrate rating={rating} />}
            >
              {title}
            </CardTitle>
            {descriptionEl}
          </CardContent>
        </Card>
      </FlexItem>
    </FlexBox>
  )
}

const alignEnd = css`
  text-align: end;
`

const overflowHidden = css`
  overflow: hidden;
`

ArtifactRow.defaultProps = defaultProps

export default ArtifactRow
