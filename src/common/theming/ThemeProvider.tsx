/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import { ThemeProvider as EmotionThemeProvider } from 'emotion-theming'
import React from 'react'
import { getThemeStore } from './theme-store'
import { Theme } from './theming'

type Props = typeof defaultProps & {
  theme?: Theme
  children: React.ReactNode
}

const defaultProps = {}

const ThemeProvider = (props: Props) => {
  const theme = props.theme || getThemeStore()
  return (
    <EmotionThemeProvider theme={theme}>
      <div
        css={css`
          height: 100vh;
          width: 100vw;
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
