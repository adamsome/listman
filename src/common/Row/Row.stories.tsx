import { action } from '@storybook/addon-actions'
import React from 'react'
import Starrate from 'react-minor-ui'
import Truncated from '../Truncated'
import Row from './Row'
import RowContent from './RowContent'
import RowImage from './RowImage'
import RowTitle from './RowTitle'
import sampleArtImage from './sample-art.png'

export default {
  component: Row,
  title: 'Row',
  excludeStories: ['actions', 'createRow'],
}

export const actions = {
  onClick: action('onClick'),
}

const longTitle = 'Long title of an type of artifact that is being rated'
const shortSubtitle = 'Short subtitle'
const longContent =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus lobortis rhoncus risus, ut faucibus dui. Aenean bibendum dui et finibus euismod. Nullam luctus nisl at ipsum faucibus, sed volutpat metus ultricies. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Praesent dictum ligula at sollicitudin venenatis. Fusce facilisis tincidunt accumsan. Vestibulum vitae efficitur urna. Maecenas aliquam accumsan scelerisque. Morbi molestie, justo sed pretium gravida, erat nulla mattis turpis, non aliquam sapien orci vel arcu. Curabitur id mauris a odio pharetra varius eget quis ipsum. Donec ipsum tellus, bibendum quis maximus eu, facilisis vitae nibh. Maecenas euismod mauris at orci eleifend efficitur.'

export const createRow = (
  title = longTitle,
  subtitle = shortSubtitle,
  content = longContent
) => (
  <Row {...actions}>
    <RowImage src={sampleArtImage} height="114px" alt="Sample Art" />
    <RowContent>
      <RowTitle subtitle={subtitle} actions={<Starrate />}>
        {title}
      </RowTitle>
      <Truncated lines={2}>{content}</Truncated>
    </RowContent>
  </Row>
)

export const image = () => createRow()
export const lowWidth = () => (
  <div style={{ width: '400px' }}>{createRow()}</div>
)

// TODO: Story w/ long titles
