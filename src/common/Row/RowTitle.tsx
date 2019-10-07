/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import { useTheme } from 'emotion-theming'
import React from 'react'
import { Theme } from '../theming'

type Props = typeof defaultProps & {
  children: React.ReactNode
}

const defaultProps = {}

const RowTitle = (props: Props) => {
  const { children, ...rest } = props
  const theme = useTheme<Theme>()

  return (
    <h3
      css={css`
        color: ${theme.body};
        font-size: ${theme.font.size.big};
        font-weight: ${theme.font.weightBold};
        margin: 0;
      `}
      {...rest}
    >
      {children}
    </h3>
  )
}

RowTitle.defaultProps = defaultProps

export default RowTitle
