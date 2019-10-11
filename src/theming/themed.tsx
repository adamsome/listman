import React from 'react'
import { THEME_WHITE } from '.'
import ThemeProvider from './ThemeProvider'

const themed = (children: React.ReactNode) => {
  return <ThemeProvider theme={THEME_WHITE}>{children}</ThemeProvider>
}

export default themed
