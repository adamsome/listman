import styled from '../../theming/styled'
import FlexItem, { FlexItemProps } from './FlexItem'

type Props = FlexItemProps & {
  /** Flexbox container props */
  display?: 'flex' | 'inline-flex'
  direction?: 'row' | 'row-reverse' | 'column' | 'column-reverse'
  wrap?: 'nowrap' | 'wrap' | 'wrap-reverse'
  flow?: string
  justify?:
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'space-between'
    | 'space-around'
    | 'space-evenly'
    | 'start'
    | 'end'
    | 'left'
    | 'right'
  alignItems?:
    | 'stretch'
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'baseline'
    | 'start'
    | 'end'
    | 'self-start'
    | 'self-end'
  alignContent?:
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'space-between'
    | 'space-around'
    | 'space-evenly'
    | 'stretch'
    | 'start'
    | 'end'
    | 'baseline'
}

/**
 * Flexbox container.
 *
 * Can act as both a container and an item
 */
const FlexBox = styled(FlexItem)<Props>`
  display: ${props => props.display || 'flex'};
  flex-direction: ${props => props.direction};
  flex-wrap: ${props => props.wrap};
  flex-flow: ${props => props.flow};
  justify-content: ${props => props.justify};
  align-items: ${props => props.alignItems};
  align-content: ${props => props.alignContent};
`

export default FlexBox
