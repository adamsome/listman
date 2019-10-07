/** @jsx jsx */
import { jsx } from '@emotion/core'
import React from 'react'
import { FlexItem } from '../Flexbox'
import styled from '../theming/styled'

type Props = typeof defaultProps & {
  children: React.ReactNode
}

const defaultProps = {}

const RowContent = (props: Props) => {
  const { children, ...rest } = props

  return (
    <StyledFlexItem flex="1" {...rest}>
      <Content>{children}</Content>
    </StyledFlexItem>
  )
}

const StyledFlexItem = styled(FlexItem)`
  margin-right: ${props => props.theme.space.inset};
  padding-top: ${props => props.theme.space.stack};
  padding-bottom: ${props => props.theme.space.stack};
  &:first-of-type {
    margin-left: ${props => props.theme.space.inset};
  }
  overflow: hidden;
`

const Content = styled.div`
  display: block;
`

RowContent.defaultProps = defaultProps

export default RowContent
