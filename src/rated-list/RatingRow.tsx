import React from 'react'
import Starrate from 'react-minor-ui'
import styled from '../theming/styled'
import { RatedListRatingRow } from './types'

type Props = RatedListRatingRow & typeof defaultProps & {}

const defaultProps = {}

const RatingRow = (props: Props) => {
  return (
    <Wrapper {...props}>
      <Starrate rating={props.rating} size="huge" disabled />
    </Wrapper>
  )
}

const Wrapper = styled.div<Props>`
  padding-left: 5rem;
  padding-top: ${props =>
    props.occursAfterArtifact && props.theme.space.stackHuge};
  padding-bottom: ${props => props.theme.space.stackBig};
`

RatingRow.defaultProps = defaultProps

export default RatingRow
