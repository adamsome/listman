import React from 'react'
import styled from 'styled-components/macro'

type RowSubtitleProps = typeof defaultProps & {
  children: React.ReactNode
}

const defaultProps = {}

const RowSubtitle = (props: RowSubtitleProps) => {
  const { children, ...rest } = props

  return <Title {...rest}>{children}</Title>
}

// TODO: Theme
const Title = styled.h4`
  color: black;
  font-size: 14rem;
  font-weight: 400;
  margin: 0;
`

RowSubtitle.defaultProps = defaultProps

export default RowSubtitle
