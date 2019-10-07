/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import React, { Children, cloneElement } from 'react'
import { HasTheme } from '../theming'
import styled from '../theming/styled'

type Props = typeof defaultProps & {
  children: React.ReactNode
  subtitle?: string
  actions?: React.ReactElement | React.ReactElement[]
}

const defaultProps = {}

const RowTitle = (props: Props) => {
  const { children, subtitle, actions, ...rest } = props

  const _actions = actions
    ? Children.map(actions, (a, i) => cloneElement(a, { key: i }))
    : null

  return (
    <div
      css={css`
        display: flex;
        align-items: flex-start;
        margin-bottom: 1rem;
      `}
      {...rest}
    >
      <div
        css={css`
          flex: 1 1 auto;
          display: block;
          margin-right: ${actions ? '1rem' : null};
        `}
      >
        <Title>{children}</Title>
        {subtitle && <Subtitle>{subtitle}</Subtitle>}
      </div>
      <div
        css={css`
          flex: 0 0 auto;
        `}
      >
        {_actions}
      </div>
    </div>
  )
}

const headerStyle = (props: HasTheme) =>
  css`
    color: ${props.theme.strong};
    font-size: ${props.theme.font.size.big};
    font-weight: ${props.theme.font.weightBold};
    margin: 0;
  `

const Title = styled.h3`
  ${headerStyle}
`

const Subtitle = styled.h4`
  ${headerStyle}
  color: ${props => props.theme.subtle};
`

RowTitle.defaultProps = defaultProps

export default RowTitle
