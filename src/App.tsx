import React from 'react'
import ThemeProvider from './common/theming/ThemeProvider'
import useThemeStore from './common/theming/use-theme-store'
import Example from './Example'

const App = () => {
  const [theme] = useThemeStore()

  return (
    <ThemeProvider theme={theme}>
      <Example />
    </ThemeProvider>
  )
}

export default App
