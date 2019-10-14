/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import React from 'react'
import { Theme, useTheme } from '../theming'

type Props = typeof defaultProps & {
  children: React.ReactNode
  hint?: boolean
  error?: boolean
}

const defaultProps = {}

const Info = (props: Props) => {
  const { hint, error, children, ...rest } = props
  const theme = useTheme()
  return (
    <div
      css={css`
        color: ${getColor(props, theme)};
      `}
      {...rest}
    >
      {children}
    </div>
  )
}

const getColor = (props: Props, theme: Theme) => {
  // TODO: Create Color type in theming
  if (props.error) {
    return theme.warning
  }
  if (props.hint) {
    return theme.hint
  }
  return theme.subtle
}

Info.defaultProps = defaultProps

export default Info
