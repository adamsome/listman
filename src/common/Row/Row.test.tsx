import ReactDOM from 'react-dom'
import renderer from 'react-test-renderer'
import { createRow } from './Row.stories'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(createRow(), div)
  ReactDOM.unmountComponentAtNode(div)
})

it('renders correctly', () => {
  const tree = renderer.create(createRow()).toJSON()
  expect(tree).toMatchSnapshot()
})
