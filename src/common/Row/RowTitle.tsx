/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import React from 'react'

type RowTitleProps = typeof defaultProps & {
  children: React.ReactNode
}

const defaultProps = {}

const RowTitle = (props: RowTitleProps) => {
  const { children, ...rest } = props

  return (
    <h3
      css={css`
        color: black;
        font-size: 2rem;
        font-weight: 900;
        margin: 0;
      `}
      {...rest}
    >
      {children}
    </h3>
  )
}

RowTitle.defaultProps = defaultProps

export default RowTitle
