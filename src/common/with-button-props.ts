import React from 'react'

type MaybeOnClick = {
  onClick?: (event: React.MouseEvent) => void
}

type ButtonProps = {
  onKeyDown?: (event: React.KeyboardEvent) => void
  role?: string
  tabIndex?: number
}

const withButtonProps = <T extends MaybeOnClick>(props: T): T & ButtonProps => {
  const onKeyDown = <_T extends MaybeOnClick>(
    _props: _T,
    event: React.KeyboardEvent
  ) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      if (_props.onClick) {
        _props.onClick((event as any) as React.MouseEvent)
      }
    }
  }

  return {
    onKeyDown: props.onClick ? onKeyDown.bind(null, props) : undefined,
    role: props.onClick ? 'button' : undefined,
    tabIndex: props.onClick ? 0 : undefined,
    ...props,
  }
}

export default withButtonProps
