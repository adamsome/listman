/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import { useTheme } from 'emotion-theming'
import React from 'react'
import { Theme } from '../theming'

type Props = typeof defaultProps & {
  children: React.ReactNode
}

const defaultProps = {}

const RowSubtitle = (props: Props) => {
  const { children, ...rest } = props
  const theme = useTheme<Theme>()

  return (
    <h4
      css={css`
        color: ${theme.subtle};
        font-size: ${theme.font.size.big};
        font-weight: ${theme.font.weightBold};
        margin: 0;
      `}
      {...rest}
    >
      {children}
    </h4>
  )
}

RowSubtitle.defaultProps = defaultProps

export default RowSubtitle
