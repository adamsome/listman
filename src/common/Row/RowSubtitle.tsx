/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import React from 'react'

type RowSubtitleProps = typeof defaultProps & {
  children: React.ReactNode
}

const defaultProps = {}

const RowSubtitle = (props: RowSubtitleProps) => {
  const { children, ...rest } = props

  return (
    <h4
      css={css`
        color: black;
        font-size: 1.5rem;
        font-weight: 700;
        margin: 0;
      `}
      {...rest}
    >
      {children}
    </h4>
  )
}

RowSubtitle.defaultProps = defaultProps

export default RowSubtitle
