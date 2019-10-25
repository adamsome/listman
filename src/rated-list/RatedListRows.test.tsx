import React from 'react'
import ReactDOM from 'react-dom'
import RatedListRows from './RatedListRows'
import { SHORT_LIST } from './RatedListRows.stories'

export const actions = {
  onDragEnd: () => null,
}

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<RatedListRows rows={SHORT_LIST} {...actions} />, div)
  ReactDOM.unmountComponentAtNode(div)
})
