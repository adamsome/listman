/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import React from 'react'

type Props = typeof defaultProps & {
  children: React.ReactNode
  hint?: boolean
  error?: boolean
}

const defaultProps = {}

const Info = (props: Props) => {
  const { hint, error, children, ...rest } = props
  return (
    <div
      css={css`
        color: ${getColor(props)};
      `}
      {...rest}
    >
      {children}
    </div>
  )
}

const getColor = (props: Props) => {
  // TODO: Create Color type in theming
  if (props.error) {
    return 'var(--warning)'
  }
  if (props.hint) {
    return 'var(--hint)'
  }
  return 'var(--subtle)'
}

Info.defaultProps = defaultProps

export default Info
