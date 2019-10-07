/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import React from 'react'
import styled from '../theming/styled'

type Props = typeof defaultProps &
  React.PropsWithoutRef<JSX.IntrinsicElements['img']> & {}

const defaultProps = {}

const RowImage = (props: Props) => {
  // TODO: Theme margins
  return (
    <ImageWrapper>
      <Image {...props} />
    </ImageWrapper>
  )
}

const ImageWrapper = styled.div`
  margin-left: ${props => props.theme.space.inset};
  margin-right: ${props => props.theme.space.inset};
  &:first-of-type {
    margin-left: 0;
  }
  &:last-of-type {
    margin-right: 0;
  }
`

const Image = (props: Props) => (
  <img
    css={css`
      display: block;
      max-width: 100%;
    `}
    alt={props.alt || ''}
    {...props}
  />
)

RowImage.defaultProps = defaultProps

export default RowImage
