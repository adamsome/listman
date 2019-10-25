import styled from '@emotion/styled'
import React from 'react'
import ActionText from '../common/ActionText'

type Props = typeof defaultProps & {
  children: React.ReactNode
  lit?: boolean
}

const defaultProps = {}

const Ordinal = (props: Props) => {
  return <SubtleActionText size="huge" {...props} />
}

const SubtleActionText = styled(ActionText)`
  color: var(--subtle);
`

Ordinal.defaultProps = defaultProps

export default Ordinal
