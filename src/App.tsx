import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Debug from './Debug'
import Example from './Example'
import RoutedRatedList from './rated-list/RoutedRatedList'
import { Themer } from './theming'

const App = () => {
  trace('component', 'App')
  return (
    <>
      <Switch>
        <Route
          path="/users/:userID/lists/:listID"
          children={<RoutedRatedList />}
        />
        <Route path="/" children={<Example />} />
      </Switch>
      <Themer />
      <Debug />
    </>
  )
}

export default App
