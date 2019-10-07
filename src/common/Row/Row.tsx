/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import React, { MouseEvent } from 'react'
import { useTheme } from '../theming'

type Props = typeof defaultProps & {
  onClick?: (event: React.MouseEvent) => void
  children: React.ReactNode
}

const defaultProps = {}

const onKeyDown = (props: Props, event: React.KeyboardEvent) => {
  if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault()
    if (props.onClick) {
      props.onClick((event as any) as MouseEvent)
    }
  }
}

const Row = (props: Props) => {
  const _props = {
    onKeyDown: props.onClick ? onKeyDown.bind(null, props) : undefined,
    role: props.onClick ? 'button' : undefined,
    tabIndex: props.onClick ? 0 : undefined,
    ...props,
  }

  const theme = useTheme()
  const cursor = props.onClick ? 'pointer' : 'auto'

  return (
    <div
      css={css`
        background-color: ${theme.bg.content};
        border: 1px solid ${theme.border.content};
        cursor: ${cursor};
        display: flex;
      `}
      {..._props}
    />
  )
}

Row.defaultProps = defaultProps

export default Row
