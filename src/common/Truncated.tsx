/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import React from 'react'

export type TruncatedProps = typeof defaultProps & {
  children: React.ReactNode
}

const defaultProps = {
  lines: 1 as number,
}

export const Truncated = (props: TruncatedProps) => {
  const { lines } = props
  if (lines < 1) {
    return <div {...props} />
  }
  if (lines === 1) {
    return <TruncatedLine {...props} />
  }
  return <ClampedLines {...props} />
}

const TruncatedLine = (props: TruncatedProps) => {
  return (
    <div
      css={css`
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      `}
    >
      {props.children}
    </div>
  )
}

const ClampedLines = (props: TruncatedProps) => {
  const { lines, children } = props
  return (
    <div
      css={css`
        display: -webkit-box;
        -webkit-line-clamp: ${lines};
        -webkit-box-orient: vertical;
        overflow: hidden;
      `}
    >
      {children}
    </div>
  )
}

Truncated.defaultProps = defaultProps

export default Truncated
