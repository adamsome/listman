import ReactDOM from 'react-dom'
import renderer from 'react-test-renderer'
import themed from '../theming/themed'
import { createRow } from './Row.stories'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(themed(createRow()), div)
  ReactDOM.unmountComponentAtNode(div)
})

it('renders correctly', () => {
  const tree = renderer.create(themed(createRow())).toJSON()
  expect(tree).toMatchSnapshot()
})
