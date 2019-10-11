/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import { Link } from 'react-router-dom'
import FlexBox, { FlexItem } from './common/Flexbox'
import { useTheme } from './theming'

const Debug = () => {
  const theme = useTheme()
  const bg =
    theme.mode === 'light'
      ? 'rgba(246, 235, 186, 0.75)'
      : 'rgba(34, 32, 26, 0.75)'
  return (
    <FlexBox
      alignContent="center"
      alignItems="center"
      css={css`
        background: ${bg};
        color: rgba(218, 160, 0, 0.705);
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        height: 2.5rem;
        border-top: 1px solid rgba(218, 160, 0, 0.33);
        padding-left: 2.5rem;
        overflow: hidden;
        white-space: nowrap;
        font-size: ${theme.font.size.small};
        z-index: 1;

        a,
        button {
          margin-right: ${theme.space.insetSmall};
          color: ${theme.subtle};
        }
      `}
    >
      <FlexItem>
        <Link to="/">home</Link>
      </FlexItem>
      <FlexItem>
        <Link to="/users/a/lists/1">list1</Link>
      </FlexItem>
    </FlexBox>
  )
}

export default Debug
