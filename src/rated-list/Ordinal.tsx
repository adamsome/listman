import React from 'react'
import ActionText from '../common/ActionText'
import styled from '../common/theming/styled'

type Props = typeof defaultProps & {
  children: React.ReactNode
  lit?: boolean
}

const defaultProps = {}

const Ordinal = (props: Props) => {
  return <SubtleActionText size="huge" {...props} />
}

const SubtleActionText = styled(ActionText)`
  color: ${props => props.theme.subtle};
`

Ordinal.defaultProps = defaultProps

export default Ordinal
