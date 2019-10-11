import React from 'react'
import Example from './Example'
import ThemeProvider from './theming/ThemeProvider'
import useThemeStore from './theming/use-theme-store'

const App = () => {
  const [theme] = useThemeStore()

  return (
    <ThemeProvider theme={theme}>
      <Example />
    </ThemeProvider>
  )
}

export default App
