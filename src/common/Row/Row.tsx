/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import React, { MouseEvent } from 'react'
import FlexBox from '../Flexbox'
import { useTheme } from '../theming'

type Props = typeof defaultProps & {
  onClick?: (event: React.MouseEvent) => void
  children: React.ReactNode
}

const defaultProps = {
  first: false,
  last: false,
}

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
  const manualBorders = props.first != null && props.last != null
  const manualFirst = manualBorders && props.first
  const manualLast = manualBorders && props.last

  return (
    <FlexBox
      css={css`
        background-color: ${theme.bg.content};
        border: 1px solid ${theme.border.content};
        border-top-left-radius: ${manualFirst && theme.space.borderRadius};
        border-top-right-radius: ${manualFirst && theme.space.borderRadius};
        border-bottom-left-radius: ${manualLast && theme.space.borderRadius};
        border-bottom-right-radius: ${manualLast && theme.space.borderRadius};
        border-bottom-width: ${manualLast ? '1px' : 0};
        &:first-of-type {
          border-top-left-radius: ${!manualFirst && theme.space.borderRadius};
          border-top-right-radius: ${!manualFirst && theme.space.borderRadius};
        }
        &:last-of-type {
          border-bottom-left-radius: ${!manualLast && theme.space.borderRadius};
          border-bottom-right-radius: ${!manualLast &&
            theme.space.borderRadius};
          border-bottom-width: ${!manualLast && '1px'};
        }
        color: ${theme.body};
        cursor: ${cursor};
        font-size: ${theme.font.size.body};
        overflow: hidden;
        text-align: start;
      `}
      {..._props}
    />
  )
}

Row.defaultProps = defaultProps

export default Row
