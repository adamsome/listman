import React from 'react'
import ReactDOM from 'react-dom'
import renderer from 'react-test-renderer'
import ThemeProvider from '../common/theming/ThemeProvider'
import RatedList from './RatedList'
import { SHORT_LIST } from './RatedList.stories'

const themed = () => (
  <ThemeProvider>
    <RatedList items={SHORT_LIST} />
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
