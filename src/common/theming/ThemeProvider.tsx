/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import { ThemeProvider as EmotionThemeProvider } from 'emotion-theming'
import React from 'react'
import { Theme } from './theming'

type Props = typeof defaultProps & {
  theme: Theme
  children: React.ReactNode
}

const defaultProps = {}

const ThemeProvider = (props: Props) => {
  const { theme } = props
  return (
    <EmotionThemeProvider theme={theme}>
      <div
        css={css`
          color: ${theme.body};
          background-color: ${theme.bg.body};
        `}
      >
        {props.children}
      </div>
    </EmotionThemeProvider>
  )
}

ThemeProvider.defaultProps = defaultProps

export default ThemeProvider
