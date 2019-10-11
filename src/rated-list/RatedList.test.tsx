import React from 'react'
import ReactDOM from 'react-dom'
import themed from '../theming/themed'
import RatedList from './RatedList'
import { SHORT_LIST } from './RatedList.stories'

export const actions = {
  onMove: () => null,
}

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(themed(<RatedList items={SHORT_LIST} {...actions} />), div)
  ReactDOM.unmountComponentAtNode(div)
})
