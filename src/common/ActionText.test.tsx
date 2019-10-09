import React from 'react'
import ReactDOM from 'react-dom'
import renderer from 'react-test-renderer'
import ActionText from './ActionText'
import themed from './theming/themed'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(themed(<ActionText>Test</ActionText>), div)
  ReactDOM.unmountComponentAtNode(div)
})

it('renders correctly', () => {
  const tree = renderer.create(themed(<ActionText>Test</ActionText>)).toJSON()
  expect(tree).toMatchSnapshot()
})
