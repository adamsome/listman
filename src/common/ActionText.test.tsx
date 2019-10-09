import React from 'react'
import ReactDOM from 'react-dom'
import renderer from 'react-test-renderer'
import ActionText from './ActionText'
import ThemeProvider from './theming/ThemeProvider'

const themed = () => (
  <ThemeProvider>
    <ActionText>Test</ActionText>
  </ThemeProvider>
)

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(themed(), div)
  ReactDOM.unmountComponentAtNode(div)
})

it('renders correctly', () => {
  const tree = renderer.create(themed()).toJSON()
  expect(tree).toMatchSnapshot()
})
