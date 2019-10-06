/** @jsx jsx */
import { css, jsx } from '@emotion/core'

type Props = typeof defaultProps &
  React.PropsWithoutRef<JSX.IntrinsicElements['div']> & {}

const defaultProps = {}

const RowSection = (props: Props) => (
  <div
    css={css`
      margin-right: 1rem;
      padding-top: 1rem;
      padding-bottom: 1rem;
    `}
    {...props}
  />
)

RowSection.defaultProps = defaultProps

export default RowSection
