/** @jsx jsx */
import { jsx } from '@emotion/core'
import Starrate from 'react-minor-ui'
import Card, { CardContent, CardImage, CardTitle } from '../common/Card'
import Info from '../common/Info'
import Truncated from '../common/Truncated'
import { RatedArtifact } from './types'

type Props = RatedArtifact &
  typeof defaultProps & {
    first?: boolean
    last?: boolean
  }

const defaultProps = {
  layout: 'row' as 'row', // TODO: add other layous (e.g. full-height, one-line)
}

const ArtifactCard = (props: Props) => {
  const { title, artworkID, rating, artifact, first, last } = props

  return (
    <Card first={first} last={last}>
      <CardImage
        src={artworkID || artifact.artworkID}
        height={getHeight(props)}
        alt="Sample Art"
      />
      <CardContent>
        <CardTitle
          subtitle={getSubtitle(props)}
          actions={<Starrate rating={rating} />}
        >
          {title || artifact.title}
        </CardTitle>
        {getText(props)}
      </CardContent>
    </Card>
  )
}

const getSubtitle = (props: Props) => {
  switch (props.artifact.type) {
    // TODO: Handle other artifact types
    case 'album':
    default:
      return props.creator || props.artifact.creator
  }
}

const getHeight = (props: Props) => {
  switch (props.layout) {
    case 'row':
    default:
      return '100px'
  }
}

const getText = (props: Props) => {
  return props.text ? (
    <Truncated lines={2}>{props.text}</Truncated>
  ) : (
    <Info hint>No description.</Info>
  )
}

ArtifactCard.defaultProps = defaultProps

export default ArtifactCard
