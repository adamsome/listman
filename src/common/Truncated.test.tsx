import React from 'react'
import ReactDOM from 'react-dom'
import renderer from 'react-test-renderer'
import Truncated from './Truncated'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<Truncated lines={2}>text</Truncated>, div)
  ReactDOM.unmountComponentAtNode(div)
})

it('renders correctly', () => {
  const tree = renderer.create(<Truncated lines={2}>text</Truncated>).toJSON()
  expect(tree).toMatchSnapshot()
})
