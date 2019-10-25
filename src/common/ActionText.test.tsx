import React from 'react'
import ReactDOM from 'react-dom'
import renderer from 'react-test-renderer'
import ActionText from './ActionText'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<ActionText>Test</ActionText>, div)
  ReactDOM.unmountComponentAtNode(div)
})

it('renders correctly', () => {
  const tree = renderer.create(<ActionText>Test</ActionText>).toJSON()
  expect(tree).toMatchSnapshot()
})
