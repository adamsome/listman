import styled from '@emotion/styled'
import React from 'react'
import RowSection from './RowSection'

type RowContentProps = typeof defaultProps & {
  children: React.ReactNode
}

const defaultProps = {}

const RowContent = (props: RowContentProps) => {
  const { children, ...rest } = props

  return (
    <Wrapper {...rest}>
      <Content>{children}</Content>
    </Wrapper>
  )
}

const Wrapper = styled(RowSection)`
  flex: 1;
  &:first-of-type {
    margin-left: 1rem;
  }
`

const Content = styled.div`
  display: block;
`

RowContent.defaultProps = defaultProps

export default RowContent
