import React from 'react'
import RowSection from './RowSection'

type RowActionsProps = typeof defaultProps & {
  children: React.ReactNode
}

const defaultProps = {}

const RowActions = (props: RowActionsProps) => {
  const { children, ...rest } = props

  return <RowSection {...rest}>{children}</RowSection>
}

RowActions.defaultProps = defaultProps

export default RowActions
