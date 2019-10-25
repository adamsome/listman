import styled from '@emotion/styled'
import React from 'react'
import { FlexItem } from '../Flexbox'

type Props = typeof defaultProps & {
  children: React.ReactNode
}

const defaultProps = {}

const CardContent = (props: Props) => {
  const { children, ...rest } = props

  return (
    <StyledFlexItem flex="1" {...rest}>
      <Content>{children}</Content>
    </StyledFlexItem>
  )
}

const StyledFlexItem = styled(FlexItem)`
  margin-right: var(--space-inset);
  padding-top: var(--space-stack);
  padding-bottom: var(--space-stack);
  &:first-of-type {
    margin-left: var(--space-inset);
  }
  overflow: hidden;
`

const Content = styled.div`
  display: block;
`

CardContent.defaultProps = defaultProps

export default CardContent
