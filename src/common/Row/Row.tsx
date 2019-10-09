/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import React from 'react'
import FlexBox from '../Flexbox'
import { useTheme } from '../theming'
import withButtonProps from '../with-button-props'

type Props = typeof defaultProps & {
  onClick?: (event: React.MouseEvent) => void
  children: React.ReactNode
  /**
   * Set to whether the row is first in a collection to manually control
   * borders. `last` must be set as well. If undefined, component will use
   * css selectors (e.g. `first-of-type`) to control borders.
   */
  first?: boolean
  /**
   * Set to whether the row is last in a collection to manually control
   * borders. `first` must be set as well. If undefined, component will use
   * css selectors (e.g. `first-of-type`) to control borders.
   */
  last?: boolean
}

const defaultProps = {}

const Row = (props: Props) => {
  const { first, last, ...rest } = withButtonProps(props)
  const { onClick } = rest
  const theme = useTheme()

  const manualBorders = first != null && last != null
  const manualFirst = manualBorders && first
  const manualLast = manualBorders && last

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
          border-top-left-radius: ${!manualBorders && theme.space.borderRadius};
          border-top-right-radius: ${!manualBorders &&
            theme.space.borderRadius};
        }
        &:last-of-type {
          border-bottom-left-radius: ${!manualBorders &&
            theme.space.borderRadius};
          border-bottom-right-radius: ${!manualBorders &&
            theme.space.borderRadius};
          border-bottom-width: ${!manualBorders && '1px'};
        }
        color: ${theme.body};
        cursor: ${onClick ? 'pointer' : 'auto'};
        font-size: ${theme.font.size.body};
        outline: none;
        overflow: hidden;
        text-align: start;

        &:focus {
          box-shadow: 0 0 0 2px ${theme.border.focus}, ${theme.shadow};
        }
      `}
      {...rest}
    />
  )
}

Row.defaultProps = defaultProps

export default Row
