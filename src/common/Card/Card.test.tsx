import ReactDOM from 'react-dom'
import renderer from 'react-test-renderer'
import { createCard } from './Card.stories'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(createCard(), div)
  ReactDOM.unmountComponentAtNode(div)
})

it('renders correctly', () => {
  const tree = renderer.create(createCard()).toJSON()
  expect(tree).toMatchSnapshot()
})
