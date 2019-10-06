import styled from 'styled-components/macro'

type RowSectionProps = typeof defaultProps &
  React.PropsWithoutRef<JSX.IntrinsicElements['div']> & {}

const defaultProps = {}

const RowSection = styled.div<RowSectionProps>`
  margin-right: 1rem;
  padding-top: 1rem;
  padding-bottom: 1rem;
`

RowSection.defaultProps = defaultProps

export default RowSection
