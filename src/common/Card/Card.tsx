/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import React from 'react'
import FlexBox from '../Flexbox'
import withButtonProps from '../with-button-props'

type Props = typeof defaultProps & {
  onClick?: (event: React.MouseEvent) => void
  children: React.ReactNode
  /**
   * Set to whether the card is first in a collection to manually control
   * borders. `last` must be set as well. If undefined, component will use
   * css selectors (e.g. `first-of-type`) to control borders.
   */
  first?: boolean
  /**
   * Set to whether the card is last in a collection to manually control
   * borders. `first` must be set as well. If undefined, component will use
   * css selectors (e.g. `first-of-type`) to control borders.
   */
  last?: boolean
}

const defaultProps = {}

const Card = (props: Props) => {
  const { first, last, ...rest } = withButtonProps(props)
  const { onClick } = rest

  const manualBorders = first != null && last != null
  const manualFirst = manualBorders && first
  const manualLast = manualBorders && last

  return (
    <FlexBox
      css={css`
        background-color: var(--bg-content);
        border: 1px solid var(--border-content);
        border-top-left-radius: ${manualFirst && 'var(--space-border-radius)'};
        border-top-right-radius: ${manualFirst && 'var(--space-border-radius)'};
        border-bottom-left-radius: ${manualLast &&
          'var(--space-border-radius)'};
        border-bottom-right-radius: ${manualLast &&
          'var(--space-border-radius)'};
        border-bottom-width: ${manualLast ? '1px' : 0};
        &:first-of-type {
          border-top-left-radius: ${!manualBorders &&
            'var(--space-border-radius)'};
          border-top-right-radius: ${!manualBorders &&
            'var(--space-border-radius)'};
        }
        &:last-of-type {
          border-bottom-left-radius: ${!manualBorders &&
            'var(--space-border-radius)'};
          border-bottom-right-radius: ${!manualBorders &&
            'var(--space-border-radius)'};
          border-bottom-width: ${!manualBorders && '1px'};
        }
        color: var(--body);
        cursor: ${onClick ? 'pointer' : 'auto'};
        font-size: var(--font-size-body);
        outline: none;
        overflow: hidden;
        text-align: start;

        &:focus {
          box-shadow: 0 0 0 2px var(--border-focus), var(--shadow);
        }
      `}
      {...rest}
    />
  )
}

Card.defaultProps = defaultProps

export default Card
