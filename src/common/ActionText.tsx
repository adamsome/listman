/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import React from 'react'
import {
  calcTextHeight,
  calcTextInsetPadding,
  DEFAULT_SIZE_PROP,
  getTextBorderRadius,
  useTheme,
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
  const theme = useTheme()
  const fontSize = theme.font.size[size]
  const insetPadding = calcTextInsetPadding(fontSize)
  const height = calcTextHeight(fontSize)
  return (
    <FlexBox
      display="inline-flex"
      justify="center"
      onClick={click}
      css={css`
        font-size: ${fontSize};
        font-weight: ${theme.font.weightBold};
        /** Min width is 2x the inset padding subtracted from the height */
        min-width: calc(${height} - 2 * ${insetPadding});
        border-radius: ${getTextBorderRadius(size)};
        background: ${onClick && lit && theme.bg.bodyDim};
        cursor: ${onClick ? 'pointer' : 'auto'};
        height: ${height};
        line-height: ${height};
        margin-right: ${theme.space.inset};
        padding-left: ${insetPadding};
        padding-right: ${insetPadding};
        outline: none;

        &:hover {
          background: ${onClick && (hoverBG || theme.bg.bodyLit)};
        }
        &:focus {
          box-shadow: 0 0 0 2px ${theme.border.focus}, ${theme.shadow};
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
