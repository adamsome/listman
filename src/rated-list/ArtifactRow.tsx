/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import FlexBox, { FlexItem } from '../common/Flexbox'
import useHover from '../common/use-hover'
import ArtifactCard from '../rated-artifact/ArtifactCard'
import Ordinal from './Ordinal'
import { RatedListArtifactRow } from './types'

type Props = RatedListArtifactRow & typeof defaultProps & {}

const defaultProps = {}

const ArtifactRow = (props: Props) => {
  const { ordinal, firstInRating, lastInRating, ratedArtifact } = props

  const [hoverRef, hover] = useHover()

  return (
    <FlexBox ref={hoverRef} justify="center" alignItems="center">
      <FlexItem flex="0 0 5rem" css={alignEnd}>
        <Ordinal lit={hover}>{ordinal}</Ordinal>
      </FlexItem>
      <FlexItem flex="auto" css={overflowHidden}>
        <ArtifactCard
          first={firstInRating}
          last={lastInRating}
          {...ratedArtifact}
        />
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
