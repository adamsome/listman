import { action } from '@storybook/addon-actions'
import { range } from 'ramda'
import React from 'react'
import { SAMPLE_CARDS } from '../common/Card/Card.stories'
import sampleArtImage from '../common/Card/sample-art.png'
import { RatedArtifact } from '../rated-artifact'
import RatedList from './RatedList'
import { RatedListArtifactRow, RatedListRatingRow, RatedListRow } from './types'

export default {
  component: RatedList,
  title: 'RatedList',
  excludeStories: ['actions', 'SHORT_LIST', 'createSampleArtifactRows'],
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

const byRatingDesc = (
  a: RatedListArtifactRow,
  b: RatedListArtifactRow
): number => {
  if (b.ratedArtifact.rating == null) {
    return -1
  }
  if (a.ratedArtifact.rating == null) {
    return 1
  }
  return b.ratedArtifact.rating
    .toString()
    .localeCompare(a.ratedArtifact.rating.toString())
}

const createRating = (
  rating: number,
  prevGroupArtifactCount: number
): RatedListRatingRow => ({
  type: 'rating',
  id: String(rating),
  rating,
  occursAfterArtifact: prevGroupArtifactCount > 0,
})

const setFirstAndLastInRatingList = (
  artifacts: RatedListArtifactRow[] = []
) => {
  if (artifacts.length > 0) {
    artifacts[0].firstInRating = true
    artifacts[artifacts.length - 1].lastInRating = true
  }
  return artifacts
}

export const createSampleArtifactRows = (): RatedListArtifactRow[] => {
  return Object.keys(SAMPLE_CARDS)
    .map((id, i) => {
      const { title, subtitle, description } = SAMPLE_CARDS[id]
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
      // Temporarily set to a dummy number
      const ordinal = -1
      const row: RatedListArtifactRow = {
        type: 'artifact',
        id,
        ordinal,
        // Temporarily set, will be overriden by 'setFirstAndLast...' fn
        firstInRating: false,
        lastInRating: false,
        ratedArtifact,
      }
      return row
    })
    .sort(byRatingDesc)
    .map((artifact, i) => ({ ...artifact, ordinal: i + 1 }))
}

const createListItems = (maxRating = 4) => {
  const groups: RatedListArtifactRow[][] = range(0, maxRating + 1).map(_ => [])
  const itemsByGroup = createSampleArtifactRows()
    // Group the artifacts by their rating
    .reduce((acc, row) => {
      const rating = row.ratedArtifact.rating || 0
      acc[rating] = [...acc[rating], row]
      return acc
    }, groups)
    .map(setFirstAndLastInRatingList)

  // Reverse order and flatten groups and artifacts into a single list
  let prevGroupArtifactCount = 0
  return itemsByGroup.reduceRight(
    (list, artifacts, i) => {
      const rating = createRating(i, prevGroupArtifactCount)
      prevGroupArtifactCount = artifacts.length
      return [...list, rating, ...artifacts]
    },
    [] as RatedListRow[]
  )
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
