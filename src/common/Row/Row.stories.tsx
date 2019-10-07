import { action } from '@storybook/addon-actions'
import React from 'react'
import Starrate from 'react-minor-ui'
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

export const createRow = () => (
  <Row {...actions}>
    <RowImage src={sampleArtImage} height="120px" alt="Sample Art" />
    <RowContent>
      <RowTitle subtitle="Subtitle" actions={<Starrate />}>
        Title
      </RowTitle>
      Content
    </RowContent>
  </Row>
)

export const image = () => createRow()
export const lowWidth = () => (
  <div style={{ width: '400px' }}>{createRow()}</div>
)

// TODO: Story w/ long titles
