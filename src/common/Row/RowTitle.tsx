import React from 'react'
import styled from 'styled-components/macro'

type RowTitleProps = typeof defaultProps & {
  children: React.ReactNode
}

const defaultProps = {}

const RowTitle = (props: RowTitleProps) => {
  const { children, ...rest } = props

  return <Title {...rest}>{children}</Title>
}

const Title = styled.h3`
  color: black;
  font-size: 1.5rem;
  font-weight: 400;
  margin: 0;
`

RowTitle.defaultProps = defaultProps

export default RowTitle
