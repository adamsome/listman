/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import styled from '@emotion/styled'
import React, { Children, cloneElement } from 'react'
import FlexBox, { FlexItem } from '../Flexbox'
import Truncated, { TruncatedProps } from '../Truncated'

type Props = typeof defaultProps & {
  children: React.ReactNode
  subtitle?: string
  subtitleLines?: number
  actions?: React.ReactElement | React.ReactElement[]
}

const defaultProps = {
  lines: 1 as number,
}

const CardTitle = (props: Props) => {
  const { children, subtitle, subtitleLines, actions, lines, ...rest } = props

  const _actions = actions
    ? Children.map(actions, (a, i) => cloneElement(a, { key: i }))
    : null

  return (
    <Wrapper alignItems="flex-start" {...rest}>
      <FlexItem flex="auto" css={titlesWrapper(actions != null)}>
        <Title lines={lines}>{children}</Title>
        {subtitle && <Subtitle lines={subtitleLines || 1}>{subtitle}</Subtitle>}
      </FlexItem>
      <FlexItem flex="none">{_actions}</FlexItem>
    </Wrapper>
  )
}

const Wrapper = styled(FlexBox)`
  &:not(:last-of-type) {
    margin-bottom: var(--space-stack-small);
  }
  &:not(:first-of-type) {
    margin-top: var(--space-stack-small);
  }
`

const titlesWrapper = (hasActions: boolean) => css`
  margin-right: ${hasActions ? '1rem' : null};
  display: block;
  min-width: 0;
`

const StyledTitle = styled.h4`
  color: var(--strong);
  font-size: var(--font-size-big);
  font-weight: var(--font-weight-bold);
  margin: 0;
`

const Title = (props: TruncatedProps) => {
  return (
    <StyledTitle>
      <Truncated {...props} />
    </StyledTitle>
  )
}

const StyledSubtitle = styled(StyledTitle)`
  color: var(--subtle);
`

const Subtitle = (props: TruncatedProps) => {
  return (
    <StyledSubtitle>
      <Truncated {...props} />
    </StyledSubtitle>
  )
}

CardTitle.defaultProps = defaultProps

export default CardTitle
