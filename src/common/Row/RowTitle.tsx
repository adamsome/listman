/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import styled from '@emotion/styled'
import React, { Children, cloneElement } from 'react'
import { Theme } from '../theming'

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

const Title = styled.h3<{ theme?: Theme }>`
  color: ${props => props.theme.body};
  font-size: ${props => props.theme.font.size.big};
  font-weight: ${props => props.theme.font.weightBold};
  margin: 0;
`

const Subtitle = styled(Title)`
  color: ${props => props.theme.subtle};
`

RowTitle.defaultProps = defaultProps

export default RowTitle
