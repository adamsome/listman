/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import { ThemeProvider as EmotionThemeProvider } from 'emotion-theming'
import React, { useEffect, useState } from 'react'
import { getThemeState } from './theme-store'
import THEME_WHITE from './theme-white'
import { Theme } from './theming'

type Props = typeof defaultProps & {
  theme?: Theme
  children: React.ReactNode
}

const defaultProps = {}

const ThemeProvider = (props: Props) => {
  const [currentTheme, setCurrentTheme] = useState(props.theme || THEME_WHITE)

  const handleThemeChange = (next: Theme) => {
    setCurrentTheme(next)
  }

  useEffect(() => {
    const subscription = getThemeState().subscribe(handleThemeChange)
    return () => subscription.unsubscribe()
  }, [])

  const theme = props.theme || currentTheme

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
