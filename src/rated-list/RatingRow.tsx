import React from 'react'
import Starrate from 'react-minor-ui'
import styled from '../common/theming/styled'
import { RatedListRating } from './types'

type Props = typeof defaultProps & {
  item: RatedListRating
}

const defaultProps = {}

const RatingRow = (props: Props) => {
  const { rating } = props.item
  return (
    <Wrapper>
      <Starrate rating={rating} size="huge" disabled />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  padding-left: 5rem;
  margin-top: ${props => props.theme.space.stackHuge};
  margin-bottom: ${props => props.theme.space.stackBig};
`

RatingRow.defaultProps = defaultProps

export default RatingRow
