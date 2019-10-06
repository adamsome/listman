/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import React, { MouseEvent } from 'react'

type RowProps = typeof defaultProps & {
  onClick?: (event: React.MouseEvent) => void
  children: React.ReactNode
}

const defaultProps = {}

const onKeyDown = (props: RowProps, event: React.KeyboardEvent) => {
  if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault()
    if (props.onClick) {
      props.onClick((event as any) as MouseEvent)
    }
  }
}

const Row = (props: RowProps) => {
  const _props = {
    onKeyDown: props.onClick ? onKeyDown.bind(null, props) : undefined,
    role: props.onClick ? 'button' : undefined,
    tabIndex: props.onClick ? 0 : undefined,
    ...props,
  }

  const cursor = props.onClick ? 'pointer' : 'auto'

  return (
    <div
      css={css`
        background-color: #fbfbfb;
        border: 1px solid #f0f0f0;
        cursor: ${cursor};
        display: flex;
      `}
      {..._props}
    />
  )
}

Row.defaultProps = defaultProps

export default Row
