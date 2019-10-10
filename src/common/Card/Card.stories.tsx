import { action } from '@storybook/addon-actions'
import React from 'react'
import Starrate from 'react-minor-ui'
import Truncated from '../Truncated'
import Card from './Card'
import CardContent from './CardContent'
import CardImage from './CardImage'
import CardTitle from './CardTitle'
import sampleArtImage from './sample-art.png'

export default {
  component: Card,
  title: 'Card',
  excludeStories: ['actions', 'createCard', 'SAMPLE_CARDS'],
}

export const actions = {
  onClick: action('onClick'),
}

const longTitle = 'Long title of an type of artifact that is being rated'
const shortSubtitle = 'Short subtitle'
const longDescription =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus lobortis rhoncus risus, ut faucibus dui. Aenean bibendum dui et finibus euismod. Nullam luctus nisl at ipsum faucibus, sed volutpat metus ultricies. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Praesent dictum ligula at sollicitudin venenatis. Fusce facilisis tincidunt accumsan. Vestibulum vitae efficitur urna. Maecenas aliquam accumsan scelerisque. Morbi molestie, justo sed pretium gravida, erat nulla mattis turpis, non aliquam sapien orci vel arcu. Curabitur id mauris a odio pharetra varius eget quis ipsum. Donec ipsum tellus, bibendum quis maximus eu, facilisis vitae nibh. Maecenas euismod mauris at orci eleifend efficitur.'

interface SampleCard {
  title: string
  subtitle?: string
  description?: string
  rating?: number
}

export const SAMPLE_CARDS: Record<string, SampleCard> = {
  short: {
    title: 'Title',
    subtitle: 'Subtitle',
    description: 'Description',
  },
  long: {
    title: longTitle,
    subtitle: shortSubtitle,
    description: longDescription,
  },
  noSubtitle: {
    title: 'Title with no subtitle',
    description: longDescription,
  },
  color1: {
    title: 'Red Cow Mountain',
    subtitle: 'Green Bull Lake',
  },
  color2: {
    title: 'Blue Deer Ocean',
    subtitle: 'Yellow Doe Sky',
  },
  color3: {
    title: 'Orange Chicken Plains',
    subtitle: 'Purple Rooster Canyon',
  },
  color4: {
    title: 'Pink Bear Valley',
    subtitle: 'Forest Beaver Hill',
  },
  color5: {
    title: 'Black Lion River',
    subtitle: 'White Tiger Desert',
  },
}

const DEFAULT_SAMPLE: SampleCard = {
  title: longTitle,
  subtitle: shortSubtitle,
  description: 'No description.',
}

export const createCard = (card: Partial<SampleCard> = DEFAULT_SAMPLE) => {
  const { title, subtitle, description, rating } = {
    ...DEFAULT_SAMPLE,
    ...card,
  }
  return (
    <Card {...actions}>
      <CardImage src={sampleArtImage} height="114px" alt="Sample Art" />
      <CardContent>
        <CardTitle subtitle={subtitle} actions={<Starrate rating={rating} />}>
          {title}
        </CardTitle>
        <Truncated lines={2}>{description}</Truncated>
      </CardContent>
    </Card>
  )
}

export const image = () => createCard()
export const lowWidth = () => (
  <div style={{ width: '400px' }}>{createCard()}</div>
)

// TODO: Story w/ long titles
