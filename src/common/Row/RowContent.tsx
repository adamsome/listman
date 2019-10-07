import styled from '@emotion/styled'
import React from 'react'

type Props = typeof defaultProps & {
  children: React.ReactNode
}

const defaultProps = {}

const RowContent = (props: Props) => {
  const { children, ...rest } = props

  return (
    <Wrapper {...rest}>
      <Content>{children}</Content>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  flex: 1;
  margin-right: 1rem;
  padding-top: 1rem;
  padding-bottom: 1rem;
  &:first-of-type {
    margin-left: 1rem;
  }
`

const Content = styled.div`
  display: block;
`

RowContent.defaultProps = defaultProps

export default RowContent
