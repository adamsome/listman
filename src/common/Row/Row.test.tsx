import React from 'react'
import ReactDOM from 'react-dom'
import renderer from 'react-test-renderer'
import Row from './Row'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<Row>content</Row>, div)
  ReactDOM.unmountComponentAtNode(div)
})

it('renders correctly', () => {
  const tree = renderer.create(<Row>content</Row>).toJSON()
  expect(tree).toMatchSnapshot()
})
