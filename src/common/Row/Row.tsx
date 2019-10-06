import React, { MouseEvent } from 'react'
import styled from 'styled-components/macro'

type RowProps = typeof defaultProps & {
  onClick?: (event: React.MouseEvent) => void
  children: React.ReactNode
}

type BoxProps = RowProps & {
  onKeyDown?: (event: React.KeyboardEvent) => void
  role?: string
  tabIndex?: number
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
  const _props: BoxProps = {
    onKeyDown: props.onClick ? onKeyDown.bind(null, props) : undefined,
    role: props.onClick ? 'button' : undefined,
    tabIndex: props.onClick ? 0 : undefined,
    ...props,
  }
  return <Box {..._props} />
}

const Box = styled.div<BoxProps>`
  background-color: #fbfbfb;
  border: 1px solid #f0f0f0;
  cursor: ${props => props.onClick && 'pointer'};
  display: flex;
`

Row.defaultProps = defaultProps

export default Row
