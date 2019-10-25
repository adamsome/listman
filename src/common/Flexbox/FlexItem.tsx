import styled from '@emotion/styled'

export type FlexItemProps = typeof defaultProps & {
  flex?: string
  basis?:
    | string
    | 'auto'
    | 'content'
    | 'max-content'
    | 'min-content'
    | 'fit-content'
  alignSelf?:
    | 'auto'
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'baseline'
    | 'stretch'
}

const defaultProps = {}

/**
 * Flexbox item
 */
const FlexItem = styled.div<FlexItemProps>`
  flex: ${props => props.flex};
  flex-basis: ${props => props.basis};
  align-self: ${props => props.alignSelf};
`

FlexItem.defaultProps = defaultProps

export default FlexItem
