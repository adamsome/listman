import React from 'react'
import ReactDOM from 'react-dom'
import renderer from 'react-test-renderer'
import ThemeProvider from '../theming/ThemeProvider'
import { createRow } from './Row.stories'

const create = () => <ThemeProvider>{createRow()}</ThemeProvider>

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(create(), div)
  ReactDOM.unmountComponentAtNode(div)
})

it('renders correctly', () => {
  const tree = renderer.create(create()).toJSON()
  expect(tree).toMatchSnapshot()
})
