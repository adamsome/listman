import styled from '@emotion/styled'
import React from 'react'

type Props = typeof defaultProps &
  React.PropsWithoutRef<JSX.IntrinsicElements['img']> & {}

const defaultProps = {}

const CardImage = (props: Props) => {
  return <Image alt={props.alt || ''} {...props} />
}

const Image = styled.img<Props>`
  display: block;
  max-width: 100%;
  margin-left: var(--space-inset);
  margin-right: var(--space-inset);
  &:first-of-type {
    margin-left: 0;
  }
  &:last-of-type {
    margin-right: 0;
  }
`

CardImage.defaultProps = defaultProps

export default CardImage
