import ReactDOM from 'react-dom'
import renderer from 'react-test-renderer'
import themed from '../../theming/themed'
import { createCard } from './Card.stories'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(themed(createCard()), div)
  ReactDOM.unmountComponentAtNode(div)
})

it('renders correctly', () => {
  const tree = renderer.create(themed(createCard())).toJSON()
  expect(tree).toMatchSnapshot()
})
