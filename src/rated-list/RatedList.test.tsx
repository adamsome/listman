import React from 'react'
import ReactDOM from 'react-dom'
import renderer from 'react-test-renderer'
import themed from '../common/theming/themed'
import RatedList from './RatedList'
import { SHORT_LIST } from './RatedList.stories'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(themed(<RatedList items={SHORT_LIST} />), div)
  ReactDOM.unmountComponentAtNode(div)
})

it('renders correctly', () => {
  const tree = renderer
    .create(themed(<RatedList items={SHORT_LIST} />))
    .toJSON()
  expect(tree).toMatchSnapshot()
})
