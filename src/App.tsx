import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Debug from './Debug'
import Example from './Example'
import RoutedRatedList from './rated-list/RoutedRatedList'
import ThemeProvider from './theming/ThemeProvider'
import useThemeStore from './theming/use-theme-store'

const App = () => {
  const [theme] = useThemeStore()

  return (
    <ThemeProvider theme={theme}>
      <Switch>
        <Route
          path="/users/:userID/lists/:listID"
          children={<RoutedRatedList />}
        />
        <Route path="/" children={<Example />} />
      </Switch>
      <Debug />
    </ThemeProvider>
  )
}

export default App
