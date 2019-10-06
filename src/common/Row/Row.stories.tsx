import { action } from '@storybook/addon-actions'
import React from 'react'
import Starrate from 'react-minor-ui'
import Row from './Row'
import RowActions from './RowActions'
import RowContent from './RowContent'
import RowImage from './RowImage'
import RowSubtitle from './RowSubtitle'
import RowTitle from './RowTitle'
import sampleArtImage from './sample-art.png'

export default {
  component: Row,
  title: 'Row',
  excludeStories: ['actions'],
}

export const actions = {
  onClick: action('onClick'),
}

export const image = () => (
  <Row {...actions}>
    <RowImage src={sampleArtImage} height="120px" />
    <RowContent>
      <RowTitle>Title</RowTitle>
      <RowSubtitle>Subtitle</RowSubtitle>
      Content
    </RowContent>
    <RowActions>
      <Starrate />
    </RowActions>
  </Row>
)
export const lowWidth = () => (
  <div style={{ width: '400px' }}>
    <Row {...actions}>
      <RowImage src={sampleArtImage} height="120px" />
      <RowContent>
        <RowTitle>Title</RowTitle>
        <RowSubtitle>Subtitle</RowSubtitle>
        Content
      </RowContent>
      <RowActions>
        <Starrate />
      </RowActions>
    </Row>
  </div>
)
