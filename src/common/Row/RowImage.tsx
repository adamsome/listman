/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import React from 'react'

type Props = typeof defaultProps &
  React.PropsWithoutRef<JSX.IntrinsicElements['img']> & {}

const defaultProps = {}

const RowImage = (props: Props) => {
  // TODO: Theme margins
  return (
    <div
      css={css`
        margin-left: 1rem;
        margin-right: 1rem;
        &:first-of-type {
          margin-left: 0;
        }
        &:last-of-type {
          margin-right: 0;
        }
      `}
    >
      <img
        css={css`
          display: block;
          max-width: 100%;
        `}
        alt={props.alt || ''}
        {...props}
      />
    </div>
  )
}

RowImage.defaultProps = defaultProps

export default RowImage
