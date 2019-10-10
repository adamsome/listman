import React from 'react'
import styled from '../theming/styled'

type Props = typeof defaultProps &
  React.PropsWithoutRef<JSX.IntrinsicElements['img']> & {}

const defaultProps = {}

const CardImage = (props: Props) => {
  return <Image alt={props.alt || ''} {...props} />
}

const Image = styled.img<Props>`
  display: block;
  max-width: 100%;
  margin-left: ${props => props.theme.space.inset};
  margin-right: ${props => props.theme.space.inset};
  &:first-of-type {
    margin-left: 0;
  }
  &:last-of-type {
    margin-right: 0;
  }
`

CardImage.defaultProps = defaultProps

export default CardImage
