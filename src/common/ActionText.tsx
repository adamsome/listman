/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import React from 'react'
import {
  calcTextHeight,
  calcTextInsetPadding,
  DEFAULT_SIZE_PROP,
  getTextBorderRadius,
} from '../theming'
import FlexBox from './Flexbox'
import withButtonProps from './with-button-props'

type Props = typeof defaultProps & {
  children: React.ReactNode
  lit?: boolean
  litBG?: string
  hoverBG?: string
  onClick?: (event: React.MouseEvent) => void
}

const defaultProps = {
  ...DEFAULT_SIZE_PROP,
}

const ActionText = (props: Props) => {
  const _props = withButtonProps(props)
  const { lit, litBG, hoverBG, children, size, ...rest } = _props
  const { onClick } = rest
  const click = (event: React.MouseEvent) => {
    if (onClick) {
      event.preventDefault()
      onClick(event)
    }
  }
  const insetPadding = calcTextInsetPadding(size)
  const height = calcTextHeight(size)
  return (
    <FlexBox
      display="inline-flex"
      justify="center"
      onClick={click}
      css={css`
        font-size: ${`var(--font-size-${size})`};
        font-weight: var(--font-weight-bold);
        /** Min width is 2x the inset padding subtracted from the height */
        min-width: calc(${height} - 2 * ${insetPadding});
        border-radius: ${getTextBorderRadius(size)};
        background: ${onClick && lit && 'var(--bg-body-dim)'};
        cursor: ${onClick ? 'pointer' : 'auto'};
        height: ${height};
        line-height: ${height};
        margin-right: var(--space-inset);
        padding-left: ${insetPadding};
        padding-right: ${insetPadding};
        outline: none;

        &:hover {
          background: ${onClick && (hoverBG || 'var(--bg-body-lit)')};
        }
        &:focus {
          box-shadow: 0 0 0 2px var(--border-focus), var(--shadow);
        }
      `}
      {...rest}
    >
      {children}
    </FlexBox>
  )
}

ActionText.defaultProps = defaultProps

export default ActionText
