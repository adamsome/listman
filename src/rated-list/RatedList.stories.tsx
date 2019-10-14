import { action } from '@storybook/addon-actions'
import React from 'react'
import { SAMPLE_CARDS, SampleCard } from '../common/Card/Card.stories'
import sampleArtImage from '../common/Card/sample-art.png'
import { RatedArtifact } from '../rated-artifact'
import convertRatedArtifactsToListRows from './convert-artifacts-to-rows'
import RatedList from './RatedList'
import { RatedListRow } from './types'

export default {
  component: RatedList,
  title: 'RatedList',
  excludeStories: ['actions', 'SHORT_LIST', 'convertSampleCardsToArtifacts'],
}

export const actions = {
  onMove: action('onMove'),
}

const getSampleRating = (i: number) => {
  if (i === 0) {
    return 4
  }
  if (i <= 2) {
    return 2
  }
  if (i <= 5) {
    return 1
  }
}

export const convertSampleCardsToArtifacts = (
  sampleCards: Record<string, SampleCard>
): RatedArtifact[] => {
  return Object.keys(sampleCards).map((id, i) => {
    const { title, subtitle, description } = sampleCards[id]
    const ratedArtifact: RatedArtifact = {
      id,
      rating: getSampleRating(i),
      artifact: {
        id: 'a_' + id,
        title,
        type: 'album',
        creator: subtitle,
        artworkID: sampleArtImage,
      },
      text: description,
    }
    return ratedArtifact
  })
}

const createListItems = (maxRating = 4) => {
  const ratedArtifacts = convertSampleCardsToArtifacts(SAMPLE_CARDS)
  return convertRatedArtifactsToListRows(ratedArtifacts, maxRating)
}

export const SHORT_LIST: RatedListRow[] = [
  {
    type: 'rating',
    id: '2',
    rating: 2,
    occursAfterArtifact: false,
  },
  {
    type: 'artifact',
    id: '1',
    ratedArtifact: {
      id: 'ra1',
      artifact: {
        id: 'a1',
        type: 'album',
        title: 'Title',
      },
    },

    ordinal: 1,
    firstInRating: true,
    lastInRating: true,
  },
]

export const empty = () => <RatedList items={[]} {...actions} />
export const shortList = () => <RatedList items={SHORT_LIST} {...actions} />
export const fullList = () => (
  <RatedList items={createListItems()} {...actions} />
)
