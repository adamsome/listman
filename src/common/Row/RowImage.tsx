/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import React from 'react'

type RowImageProps = typeof defaultProps &
  React.PropsWithoutRef<JSX.IntrinsicElements['img']> & {}

const defaultProps = {}

const RowImage = (props: RowImageProps) => {
  // TODO: Theme margins
  return (
    <img
      css={css`
        display: block;
        max-width: 100%;
        margin-left: 1rem;
        margin-right: 1rem;
        &:first-child {
          margin-left: 0;
        }
        &:last-child {
          margin-right: 0;
        }
      `}
      {...props}
    />
  )
}

RowImage.defaultProps = defaultProps

export default RowImage
