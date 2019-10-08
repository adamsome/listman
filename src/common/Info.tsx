import React from 'react'
import styled from './theming/styled'

type Props = typeof defaultProps & {
  children: React.ReactNode
  hint?: boolean
}

const defaultProps = {}

const Info = (props: Props) => {
  return <SubtleText {...props}>{props.children}</SubtleText>
}

const SubtleText = styled.div<Props>`
  color: ${props => (props.hint ? props.theme.hint : props.theme.subtle)};
`

Info.defaultProps = defaultProps

export default Info
