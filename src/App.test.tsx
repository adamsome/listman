import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

beforeAll(() => {
  const _global = global as any
  _global.log = () => null
  _global.globalThis = global
})

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<App />, div)
  ReactDOM.unmountComponentAtNode(div)
})
